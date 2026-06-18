import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { CompletionStatus } from '@/lib/roles';
import type { SessionPathKey } from './SessionProgressContext';

export interface ClubCoachProgressRow {
  user_id: string;
  session_id: string;
  completion_status: CompletionStatus;
  completed: boolean;
}

interface ClubCoachRosterContextValue {
  loading: boolean;
  clubProgressByUser: Record<string, ClubCoachProgressRow[]>;
  refresh: () => Promise<void>;
}

const ClubCoachRosterContext = createContext<ClubCoachRosterContextValue | null>(null);

export function ClubCoachRosterProvider({ children }: { children: React.ReactNode }) {
  const { activeClub } = useAuth();
  const [rows, setRows] = useState<ClubCoachProgressRow[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!activeClub) {
      setRows([]);
      return;
    }

    setLoading(true);
    const { data } = await supabase
      .from('session_progress')
      .select('user_id, session_id, completion_status, completed')
      .eq('club_id', activeClub.id)
      .eq('path_key', 'coach-path');

    setRows((data ?? []) as ClubCoachProgressRow[]);
    setLoading(false);
  }, [activeClub?.id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const clubProgressByUser = useMemo(() => {
    const byUser: Record<string, ClubCoachProgressRow[]> = {};
    for (const row of rows) {
      if (!byUser[row.user_id]) byUser[row.user_id] = [];
      byUser[row.user_id].push(row);
    }
    return byUser;
  }, [rows]);

  return (
    <ClubCoachRosterContext.Provider value={{ loading, clubProgressByUser, refresh }}>
      {children}
    </ClubCoachRosterContext.Provider>
  );
}

export function useClubCoachRoster() {
  const ctx = useContext(ClubCoachRosterContext);
  if (!ctx) throw new Error('useClubCoachRoster must be used inside ClubCoachRosterProvider');
  return ctx;
}

export function getConfirmedIdsForUser(
  clubProgressByUser: Record<string, ClubCoachProgressRow[]>,
  userId: string,
): string[] {
  return (clubProgressByUser[userId] ?? [])
    .filter((r) => r.completion_status === 'tap_confirmed' || r.completed)
    .map((r) => r.session_id);
}

export type { SessionPathKey };
