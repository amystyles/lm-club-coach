import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';
import type { CompletionStatus } from '@/lib/roles';

export type SessionPathKey = 'coach-path' | 'development-pathway';

export interface SessionProgressRow {
  path_key: SessionPathKey;
  session_id: string;
  completed: boolean;
  notes: string;
  completion_status: CompletionStatus;
  tap_feedback: string;
}

interface SessionProgressContextValue {
  loading: boolean;
  completedSessionIds: Record<string, string[]>;
  confirmedSessionIds: Record<string, string[]>;
  statusBySessionId: Record<string, CompletionStatus>;
  getNotes: (pathKey: SessionPathKey, sessionId: string) => string;
  getTapFeedback: (pathKey: SessionPathKey, sessionId: string) => string;
  getSessionStatus: (pathKey: SessionPathKey, sessionId: string) => CompletionStatus;
  markPrepped: (pathKey: SessionPathKey, sessionId: string) => Promise<void>;
  markComplete: (pathKey: SessionPathKey, sessionId: string) => Promise<void>;
  saveNotes: (pathKey: SessionPathKey, sessionId: string, notes: string) => Promise<void>;
  confirmSessionForCoach: (coachUserId: string, clubId: string, sessionId: string, tapFeedback: string) => Promise<void>;
  confirmStageForCoach: (coachUserId: string, clubId: string, stageNumber: number) => Promise<void>;
  refresh: () => Promise<void>;
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
      .select('path_key, session_id, completed, notes, completion_status, tap_feedback')
      .eq('user_id', user.id)
      .eq('club_id', activeClub.id);

    if (!error) {
      setRows(
        (data ?? []).map((row) => ({
          ...row,
          completion_status: (row.completion_status ?? (row.completed ? 'tap_confirmed' : 'not_started')) as CompletionStatus,
          tap_feedback: row.tap_feedback ?? '',
        })) as SessionProgressRow[],
      );
    }
    setLoading(false);
  }, [user?.id, activeClub?.id]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const upsertRow = useCallback(async (
    pathKey: SessionPathKey,
    sessionId: string,
    patch: Partial<Pick<SessionProgressRow, 'completed' | 'notes' | 'completion_status' | 'tap_feedback'>>,
    targetUserId?: string,
    targetClubId?: string,
  ) => {
    const userId = targetUserId ?? user?.id;
    const clubId = targetClubId ?? activeClub?.id;
    if (!userId || !clubId) return;

    let existing = rows.find(
      (row) => row.path_key === pathKey && row.session_id === sessionId,
    );

    if (targetUserId && !existing) {
      const { data: remoteRow } = await supabase
        .from('session_progress')
        .select('completed, notes, completion_status, tap_feedback')
        .eq('user_id', userId)
        .eq('club_id', clubId)
        .eq('path_key', pathKey)
        .eq('session_id', sessionId)
        .maybeSingle();

      if (remoteRow) {
        existing = {
          path_key: pathKey,
          session_id: sessionId,
          completed: remoteRow.completed ?? false,
          notes: remoteRow.notes ?? '',
          completion_status: (remoteRow.completion_status ?? 'not_started') as CompletionStatus,
          tap_feedback: remoteRow.tap_feedback ?? '',
        };
      }
    }

    const nextRow: SessionProgressRow = {
      path_key: pathKey,
      session_id: sessionId,
      completed: patch.completed ?? existing?.completed ?? false,
      notes: patch.notes ?? existing?.notes ?? '',
      completion_status: patch.completion_status ?? existing?.completion_status ?? 'not_started',
      tap_feedback: patch.tap_feedback ?? existing?.tap_feedback ?? '',
    };

    if (!targetUserId) {
      setRows((prev) => {
        const filtered = prev.filter(
          (row) => !(row.path_key === pathKey && row.session_id === sessionId),
        );
        return [...filtered, nextRow];
      });
    }

    const payload: Record<string, unknown> = {
      user_id: userId,
      club_id: clubId,
      path_key: pathKey,
      session_id: sessionId,
      completed: nextRow.completed,
      notes: nextRow.notes,
      completion_status: nextRow.completion_status,
      tap_feedback: nextRow.tap_feedback,
      updated_at: new Date().toISOString(),
    };

    if (patch.completion_status === 'tap_confirmed' || nextRow.completion_status === 'tap_confirmed') {
      payload.tap_feedback_at = new Date().toISOString();
      payload.tap_feedback_by = user?.id;
    }

    const { error } = await supabase.from('session_progress').upsert(
      payload,
      { onConflict: 'user_id,club_id,path_key,session_id' },
    );

    if (error) throw error;
  }, [user, activeClub, rows]);

  const buildIdMap = useCallback((filterConfirmed: boolean) => {
    const byPath: Record<string, string[]> = {};
    for (const row of rows) {
      if (row.path_key !== 'coach-path') continue;
      const isConfirmed = row.completion_status === 'tap_confirmed' || row.completed;
      if (filterConfirmed && !isConfirmed) continue;
      if (!filterConfirmed && !row.completed && row.completion_status === 'not_started') continue;
      const key = user?.id ?? 'coach-path';
      if (!byPath[key]) byPath[key] = [];
      if (!filterConfirmed && row.completion_status === 'prepped') {
        byPath[key].push(row.session_id);
      }
      if (filterConfirmed && isConfirmed) {
        byPath[key].push(row.session_id);
      }
    }
    return byPath;
  }, [rows, user?.id]);

  const confirmedSessionIds = useMemo(() => buildIdMap(true), [buildIdMap]);

  const completedSessionIds = useMemo(() => confirmedSessionIds, [confirmedSessionIds]);

  const statusBySessionId = useMemo(() => {
    const map: Record<string, CompletionStatus> = {};
    for (const row of rows) {
      if (row.path_key === 'coach-path') {
        map[row.session_id] = row.completion_status;
      }
    }
    return map;
  }, [rows]);

  const getNotes = useCallback((pathKey: SessionPathKey, sessionId: string) => {
    return rows.find((row) => row.path_key === pathKey && row.session_id === sessionId)?.notes ?? '';
  }, [rows]);

  const getTapFeedback = useCallback((pathKey: SessionPathKey, sessionId: string) => {
    return rows.find((row) => row.path_key === pathKey && row.session_id === sessionId)?.tap_feedback ?? '';
  }, [rows]);

  const getSessionStatus = useCallback((pathKey: SessionPathKey, sessionId: string): CompletionStatus => {
    return rows.find((row) => row.path_key === pathKey && row.session_id === sessionId)?.completion_status ?? 'not_started';
  }, [rows]);

  const markPrepped = useCallback(async (pathKey: SessionPathKey, sessionId: string) => {
    await upsertRow(pathKey, sessionId, { completion_status: 'prepped', completed: false });
    await fetchProgress();
  }, [upsertRow, fetchProgress]);

  const markComplete = useCallback(async (pathKey: SessionPathKey, sessionId: string) => {
    await upsertRow(pathKey, sessionId, { completed: true });
    await fetchProgress();
  }, [upsertRow, fetchProgress]);

  const saveNotes = useCallback(async (pathKey: SessionPathKey, sessionId: string, notes: string) => {
    await upsertRow(pathKey, sessionId, { notes });
  }, [upsertRow]);

  const confirmSessionForCoach = useCallback(async (
    coachUserId: string,
    clubId: string,
    sessionId: string,
    tapFeedback: string,
  ) => {
    await upsertRow(
      'coach-path',
      sessionId,
      { completion_status: 'tap_confirmed', completed: true, tap_feedback: tapFeedback },
      coachUserId,
      clubId,
    );
    await fetchProgress();
  }, [upsertRow, fetchProgress]);

  const confirmStageForCoach = useCallback(async (
    coachUserId: string,
    clubId: string,
    stageNumber: number,
  ) => {
    const { error } = await supabase.from('coach_path_stage_signoffs').upsert(
      {
        user_id: coachUserId,
        club_id: clubId,
        stage_number: stageNumber,
        signed_off_by: user?.id,
        signed_off_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,club_id,stage_number' },
    );
    if (error) throw error;
  }, [user?.id]);

  return (
    <SessionProgressContext.Provider
      value={{
        loading,
        completedSessionIds,
        confirmedSessionIds,
        statusBySessionId,
        getNotes,
        getTapFeedback,
        getSessionStatus,
        markPrepped,
        markComplete,
        saveNotes,
        confirmSessionForCoach,
        confirmStageForCoach,
        refresh: fetchProgress,
      }}
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
