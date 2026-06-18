import { coachPathStages, COACH_STAGE_META } from '@/data/coach-path-data';
import type { ClubCoach } from '@/data/types';
import { ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

function getTotalSessions(): number {
  return Object.values(coachPathStages).reduce((sum, stage) => sum + stage.sessions.length, 0);
}

function getNextSession(completedIds: string[]): { stageNum: number; sessionTitle: string } | null {
  for (const [stageKey, stageDetail] of Object.entries(coachPathStages)) {
    for (const session of stageDetail.sessions) {
      if (!completedIds.includes(session.id)) {
        return { stageNum: Number(stageKey), sessionTitle: session.title };
      }
    }
  }
  return null;
}

interface CoachProgressPanelProps {
  title?: string;
  coaches: ClubCoach[];
  completedSessionIds: Record<string, string[]>;
  onPrepSession?: () => void;
  showPrepButton?: boolean;
}

export default function CoachProgressPanel({
  title = 'Coach Progress',
  coaches,
  completedSessionIds,
  onPrepSession,
  showPrepButton = true,
}: CoachProgressPanelProps) {
  const totalSessions = getTotalSessions();

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <CardTitle className="text-white text-sm leading-tight">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 divide-y divide-lm-sunken">
        {coaches.map(coach => {
          const completed = completedSessionIds[coach.id] ?? [];
          const stageMeta = COACH_STAGE_META.find(s => s.stage === coach.coachStage);
          const nextSession = getNextSession(completed);
          const pct = Math.round((completed.length / totalSessions) * 100);

          return (
            <div key={coach.id} className="px-5 py-4 flex items-center gap-4">
              {/* Avatar */}
              <div className="w-9 h-9 rounded-xl bg-lm-dark flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                {coach.initials}
              </div>

              {/* Name + stage + progress */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-bold text-lm-dark truncate">{coach.name}</span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded text-white flex-shrink-0"
                    style={{ backgroundColor: stageMeta?.color ?? '#666' }}
                  >
                    Stage {coach.coachStage}
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Progress value={pct} className="h-1.5 flex-1" />
                  <span className="text-[11px] text-lm-ink-muted whitespace-nowrap">
                    {completed.length}/{totalSessions} sessions
                  </span>
                </div>
                {nextSession ? (
                  <p className="text-xs text-lm-ink-muted truncate">
                    Next: {nextSession.sessionTitle}
                  </p>
                ) : (
                  <p className="text-xs text-lm-green font-semibold">All sessions complete</p>
                )}
              </div>

              {/* Prep button */}
              {showPrepButton && onPrepSession && (
              <button
                onClick={onPrepSession}
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg border border-lm-sunken text-xs font-semibold text-lm-ink-mid hover:border-lm-green hover:text-lm-dark transition-colors"
              >
                Prep
                <ChevronRight className="w-3 h-3" />
              </button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
