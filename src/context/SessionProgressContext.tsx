import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

export type SessionPathKey = 'coach-path' | 'development-pathway';

interface SessionProgressRow {
  path_key: SessionPathKey;
  session_id: string;
  completed: boolean;
  notes: string;
}

interface SessionProgressContextValue {
  loading: boolean;
  completedSessionIds: Record<string, string[]>;
  getNotes: (pathKey: SessionPathKey, sessionId: string) => string;
  markComplete: (pathKey: SessionPathKey, sessionId: string) => Promise<void>;
  saveNotes: (pathKey: SessionPathKey, sessionId: string, notes: string) => Promise<void>;
}

const SessionProgressContext = createContext<SessionProgressContextValue | null>(null);

export function SessionProgressProvider({ children }: { children: React.ReactNode }) {
  const { user, activeClub } = useAuth();
  const [rows, setRows] = useState<SessionProgressRow[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchProgress = useCallback(async () => {
    if (!user || !activeClub) {
      setRows([]);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from('session_progress')
      .select('path_key, session_id, completed, notes')
      .eq('user_id', user.id)
      .eq('club_id', activeClub.id);

    if (!error) setRows((data ?? []) as SessionProgressRow[]);
    setLoading(false);
  }, [user?.id, activeClub?.id]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const upsertRow = useCallback(async (
    pathKey: SessionPathKey,
    sessionId: string,
    patch: Partial<Pick<SessionProgressRow, 'completed' | 'notes'>>,
  ) => {
    if (!user || !activeClub) return;

    const existing = rows.find(
      (row) => row.path_key === pathKey && row.session_id === sessionId,
    );

    const nextRow: SessionProgressRow = {
      path_key: pathKey,
      session_id: sessionId,
      completed: patch.completed ?? existing?.completed ?? false,
      notes: patch.notes ?? existing?.notes ?? '',
    };

    setRows((prev) => {
      const filtered = prev.filter(
        (row) => !(row.path_key === pathKey && row.session_id === sessionId),
      );
      return [...filtered, nextRow];
    });

    const { error } = await supabase.from('session_progress').upsert(
      {
        user_id: user.id,
        club_id: activeClub.id,
        path_key: pathKey,
        session_id: sessionId,
        completed: nextRow.completed,
        notes: nextRow.notes,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,club_id,path_key,session_id' },
    );

    if (error) throw error;
  }, [user, activeClub, rows]);

  const completedSessionIds = useMemo(() => {
    const byPath: Record<string, string[]> = {};
    for (const row of rows) {
      if (!row.completed) continue;
      const key = row.path_key === 'coach-path' ? (user?.id ?? 'coach-path') : row.path_key;
      if (!byPath[key]) byPath[key] = [];
      byPath[key].push(row.session_id);
    }
    return byPath;
  }, [rows, user?.id]);

  const getNotes = useCallback((pathKey: SessionPathKey, sessionId: string) => {
    return rows.find((row) => row.path_key === pathKey && row.session_id === sessionId)?.notes ?? '';
  }, [rows]);

  const markComplete = useCallback(async (pathKey: SessionPathKey, sessionId: string) => {
    await upsertRow(pathKey, sessionId, { completed: true });
  }, [upsertRow]);

  const saveNotes = useCallback(async (pathKey: SessionPathKey, sessionId: string, notes: string) => {
    await upsertRow(pathKey, sessionId, { notes });
  }, [upsertRow]);

  return (
    <SessionProgressContext.Provider
      value={{ loading, completedSessionIds, getNotes, markComplete, saveNotes }}
    >
      {children}
    </SessionProgressContext.Provider>
  );
}

export function useSessionProgress() {
  const ctx = useContext(SessionProgressContext);
  if (!ctx) throw new Error('useSessionProgress must be used inside SessionProgressProvider');
  return ctx;
}
