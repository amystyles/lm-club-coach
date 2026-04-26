import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import type { Instructor, Stage, LMQLevel, KeyElement, Grade } from '@/data/types';

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

export function useInstructors() {
  const { activeClub } = useAuth();
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeClub) return;
    setLoading(true);

    supabase
      .from('instructors')
      .select(`*, instructor_programs(*), instructor_grades(*)`)
      .eq('club_id', activeClub.id)
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          setInstructors((data ?? []).map(mapInstructor));
        }
        setLoading(false);
      });
  }, [activeClub?.id]);

  return { instructors, loading, error };
}
