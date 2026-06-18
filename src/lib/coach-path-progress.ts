import { coachPathStages } from '@/data/coach-path-data';
import type { CompletionStatus } from '@/lib/roles';

export function deriveCoachStage(confirmedSessionIds: string[]): number {
  let stage = 1;
  for (const stageNum of [1, 2, 3, 4, 5] as const) {
    const sessions = coachPathStages[stageNum]?.sessions ?? [];
    const allDone = sessions.length > 0 && sessions.every((s) => confirmedSessionIds.includes(s.id));
    if (allDone) stage = Math.min(stageNum + 1, 5);
  }
  return stage;
}

export function isSessionLocked(
  stageNum: number,
  sessionIndex: number,
  sessions: { id: string }[],
  statusBySessionId: Record<string, CompletionStatus>,
  stageSignoffs: Set<number>,
): boolean {
  if (stageNum > 1 && !stageSignoffs.has(stageNum - 1)) return true;
  if (sessionIndex === 0) return false;
  const priorId = sessions[sessionIndex - 1]?.id;
  if (!priorId) return false;
  return statusBySessionId[priorId] !== 'tap_confirmed';
}

export function getTotalCoachPathSessions(): number {
  return Object.values(coachPathStages).reduce((sum, stage) => sum + stage.sessions.length, 0);
}
