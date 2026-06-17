import { coachPathStages } from '@/data/coach-path-data';
import { stageDetails } from '@/data/stage-sessions';
import type { SessionPathKey } from '@/context/SessionProgressContext';
import type { CustomSessionRow } from '@/lib/custom-sessions';
import { customSessionId } from '@/lib/custom-sessions';

const PATH_LABELS: Record<SessionPathKey, string> = {
  'coach-path': 'Club Coach Path',
  'development-pathway': 'Development Pathway',
};

export function getPathLabel(pathKey: SessionPathKey): string {
  return PATH_LABELS[pathKey];
}

export function getBuiltInSessionTitle(pathKey: SessionPathKey, sessionId: string): string | null {
  const stages = pathKey === 'coach-path' ? coachPathStages : stageDetails;
  for (const stage of Object.values(stages)) {
    const match = stage.sessions.find((session) => session.id === sessionId);
    if (match) return match.title;
  }
  return null;
}

export function getSessionTitle(
  pathKey: SessionPathKey,
  sessionId: string,
  customSessions: CustomSessionRow[] = [],
): string {
  const builtIn = getBuiltInSessionTitle(pathKey, sessionId);
  if (builtIn) return builtIn;

  const custom = customSessions.find((row) => customSessionId(row.id) === sessionId);
  return custom?.title ?? sessionId;
}
