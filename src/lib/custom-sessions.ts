import type { SessionPathKey } from '@/context/SessionProgressContext';
import type { Session } from '@/data/stage-sessions';

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
  created_at: string;
}

export function customSessionId(rowId: string): string {
  return `custom-${rowId}`;
}

export function isCustomSessionId(sessionId: string): boolean {
  return sessionId.startsWith('custom-');
}

export function toSession(row: CustomSessionRow): Session {
  return {
    id: customSessionId(row.id),
    title: row.title,
    subtitle: row.subtitle || 'Custom session',
    content: [],
    sessionPlan: {
      totalDuration: row.duration || '30 min',
      format: 'Custom session',
      blocks: [],
    },
    coachingSession: {
      what: 'A custom session added for your development pathway.',
      why: 'Tailor the pathway to your club’s specific coaching needs and follow-up rhythm.',
      how: [
        'Agree the purpose and format with your coach or mentor before the session.',
        'Use the Notes tab to capture observations, commitments, and follow-up items.',
      ],
    },
  };
}
