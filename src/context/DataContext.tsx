import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { Instructor, Assessment, Stage, LMQLevel, KeyElement, Grade, DevelopmentNote } from '@/data/types';

function mapInstructor(row: any): Instructor {
  return {
    id: row.id,
    name: row.name,
    initials: row.initials,
    clubId: row.club_id,
    stage: row.stage as Stage,
    lmqLevel: row.lmq_level as LMQLevel,
    priorityElement: row.priority_element as KeyElement,
    mentorId: row.mentor_id ?? undefined,
    joinDate: row.join_date,
    lastAssessment: row.last_assessment ?? 'N/A',
    nextAssessment: row.next_assessment ?? undefined,
    riskLevel: row.risk_level as 'low' | 'medium' | 'high',
    certDate: row.cert_date ?? undefined,
    goals: row.goals ?? [],
    trustOverrides: row.trust_overrides ?? {},
    programs: (row.instructor_programs ?? []).map((p: any) => ({
      name: p.name,
      lmqLevel: p.lmq_level as LMQLevel,
    })),
    grades: (row.instructor_grades ?? []).map((g: any) => ({
      element: g.element as KeyElement,
      grade: g.grade as Grade,
      notes: g.notes ?? undefined,
      lastAssessed: g.last_assessed ?? undefined,
    })),
  };
}

function mapAssessment(row: any): Assessment {
  return {
    id: row.id,
    instructorId: row.instructor_id,
    assessorId: row.assessor_id,
    assessorRole: 'coach',
    date: row.date,
    program: row.program,
    type: row.type as Assessment['type'],
    grades: (row.grades ?? []).map((g: any) => ({
      element: g.element as KeyElement,
      grade: g.grade as Grade,
    })),
    overallLevel: row.overall_level as LMQLevel,
    feedback: row.feedback ?? '',
    recommendations: row.recommendations ?? [],
    status: row.status as Assessment['status'],
  };
}

function mapDevelopmentNote(row: any): DevelopmentNote {
  return {
    id: row.id,
    instructorId: row.instructor_id,
    authorId: row.author_id,
    date: row.date,
    keyElement: row.key_element as KeyElement,
    observation: row.observation,
    recommendation: row.recommendation,
    followUp: row.follow_up ?? undefined,
    grade: row.grade ?? undefined,
  };
}

interface DataContextValue {
  instructors: Instructor[];
  assessments: Assessment[];
  developmentNotes: DevelopmentNote[];
  loading: boolean;
  error: string | null;
  refresh: () => void;
}

const DataContext = createContext<DataContextValue | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { activeClub } = useAuth();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [developmentNotes, setDevelopmentNotes] = useState<DevelopmentNote[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (!activeClub) return;
    setLoading(true);
    setError(null);
    const [instResult, assmtResult, notesResult] = await Promise.all([
      supabase
        .from('instructors')
        .select('*, instructor_programs(*), instructor_grades(*)')
        .eq('club_id', activeClub.id),
      supabase
        .from('assessments')
        .select('*')
        .eq('club_id', activeClub.id)
        .order('date', { ascending: false }),
      supabase
        .from('development_notes')
        .select('*')
        .eq('club_id', activeClub.id)
        .order('date', { ascending: false }),
    ]);
    if (instResult.error) setError(instResult.error.message);
    else setInstructors((instResult.data ?? []).map(mapInstructor));
    if (assmtResult.error) setError(assmtResult.error.message);
    else setAssessments((assmtResult.data ?? []).map(mapAssessment));
    if (notesResult.error) setError(notesResult.error.message);
    else setDevelopmentNotes((notesResult.data ?? []).map(mapDevelopmentNote));
    setLoading(false);
  }, [activeClub?.id]);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <DataContext.Provider value={{ instructors, assessments, developmentNotes, loading, error, refresh: fetch }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used inside DataProvider');
  return ctx;
}
