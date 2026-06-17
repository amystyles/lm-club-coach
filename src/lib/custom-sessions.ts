import type { SessionPathKey } from '@/context/SessionProgressContext';
import type { Session } from '@/data/stage-sessions';
import {
  buildSessionFromCustomRow,
  type CustomSessionData,
} from '@/lib/custom-session-form';

export interface CustomSessionRow {
  id: string;
  user_id: string;
  club_id: string;
  path_key: SessionPathKey;
  stage_number: number;
  title: string;
  subtitle: string;
  duration: string;
  sort_order: number;
  session_data: CustomSessionData;
  created_at: string;
}

export function customSessionId(rowId: string): string {
  return `custom-${rowId}`;
}

export function isCustomSessionId(sessionId: string): boolean {
  return sessionId.startsWith('custom-');
}

function fallbackSessionData(): CustomSessionData {
  return {
    coachingSession: {
      what: 'A custom session added for your development pathway.',
      why: 'Tailor the pathway to your club’s specific coaching needs and follow-up rhythm.',
      how: [
        'Agree the purpose and format with your coach or mentor before the session.',
        'Use the Notes tab to capture observations, commitments, and follow-up items.',
      ],
    },
    sessionPlan: {
      totalDuration: '30 min',
      format: 'Custom session',
      blocks: [],
    },
  };
}

export function toSession(row: CustomSessionRow): Session {
  const sessionData =
    row.session_data && Object.keys(row.session_data).length > 0
      ? row.session_data
      : fallbackSessionData();

  return buildSessionFromCustomRow(
    row.id,
    row.title,
    row.subtitle,
    row.duration,
    sessionData,
  );
}
