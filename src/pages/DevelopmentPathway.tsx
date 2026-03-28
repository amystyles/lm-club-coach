import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  AlertTriangle, CheckCircle2, Info, Star, Clock, MessageCircle, Eye,
  Megaphone, Check, ChevronLeft, ChevronRight, Target,
  GraduationCap, MessageSquareQuote, NotebookPen, Shield,
} from 'lucide-react';
import { STAGE_DATA } from '@/data/mock-data';
import { stageDetails, type Session } from '@/data/stage-sessions';

/* ─────────────────────────────────────────────
   Section Header — reusable icon + title row
   ───────────────────────────────────────────── */
function SectionHeader({
  icon: Icon,
  title,
  color,
  colorBg,
}: {
  icon: React.ElementType;
  title: string;
  color?: string;
  colorBg?: string;
}) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center"
        style={{ backgroundColor: colorBg || '#F0F0F0' }}
      >
        <Icon className="w-4 h-4" style={{ color: color || '#0A0A0A' }} />
      </div>
      <h4 className="font-bold text-lm-dark text-base">{title}</h4>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WHAT / WHY / HOW — structured coaching block
   ───────────────────────────────────────────── */
function CoachingSessionBlock({ session, stageColor }: { session: Session; stageColor: string }) {
  const cs = session.coachingSession;
  if (!cs) return null;

  return (
    <div className="space-y-6">
      {/* WHAT */}
      <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
        <div className="flex items-center gap-2 mb-2">
          <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5" style={{ backgroundColor: stageColor, color: '#fff' }}>
            What
          </Badge>
        </div>
        <p className="text-lm-dark text-sm font-medium leading-relaxed">{cs.what}</p>
      </div>

      {/* WHY */}
      <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-lm-dark" />
        <div className="flex items-center gap-2 mb-2">
          <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-lm-dark text-white">
            Why
          </Badge>
        </div>
        <p className="text-lm-dark text-sm font-medium leading-relaxed">{cs.why}</p>
      </div>

      {/* HOW */}
      <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-lm-green" />
        <div className="flex items-center gap-2 mb-3">
          <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-lm-green text-lm-dark">
            How
          </Badge>
          <span className="text-xs text-lm-ink-muted">Coach Actions</span>
        </div>
        <ul className="space-y-3">
          {cs.how.map((step, i) => (
            <li key={i} className="flex gap-3 text-sm text-lm-ink-mid leading-relaxed">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: stageColor }} />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Coaching Prompts */}
      {cs.prompts && cs.prompts.length > 0 && (
        <div>
          <SectionHeader icon={MessageSquareQuote} title="Questions & Prompts to Use" color={stageColor} colorBg={stageColor + '18'} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cs.prompts.map((group) => (
              <div key={group.label} className="rounded-xl border border-border bg-lm-subtle p-4">
                <p className="text-xs font-bold text-lm-dark uppercase tracking-wider mb-3">{group.label}</p>
                <ul className="space-y-2.5">
                  {group.prompts.map((prompt, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-lm-ink-mid leading-relaxed">
                      <MessageSquareQuote className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-lm-ink-muted" />
                      <span className="italic">"{prompt}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Session Goals */}
      {cs.goals && cs.goals.length > 0 && (
        <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
          <SectionHeader icon={GraduationCap} title="Session Goals" color="#0A0A0A" colorBg="rgba(0,255,99,0.15)" />
          <ul className="space-y-2.5">
            {cs.goals.map((goal, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-lm-dark leading-relaxed">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-lm-dark" />
                <span className="font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* LMQ Alignment */}
      {cs.lmqAlignment && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-slate-200 flex-shrink-0">
            <Shield className="w-4 h-4 text-slate-700" />
          </div>
          <div>
            <p className="font-bold text-lm-dark text-sm mb-1">LMQ Alignment</p>
            <p className="text-lm-ink-mid text-sm leading-relaxed">{cs.lmqAlignment}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Session Content — full session renderer
   ───────────────────────────────────────────── */
function SessionContent({ session, stageColor }: { session: Session; stageColor: string }) {
  const [notes, setNotes] = useState('');
  const hasCoachingSession = !!session.coachingSession;

  return (
    <div className="space-y-8">
      {/* Coach Role */}
      {session.coachRole && (
        <div className="rounded-xl border border-lm-sunken bg-lm-subtle p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
          <SectionHeader icon={Megaphone} title="Coach Role" color={stageColor} colorBg={stageColor + '18'} />
          <p className="text-lm-dark font-medium leading-relaxed mb-2">{session.coachRole.summary}</p>
          <p className="text-lm-ink-mid text-sm leading-relaxed mb-5">{session.coachRole.context}</p>
          <div className="flex items-center gap-3 bg-lm-green-mid rounded-lg px-4 py-3 border border-lm-green/10">
            <Star className="w-4 h-4 text-lm-dark flex-shrink-0" />
            <p className="text-lm-dark font-semibold text-sm italic">{session.coachRole.principle}</p>
          </div>
        </div>
      )}

      {/* Key Element Focus */}
      {session.keyElementFocus && (
        <div>
          <SectionHeader icon={Target} title="Key Element Focus" />
          <p className="text-lm-ink-mid text-sm mb-4 leading-relaxed">{session.keyElementFocus.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {session.keyElementFocus.elements.map((el) => (
              <div key={el.name} className="bg-white rounded-xl border border-border p-4 hover:shadow-md transition-shadow">
                <p className="font-bold text-lm-dark text-sm mb-1">{el.name}</p>
                <p className="text-lm-ink-muted text-xs leading-relaxed">{el.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Rich Coaching Session (WHAT / WHY / HOW) ── */}
      {hasCoachingSession && (
        <CoachingSessionBlock session={session} stageColor={stageColor} />
      )}

      {/* Instructor Pre-Work */}
      {session.instructorPreWork && (
        <div>
          <SectionHeader icon={Eye} title={session.instructorPreWork.title} />
          <p className="text-lm-ink-mid text-sm mb-5 leading-relaxed">{session.instructorPreWork.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {session.instructorPreWork.phases.map((phase) => (
              <div key={phase.name} className="border border-border rounded-xl p-4 bg-white hover:shadow-md transition-shadow">
                <h5 className="font-bold text-lm-dark text-sm mb-3">{phase.name}</h5>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-lm-ink-mid text-xs flex gap-2.5 leading-relaxed">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: stageColor }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Warning */}
      {session.warning && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 rounded-xl">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-900 font-bold">{session.warning.title}</AlertTitle>
          <AlertDescription className="text-red-800 mt-2 leading-relaxed">{session.warning.description}</AlertDescription>
        </Alert>
      )}

      {/* Coach Actions (fallback for sessions without coachingSession) */}
      {!hasCoachingSession && (
        <div>
          <SectionHeader icon={MessageCircle} title="Your Coach Actions" color={stageColor} colorBg={stageColor + '18'} />
          <div className="space-y-4">
            {session.content.map((section, idx) => (
              <div key={idx} className="border border-border rounded-xl p-5 bg-white relative overflow-hidden hover:shadow-md transition-shadow">
                <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
                <h4 className="font-bold text-lm-dark mb-4 flex items-center gap-2.5 text-sm">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: stageColor }} />
                  {section.week}
                </h4>
                <ul className="space-y-3">
                  {section.tasks.map((task, taskIdx) => (
                    <li key={taskIdx} className="text-lm-ink-mid text-sm flex gap-2.5 leading-relaxed">
                      <Check className="w-4 h-4 text-lm-ink-muted flex-shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Pro Tip */}
      {session.proTip && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-amber-100 flex-shrink-0">
            <Info className="w-4 h-4 text-amber-700" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-sm">Pro Tip</p>
            <p className="text-amber-800 text-sm mt-1 leading-relaxed">{session.proTip}</p>
          </div>
        </div>
      )}

      {/* ── Notes / Observations Area ── */}
      <div className="rounded-xl border border-border bg-lm-subtle p-6">
        <SectionHeader icon={NotebookPen} title="Your Notes & Observations" />
        <p className="text-lm-ink-muted text-xs mb-3">
          Capture what you noticed during this session. These notes stay local to your browser.
        </p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you observe? Any strengths, gaps, or follow-up items..."
          rows={4}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-lm-ink-mid placeholder:text-lm-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-lm-green focus:border-transparent resize-y"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Session Step Indicator
   ───────────────────────────────────────────── */
function SessionNav({
  sessions,
  activeId,
  onSelect,
}: {
  sessions: Session[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const activeIdx = sessions.findIndex((s) => s.id === activeId);
  const canPrev = activeIdx > 0;
  const canNext = activeIdx < sessions.length - 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-0">
        {sessions.map((session, idx) => {
          const isActive = session.id === activeId;
          const isPast = idx < activeIdx;
          return (
            <React.Fragment key={session.id}>
              <button
                onClick={() => onSelect(session.id)}
                className="flex flex-col items-center gap-2 group relative flex-1 min-w-0"
              >
                <div className="relative z-10 flex items-center justify-center">
                  {/* Glow ring on active */}
                  {isActive && (
                    <div className="absolute w-14 h-14 rounded-full bg-lm-green/20 animate-pulse" />
                  )}
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 relative ${
                      isActive
                        ? 'bg-lm-dark text-lm-green ring-2 ring-lm-green ring-offset-2 scale-110 shadow-lg'
                        : isPast
                          ? 'bg-lm-green text-lm-dark shadow-md'
                          : 'bg-lm-sunken text-lm-ink-muted border-2 border-lm-sunken group-hover:border-lm-ink-muted/30'
                    }`}
                  >
                    {isPast ? <Check className="w-4.5 h-4.5" /> : idx + 1}
                  </div>
                </div>
                <div className="text-center px-1">
                  <p className={`text-xs font-semibold transition-colors leading-tight ${isActive ? 'text-lm-dark' : 'text-lm-ink-muted'}`}>
                    <span className="hidden sm:inline">{session.title}</span>
                    <span className="sm:hidden">S{idx + 1}</span>
                  </p>
                  <p className="text-[10px] text-lm-ink-muted mt-0.5 hidden md:block">{session.subtitle}</p>
                </div>
              </button>
              {idx < sessions.length - 1 && (
                <div className="h-[2px] flex-shrink-0 w-6 sm:w-10 -mt-6 z-0">
                  <div
                    className={`h-full rounded-full transition-colors ${
                      idx < activeIdx ? 'bg-lm-green' : 'bg-lm-sunken'
                    }`}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={() => canPrev && onSelect(sessions[activeIdx - 1].id)}
          disabled={!canPrev}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            canPrev ? 'text-lm-dark hover:bg-lm-subtle' : 'text-lm-ink-muted/40 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          Previous
        </button>
        <span className="text-xs text-lm-ink-muted font-medium">
          {activeIdx + 1} of {sessions.length} sessions
        </span>
        <button
          onClick={() => canNext && onSelect(sessions[activeIdx + 1].id)}
          disabled={!canNext}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
            canNext ? 'text-lm-dark hover:bg-lm-subtle' : 'text-lm-ink-muted/40 cursor-not-allowed'
          }`}
        >
          Next
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
export default function DevelopmentPathway() {
  const [activeStage, setActiveStage] = useState(1);
  const [activeSessions, setActiveSessions] = useState<Record<number, string>>({});

  const currentStageData = stageDetails[activeStage];
  const currentStageColor = currentStageData?.color || 'hsl(217, 85%, 55%)';

  const getActiveSessionId = (stageNum: number) => {
    const stage = stageDetails[stageNum];
    return activeSessions[stageNum] || stage?.sessions[0]?.id || '';
  };

  const currentSession = currentStageData?.sessions.find(
    (s) => s.id === getActiveSessionId(activeStage)
  ) || currentStageData?.sessions[0];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero Header ── */}
      <div className="lm-hero px-8 pt-10 pb-12">
        <div className="max-w-6xl mx-auto">
          <p className="text-lm-green text-xs font-bold tracking-[0.2em] uppercase mb-3">
            Instructor Development
          </p>
          <h1 className="text-white text-3xl md:text-4xl font-display font-bold mb-2">
            Development Pathway
          </h1>
          <p className="text-white/50 text-sm max-w-lg">
            From Day One to World-Class — a structured journey through five stages of instructor growth.
          </p>

          {/* Stage Selector */}
          <div className="mt-10 grid grid-cols-5 gap-4">
            {STAGE_DATA.map((stage) => {
              const isActive = activeStage === stage.stage;
              const detail = stageDetails[stage.stage];
              const sessionCount = detail?.sessions.length || 0;
              return (
                <button
                  key={stage.stage}
                  onClick={() => setActiveStage(stage.stage)}
                  className="group text-left"
                >
                  <div
                    className={`rounded-xl p-5 transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? 'bg-white shadow-lg shadow-black/20'
                        : 'bg-white/[0.06] hover:bg-white/10 border border-white/[0.08]'
                    }`}
                  >
                    {/* Green top accent on active */}
                    {isActive && (
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-lm-green" />
                    )}
                    <p className={`text-[11px] font-bold uppercase tracking-[0.15em] mb-3 ${
                      isActive ? 'text-lm-green' : 'text-lm-green/60'
                    }`}>
                      Stage {stage.stage}
                    </p>
                    <p className={`text-base font-bold font-display mb-1 transition-colors ${
                      isActive ? 'text-lm-dark' : 'text-white group-hover:text-white'
                    }`}>
                      {stage.name}
                    </p>
                    <p className={`text-xs mb-3 ${
                      isActive ? 'text-lm-ink-mid' : 'text-white/70'
                    }`}>
                      {stage.duration}
                    </p>
                    <p className={`text-[11px] font-medium ${
                      isActive ? 'text-lm-ink-muted' : 'text-lm-green/40'
                    }`}>
                      {sessionCount} session{sessionCount !== 1 ? 's' : ''}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content Area ── */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        {currentStageData && (
          <div className="space-y-8">
            {/* Stage title bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-xl text-white text-sm font-bold flex items-center justify-center shadow-md"
                  style={{ backgroundColor: currentStageColor }}
                >
                  {activeStage}
                </div>
                <div>
                  <h2 className="text-xl font-display font-bold text-lm-dark">
                    Stage {activeStage}: {currentStageData.name}
                  </h2>
                  <p className="text-lm-ink-muted text-sm">{currentStageData.subtitle}</p>
                </div>
              </div>
              <Badge variant="outline" className="hidden sm:flex gap-1.5">
                <Clock className="w-3 h-3" />
                {currentStageData.duration}
              </Badge>
            </div>

            {/* Session step indicator */}
            <div className="bg-white rounded-2xl border border-border p-6 shadow-sm">
              <SessionNav
                sessions={currentStageData.sessions}
                activeId={getActiveSessionId(activeStage)}
                onSelect={(id) => setActiveSessions((prev) => ({ ...prev, [activeStage]: id }))}
              />
            </div>

            {/* Active session content */}
            {currentSession && (
              <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
                <div className="mb-8 pb-6 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: currentStageColor }} />
                    <h3 className="text-lg font-bold text-lm-dark">{currentSession.title}</h3>
                  </div>
                  <p className="text-lm-ink-muted text-sm mt-1 ml-5">{currentSession.subtitle}</p>
                </div>
                <SessionContent key={currentSession.id} session={currentSession} stageColor={currentStageColor} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
