import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { SessionPathKey } from '@/context/SessionProgressContext';
import { useAuth } from '@/context/AuthContext';
import type { CustomSessionRow } from '@/lib/custom-sessions';
import { customSessionId, toSession } from '@/lib/custom-sessions';
import type { CustomSessionData } from '@/lib/custom-session-form';
import type { Session } from '@/data/stage-sessions';

export interface CreateCustomSessionInput {
  pathKey: SessionPathKey;
  stageNumber: number;
  title: string;
  subtitle?: string;
  duration?: string;
  sessionData: CustomSessionData;
}

interface CustomSessionsContextValue {
  loading: boolean;
  rows: CustomSessionRow[];
  getSessionsForStage: (pathKey: SessionPathKey, stageNumber: number) => Session[];
  createSession: (input: CreateCustomSessionInput) => Promise<Session>;
}

const CustomSessionsContext = createContext<CustomSessionsContextValue | null>(null);

export function CustomSessionsProvider({ children }: { children: React.ReactNode }) {
  const { user, activeClub, isAdmin } = useAuth();
  const [rows, setRows] = useState<CustomSessionRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSessions = useCallback(async () => {
    if (!user || !activeClub) {
      setRows([]);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('custom_sessions')
      .select('*')
      .eq('club_id', activeClub.id)
      .order('stage_number')
      .order('sort_order')
      .order('created_at');

    if (!error) setRows((data ?? []) as CustomSessionRow[]);
    setLoading(false);
  }, [user?.id, activeClub?.id]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  const getSessionsForStage = useCallback((pathKey: SessionPathKey, stageNumber: number) => {
    return rows
      .filter((row) => row.path_key === pathKey && row.stage_number === stageNumber)
      .map(toSession);
  }, [rows]);

  const createSession = useCallback(async (input: CreateCustomSessionInput) => {
    if (!user || !activeClub) {
      throw new Error('You must be signed in with an active club to add a session.');
    }
    if (!isAdmin) {
      throw new Error('Only admins can add sessions.');
    }

    const stageRows = rows.filter(
      (row) => row.path_key === input.pathKey && row.stage_number === input.stageNumber,
    );
    const sortOrder = stageRows.length;
    const duration = input.duration?.trim() || input.sessionData.sessionPlan?.totalDuration || '30 min';

    const { data, error } = await supabase
      .from('custom_sessions')
      .insert({
        user_id: user.id,
        club_id: activeClub.id,
        path_key: input.pathKey,
        stage_number: input.stageNumber,
        title: input.title.trim(),
        subtitle: input.subtitle?.trim() ?? '',
        duration,
        sort_order: sortOrder,
        session_data: input.sessionData,
      })
      .select('*')
      .single();

    if (error) throw error;

    const row = data as CustomSessionRow;
    setRows((prev) => [...prev, row]);
    return toSession(row);
  }, [user, activeClub, isAdmin, rows]);

  const value = useMemo(
    () => ({ loading, rows, getSessionsForStage, createSession }),
    [loading, rows, getSessionsForStage, createSession],
  );

  return (
    <CustomSessionsContext.Provider value={value}>
      {children}
    </CustomSessionsContext.Provider>
  );
}

export function useCustomSessions() {
  const ctx = useContext(CustomSessionsContext);
  if (!ctx) throw new Error('useCustomSessions must be used inside CustomSessionsProvider');
  return ctx;
}

export { customSessionId };
