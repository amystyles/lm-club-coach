import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import type { Assessment, KeyElement, Grade, LMQLevel } from '@/data/types';

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

export function useAssessments() {
  const { activeClub } = useAuth();
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!activeClub) return;
    setLoading(true);

    supabase
      .from('assessments')
      .select('*')
      .eq('club_id', activeClub.id)
      .order('date', { ascending: false })
      .then(({ data, error: err }) => {
        if (err) {
          setError(err.message);
        } else {
          setAssessments((data ?? []).map(mapAssessment));
        }
        setLoading(false);
      });
  }, [activeClub?.id]);

  return { assessments, loading, error };
}
