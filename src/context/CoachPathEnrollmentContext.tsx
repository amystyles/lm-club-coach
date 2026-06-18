import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

export interface CoachPathEnrollment {
  id: string;
  user_id: string;
  club_id: string;
  status: 'active' | 'paused' | 'completed' | 'withdrawn';
}

export interface TapCoachAssignment {
  id: string;
  enrollment_id: string;
  tap_coach_user_id: string;
  active: boolean;
}

interface CoachPathEnrollmentContextValue {
  loading: boolean;
  enrollment: CoachPathEnrollment | null;
  tapAssignment: TapCoachAssignment | null;
  stageSignoffs: Set<number>;
  isEnrolled: boolean;
  hasTapAssigned: boolean;
  refresh: () => Promise<void>;
}

const CoachPathEnrollmentContext = createContext<CoachPathEnrollmentContextValue | null>(null);

export function CoachPathEnrollmentProvider({ children }: { children: React.ReactNode }) {
  const { user, activeClub } = useAuth();
  const [enrollment, setEnrollment] = useState<CoachPathEnrollment | null>(null);
  const [tapAssignment, setTapAssignment] = useState<TapCoachAssignment | null>(null);
  const [stageSignoffs, setStageSignoffs] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user || !activeClub) {
      setEnrollment(null);
      setTapAssignment(null);
      setStageSignoffs(new Set());
      return;
    }

    setLoading(true);

    const { data: enrollmentRow } = await supabase
      .from('coach_path_enrollments')
      .select('id, user_id, club_id, status')
      .eq('user_id', user.id)
      .eq('club_id', activeClub.id)
      .maybeSingle();

    setEnrollment((enrollmentRow as CoachPathEnrollment | null) ?? null);

    if (enrollmentRow?.id) {
      const { data: assignmentRow } = await supabase
        .from('tap_coach_assignments')
        .select('id, enrollment_id, tap_coach_user_id, active')
        .eq('enrollment_id', enrollmentRow.id)
        .eq('active', true)
        .maybeSingle();

      setTapAssignment((assignmentRow as TapCoachAssignment | null) ?? null);
    } else {
      setTapAssignment(null);
    }

    const { data: signoffRows } = await supabase
      .from('coach_path_stage_signoffs')
      .select('stage_number')
      .eq('user_id', user.id)
      .eq('club_id', activeClub.id);

    setStageSignoffs(new Set((signoffRows ?? []).map((r) => r.stage_number as number)));
    setLoading(false);
  }, [user?.id, activeClub?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const isEnrolled = enrollment?.status === 'active';
  const hasTapAssigned = !!tapAssignment?.active;

  const value = useMemo(
    () => ({ loading, enrollment, tapAssignment, stageSignoffs, isEnrolled, hasTapAssigned, refresh }),
    [loading, enrollment, tapAssignment, stageSignoffs, isEnrolled, hasTapAssigned, refresh],
  );

  return (
    <CoachPathEnrollmentContext.Provider value={value}>
      {children}
    </CoachPathEnrollmentContext.Provider>
  );
}

export function useCoachPathEnrollment() {
  const ctx = useContext(CoachPathEnrollmentContext);
  if (!ctx) throw new Error('useCoachPathEnrollment must be used inside CoachPathEnrollmentProvider');
  return ctx;
}
