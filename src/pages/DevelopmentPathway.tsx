import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle, CheckCircle2, Info, Star, Clock,
  Eye, Megaphone, Check, Target,
  GraduationCap, MessageSquareQuote, NotebookPen, Shield,
  CalendarClock, Users, BookOpen, Plus, Zap, FileText, ArrowUpRight,
} from 'lucide-react';
import { STAGE_DATA } from '@/data/mock-data';
import { stageDetails, type Session, type KEActivityGroup } from '@/data/stage-sessions';

/* ─────────────────────────────────────────────
   Tab definition
   ───────────────────────────────────────────── */
type TabId = 'brief' | 'plan' | 'prompts' | 'notes';

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: 'brief',   label: 'Brief',        icon: BookOpen },
  { id: 'plan',    label: 'Session Plan', icon: CalendarClock },
  { id: 'prompts', label: 'Prompts',      icon: MessageSquareQuote },
  { id: 'notes',   label: 'Notes',        icon: NotebookPen },
];

/* ─────────────────────────────────────────────
   Brief Tab — Coach Role + WHAT / WHY / HOW
   ───────────────────────────────────────────── */
function BriefTab({ session, stageColor }: { session: Session; stageColor: string }) {
  const cs = session.coachingSession;

  return (
    <div className="space-y-5">
      {/* Session Goals — context for what this session needs to achieve */}
      {cs?.goals && cs.goals.length > 0 && (
        <div className="rounded-xl border border-[#00FF63]/20 bg-[#00FF63]/[.06] p-5">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-[#00FF63]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00FF63]">Session Goals</span>
          </div>
          <ul className="space-y-2">
            {cs.goals.map((goal, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-white/80 leading-relaxed">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#00FF63]/70" />
                <span className="font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Coach Role */}
      {session.coachRole && (
        <div className="rounded-xl border border-lm-sunken bg-lm-subtle p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="w-3.5 h-3.5" style={{ color: stageColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Coach Role</span>
          </div>
          <p className="text-lm-dark font-semibold text-sm leading-relaxed mb-2">{session.coachRole.summary}</p>
          <p className="text-lm-ink-mid text-sm leading-relaxed mb-4">{session.coachRole.context}</p>
          <div className="flex items-start gap-2.5 bg-[#00FF63]/[.07] rounded-lg px-4 py-3 border border-[#00FF63]/15">
            <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-[#00FF63]" />
            <p className="text-white/80 font-semibold text-sm italic">{session.coachRole.principle}</p>
          </div>
        </div>
      )}

      {/* Key Element Focus */}
      {session.keyElementFocus && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-3.5 h-3.5 text-lm-ink-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Key Element Focus</span>
          </div>
          <p className="text-lm-ink-mid text-xs mb-3 leading-relaxed">{session.keyElementFocus.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {session.keyElementFocus.elements.map((el) => (
              <div key={el.name} className="bg-card rounded-xl border border-border p-4">
                <p className="font-bold text-lm-dark text-sm mb-1">{el.name}</p>
                <p className="text-lm-ink-muted text-xs leading-relaxed">{el.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WHAT / WHY / HOW */}
      {cs && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
            <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 mb-2" style={{ backgroundColor: stageColor, color: '#fff' }}>What</Badge>
            <p className="text-lm-dark text-sm font-medium leading-relaxed">{cs.what}</p>
          </div>

          <div className="rounded-xl border border-white/8 bg-white/[.03] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-white/30" />
            <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 mb-2 bg-white/10 text-white border border-white/15">Why</Badge>
            <p className="text-white/80 text-sm font-medium leading-relaxed">{cs.why}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-lm-green" />
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-lm-green text-lm-dark">How</Badge>
              <span className="text-xs text-lm-ink-muted">Coach Actions</span>
            </div>
            <ul className="space-y-2.5">
              {cs.how.map((step, i) => (
                <li key={i} className="flex gap-2.5 text-sm text-lm-ink-mid leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: stageColor }} />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {cs.lmqAlignment && (
            <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-start gap-3">
              <Shield className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-lm-dark text-[10px] uppercase tracking-[0.15em] mb-1">LMQ Alignment</p>
                <p className="text-lm-ink-mid text-sm leading-relaxed">{cs.lmqAlignment}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Fallback coach actions */}
      {!cs && session.content.map((section, idx) => (
        <div key={idx} className="border border-border rounded-xl p-5 bg-card relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
          <h4 className="font-bold text-lm-dark mb-3 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" style={{ color: stageColor }} />
            {section.week}
          </h4>
          <ul className="space-y-2.5">
            {section.tasks.map((task, tIdx) => (
              <li key={tIdx} className="text-lm-ink-mid text-sm flex gap-2 leading-relaxed">
                <Check className="w-4 h-4 text-lm-ink-muted flex-shrink-0 mt-0.5" />
                <span>{task}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Plan Tab — timed session agenda
   ───────────────────────────────────────────── */
function PlanTab({ session, stageColor }: { session: Session; stageColor: string }) {
  const plan = session.sessionPlan;

  if (!plan) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <CalendarClock className="w-10 h-10 text-lm-ink-muted/30 mb-3" />
        <p className="text-lm-ink-muted text-sm font-medium">No session plan yet</p>
        <p className="text-lm-ink-muted/60 text-xs mt-1">Check back as more sessions are built out.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4 py-1">
        <div className="flex items-center gap-1.5 text-sm text-lm-ink-mid font-semibold">
          <Clock className="w-4 h-4 text-lm-ink-muted" />
          {plan.totalDuration}
        </div>
        <div className="w-px h-4 bg-lm-sunken" />
        <div className="flex items-center gap-1.5 text-sm text-lm-ink-mid">
          <Users className="w-4 h-4 text-lm-ink-muted" />
          {plan.format}
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[19px] top-5 bottom-5 w-[2px] bg-lm-sunken" />
        <div className="space-y-3">
          {plan.blocks.map((block, idx) => (
            <div key={idx} className="flex gap-4">
              <div
                className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: stageColor }}
              >
                {idx + 1}
              </div>
              <div className="flex-1 rounded-xl border border-border bg-card p-5 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <p className="font-bold text-lm-dark text-sm">{block.title}</p>
                  <span className="flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-lm-subtle text-lm-ink-mid border border-lm-sunken whitespace-nowrap">
                    {block.duration}
                  </span>
                </div>
                <ul className="space-y-2">
                  {block.steps.map((step, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-lm-ink-mid leading-relaxed">
                      <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-lm-ink-muted" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
                {block.tip && (
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-2.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">{block.tip}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Prompts Tab — coaching questions by group
   ───────────────────────────────────────────── */
function PromptsTab({ session, stageColor }: { session: Session; stageColor: string }) {
  const cs = session.coachingSession;

  if (!cs?.prompts?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <MessageSquareQuote className="w-10 h-10 text-lm-ink-muted/30 mb-3" />
        <p className="text-lm-ink-muted text-sm font-medium">No prompts defined yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <p className="text-lm-ink-muted text-sm leading-relaxed">
        Use these to guide the conversation. Listen more than you speak.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cs.prompts.map((group) => (
          <div key={group.label} className="rounded-xl border border-border bg-card p-5">
            <p className="text-[10px] font-bold text-lm-dark uppercase tracking-[0.15em] mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: stageColor }} />
              {group.label}
            </p>
            <ul className="space-y-3">
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

      {cs.lmqAlignment && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
          <Shield className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-lm-dark text-[10px] uppercase tracking-[0.15em] mb-1">LMQ Alignment</p>
            <p className="text-lm-ink-mid text-sm leading-relaxed">{cs.lmqAlignment}</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Notes Tab — goals (checkable) + notes area
   ───────────────────────────────────────────── */
function NotesTab({ session }: { session: Session }) {
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-6">
      {/* Instructor Pre-Work */}
      {session.instructorPreWork && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-3.5 h-3.5 text-lm-ink-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">{session.instructorPreWork.title}</span>
          </div>
          <p className="text-lm-ink-mid text-sm mb-4 leading-relaxed">{session.instructorPreWork.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {session.instructorPreWork.phases.map((phase) => (
              <div key={phase.name} className="border border-border rounded-xl p-4 bg-card">
                <h5 className="font-bold text-lm-dark text-[10px] uppercase tracking-wider mb-3">{phase.name}</h5>
                <ul className="space-y-2">
                  {phase.items.map((item, i) => (
                    <li key={i} className="text-lm-ink-mid text-xs flex gap-2 leading-relaxed">
                      <span className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0 bg-lm-ink-muted/40" />
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
        <Alert variant="destructive" className="bg-red-500/10 border-red-500/20 rounded-xl">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 mt-1 leading-relaxed">{session.warning.description}</AlertDescription>
        </Alert>
      )}

      {/* Pro Tip */}
      {session.proTip && (
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-100 flex-shrink-0">
            <Info className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-[10px] uppercase tracking-wider mb-1">Pro Tip</p>
            <p className="text-amber-700 dark:text-amber-400 text-sm leading-relaxed">{session.proTip}</p>
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="rounded-xl border border-border bg-lm-subtle p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <NotebookPen className="w-3.5 h-3.5 text-lm-ink-muted" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Your Notes</span>
        </div>
        <p className="text-lm-ink-muted text-xs mb-3">Capture observations from this session. Stays local to your browser.</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What did you observe? Strengths, gaps, follow-up items..."
          rows={5}
          className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-lm-ink-mid placeholder:text-lm-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-lm-green focus:border-transparent resize-y"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Session Workspace — tabbed right panel
   ───────────────────────────────────────────── */
function SessionWorkspace({
  session,
  stageColor,
  activeTab,
  onTabChange,
}: {
  session: Session;
  stageColor: string;
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}) {
  const availableTabs = TABS.filter((tab) => {
    if (tab.id === 'plan')    return !!session.sessionPlan;
    if (tab.id === 'prompts') return !!session.coachingSession?.prompts?.length;
    return true;
  });

  const currentTab = availableTabs.find((t) => t.id === activeTab) ? activeTab : 'brief';

  return (
    <div>
      {/* Session header */}
      <div className="mb-6 pb-6 border-b border-border">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-display font-bold text-lm-dark leading-tight">{session.title}</h3>
            {session.sessionPlan && (
              <div className="flex items-center gap-3 mt-1.5">
                <span className="flex items-center gap-1 text-xs font-semibold text-lm-ink-mid">
                  <Clock className="w-3 h-3 text-lm-ink-muted" />
                  {session.sessionPlan.totalDuration}
                </span>
                <span className="text-lm-sunken">·</span>
                <span className="flex items-center gap-1 text-xs text-lm-ink-muted">
                  <Users className="w-3 h-3" />
                  {session.sessionPlan.format}
                </span>
              </div>
            )}
          </div>
          <div
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm"
            style={{ backgroundColor: stageColor }}
          >
            {session.id.split('-')[0]}
          </div>
        </div>
      </div>

      {/* Tab navigation */}
      <div className="flex items-center gap-2 mb-7 flex-wrap">
        {availableTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all focus:outline-none ${
                isActive
                  ? 'bg-[#00FF63] text-[#0A0A0A] shadow-sm'
                  : 'text-white/40 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div>
        {currentTab === 'brief'   && <BriefTab   session={session} stageColor={stageColor} />}
        {currentTab === 'plan'    && <PlanTab    session={session} stageColor={stageColor} />}
        {currentTab === 'prompts' && <PromptsTab session={session} stageColor={stageColor} />}
        {currentTab === 'notes'   && <NotesTab   session={session} />}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Activity Detail — full panel for one activity
   ───────────────────────────────────────────── */
function ActivityDetail({
  item,
  elementName,
  elementColor,
  isDone,
  onToggle,
  onBack,
}: {
  item: KEActivityGroup['items'][number];
  elementName: string;
  elementColor: string;
  isDone: boolean;
  onToggle: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Back link */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-lm-ink-muted hover:text-lm-dark transition-colors focus:outline-none"
      >
        <span className="text-base leading-none">←</span>
        <span>Back to Activities</span>
      </button>

      {/* Title + meta */}
      <div>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: elementColor }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
            {elementName}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-lm-ink-muted bg-lm-subtle border border-lm-sunken px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {item.duration}
          </span>
          {isDone && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 dark:text-green-400 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3 h-3" />
              Completed
            </span>
          )}
        </div>
        <h3 className={`text-2xl font-display font-bold leading-tight ${isDone ? 'text-lm-ink-muted' : 'text-lm-dark'}`}>
          {item.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-lm-ink-mid text-sm leading-relaxed">{item.description}</p>

      {/* Video or self-directed */}
      {item.video ? (
        <div className="flex justify-end">
          <a
            href="#"
            data-program={item.video.program}
            data-video-type="masterclass"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-lm-dark bg-card border border-border px-3 py-1.5 rounded-lg hover:bg-lm-subtle transition-colors"
          >
            {item.video.label}
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      ) : (
        <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-lm-subtle border border-lm-sunken">
          <FileText className="w-4 h-4 text-lm-ink-muted flex-shrink-0" />
          <p className="text-xs text-lm-ink-muted font-medium">Self-directed activity — no video required</p>
        </div>
      )}

      {/* Steps */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lm-ink-muted mb-3">Steps</p>
        <ol className="space-y-3">
          {item.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mt-0.5"
                style={{ backgroundColor: elementColor }}
              >
                {i + 1}
              </span>
              <p className="text-sm text-lm-ink-mid leading-relaxed pt-0.5">{step}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Mark complete */}
      <div className="pt-2">
        <button
          onClick={onToggle}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${
            isDone
              ? 'bg-lm-subtle border border-lm-sunken text-lm-ink-muted hover:border-lm-ink-muted/40'
              : 'text-white shadow-sm hover:opacity-90'
          }`}
          style={isDone ? {} : { backgroundColor: elementColor }}
        >
          {isDone ? (
            <>
              <Check className="w-4 h-4" />
              Mark Incomplete
            </>
          ) : (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Mark Complete
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Activities View — KE-organized tools panel
   ───────────────────────────────────────────── */
function ActivitiesView({ groups }: { groups: KEActivityGroup[] }) {
  const [checked, setChecked] = React.useState<Record<string, boolean>>({});
  const [selected, setSelected] = React.useState<{ groupIndex: number; itemIndex: number } | null>(null);

  const makeKey = (gi: number, ii: number) => `${groups[gi]?.element}-${ii}`;
  const toggle = (k: string) => setChecked((prev) => ({ ...prev, [k]: !prev[k] }));

  if (!groups.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Zap className="w-10 h-10 text-lm-ink-muted/30 mb-3" />
        <p className="text-lm-ink-muted text-sm font-medium">No activities yet for this stage</p>
        <p className="text-lm-ink-muted/60 text-xs mt-1">Activities will be added as sessions are built out.</p>
      </div>
    );
  }

  // Detail view
  if (selected !== null) {
    const group = groups[selected.groupIndex];
    const item = group.items[selected.itemIndex];
    const k = makeKey(selected.groupIndex, selected.itemIndex);
    return (
      <ActivityDetail
        item={item}
        elementName={group.element}
        elementColor={group.color}
        isDone={!!checked[k]}
        onToggle={() => toggle(k)}
        onBack={() => setSelected(null)}
      />
    );
  }

  const totalItems = groups.reduce((sum, g) => sum + g.items.length, 0);
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="space-y-8">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-display font-bold text-lm-dark">Activities & Tools</h3>
          <p className="text-sm text-lm-ink-muted mt-0.5">Self-development tasks organized by Key Element</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-display font-bold text-lm-dark">{checkedCount}<span className="text-lm-ink-muted text-base font-normal">/{totalItems}</span></p>
          <p className="text-[10px] text-lm-ink-muted uppercase tracking-wider">completed</p>
        </div>
      </div>

      {/* KE sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {groups.map((group, gi) => {
          const groupChecked = group.items.filter((_, ii) => checked[makeKey(gi, ii)]).length;
          return (
            <div key={group.element} className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
              {/* KE header */}
              <div className="px-5 py-4 flex items-center justify-between" style={{ borderBottom: `3px solid ${group.color}` }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: group.color }} />
                  <p className="text-sm font-bold text-lm-dark uppercase tracking-wider">{group.element}</p>
                </div>
                <span className="text-[11px] font-semibold text-lm-ink-muted">
                  {groupChecked}/{group.items.length}
                </span>
              </div>

              {/* Activity items */}
              <div className="divide-y divide-lm-sunken">
                {group.items.map((item, ii) => {
                  const k = makeKey(gi, ii);
                  const isDone = !!checked[k];
                  return (
                    <button
                      key={k}
                      onClick={() => setSelected({ groupIndex: gi, itemIndex: ii })}
                      className="w-full text-left flex items-start gap-3.5 px-5 py-4 hover:bg-lm-subtle/50 transition-colors focus:outline-none group"
                    >
                      <div
                        className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                          isDone ? 'border-transparent' : 'border-lm-sunken group-hover:border-lm-ink-muted/40'
                        }`}
                        style={isDone ? { backgroundColor: group.color } : {}}
                      >
                        {isDone && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-semibold leading-snug transition-colors ${isDone ? 'text-lm-ink-muted line-through' : 'text-lm-dark'}`}>
                          {item.title}
                        </p>
                        <p className={`text-xs mt-0.5 leading-snug ${isDone ? 'text-lm-ink-muted/60' : 'text-lm-ink-muted'}`}>
                          {item.duration}{item.video ? ' · Video' : ''}
                        </p>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-lm-ink-muted/30 flex-shrink-0 mt-0.5 group-hover:text-lm-ink-muted transition-colors rotate-45" />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Session List — left panel
   ───────────────────────────────────────────── */
function SessionList({
  sessions,
  activeId,
  onSelect,
}: {
  sessions: Session[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-0.5">
      {sessions.map((session, idx) => {
        const isActive = session.id === activeId;
        return (
          <button
            key={session.id}
            onClick={() => onSelect(session.id)}
            className={`w-full text-left px-3 py-3.5 rounded-lg transition-all focus:outline-none flex items-start gap-3 relative ${
              isActive
                ? 'bg-[#00FF63]/[.08] border border-[#00FF63]/20'
                : 'border border-transparent hover:bg-white/[.04]'
            }`}
          >
            {isActive && (
              <div className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-[#00FF63]" />
            )}
            <span className={`text-[10px] font-bold tabular-nums mt-0.5 flex-shrink-0 w-4 ${
              isActive ? 'text-[#00FF63]/60' : 'text-white/20'
            }`}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium leading-snug ${isActive ? 'text-white' : 'text-white/60'}`}>
                {session.title}
              </p>
              {session.sessionPlan && (
                <p className={`text-xs mt-0.5 ${isActive ? 'text-[#00FF63]/50' : 'text-white/25'}`}>
                  {session.sessionPlan.totalDuration}
                </p>
              )}
            </div>
          </button>
        );
      })}

      <button className="w-full text-left px-3 py-2.5 rounded-lg border border-dashed border-white/10 hover:border-white/20 hover:bg-white/[.03] transition-all focus:outline-none mt-2 group">
        <span className="flex items-center gap-1.5 text-xs text-white/25 group-hover:text-white/40 transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add session
        </span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
export default function DevelopmentPathway({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [activeStage, setActiveStage] = useState(1);
  const [activeSessions, setActiveSessions] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<TabId>('brief');
  const [viewMode, setViewMode] = useState<'session' | 'activities'>('session');

  const currentStageData = stageDetails[activeStage];
  const currentStageColor = currentStageData?.color || '#0A0A0A';

  const getActiveSessionId = (stageNum: number) => {
    const stage = stageDetails[stageNum];
    return activeSessions[stageNum] || stage?.sessions[0]?.id || '';
  };

  const currentSession =
    currentStageData?.sessions.find((s) => s.id === getActiveSessionId(activeStage)) ||
    currentStageData?.sessions[0];

  const handleSessionSelect = (id: string) => {
    setActiveSessions((prev) => ({ ...prev, [activeStage]: id }));
    setViewMode('session');
  };

  const handleStageSelect = (stage: number) => {
    setActiveStage(stage);
    setViewMode('session');
  };

  return (
    <div className="min-h-screen bg-background -m-6">
      {/* ── Hero ── */}
      <div
        className="relative overflow-hidden px-10 pt-14 pb-16"
        style={{
          background: 'linear-gradient(140deg, #060606 0%, #0c0c0c 35%, #091409 65%, #080808 100%)',
          borderTop: '3px solid #00FF63',
        }}
      >
        {/* Primary green glow — lower right */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 65% 90% at 92% 70%, rgba(0,255,99,0.10) 0%, transparent 65%)',
        }} />
        {/* Secondary green glow — upper center */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 45% 55% at 55% 0%, rgba(0,255,99,0.05) 0%, transparent 60%)',
        }} />
        {/* Cool accent glow — far left */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 35% 50% at -8% 30%, rgba(0,180,255,0.04) 0%, transparent 55%)',
        }} />
        {/* Dot grid texture */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.055,
        }} />
        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }}
        />
        {/* Topographic contour rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 420" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <ellipse key={i} cx={1340} cy={360} rx={(i + 1) * 86} ry={(i + 1) * 86 * 0.28} fill="none" stroke="#00FF63" strokeWidth={1} strokeOpacity={0.065} />
          ))}
        </svg>
        {/* Bottom glow line */}
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,99,0.25) 25%, rgba(0,255,99,0.45) 50%, rgba(0,255,99,0.25) 75%, transparent 100%)',
        }} />

        {/* Label + headline */}
        <div className="relative mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-lm-green/60" />
            <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">
              Instructor Development
            </span>
          </div>
          <h1 className="font-display font-bold leading-[1.0] mb-4">
            <span className="block text-white text-5xl md:text-6xl">Every Instructor.</span>
            <span className="block text-lm-green text-5xl md:text-6xl italic">Every Stage.</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-md">
            A structured coaching framework that takes instructors from their first day through to world-class performance.
          </p>
        </div>

        {/* ── Stage Cards ── */}
        <div className="relative grid grid-cols-6 gap-2.5">
          {STAGE_DATA.map((stage) => {
            const isActive = activeStage === stage.stage;
            const detail = stageDetails[stage.stage];
            const sessionCount = detail?.sessions.length || 0;
            return (
              <button
                key={stage.stage}
                onClick={() => handleStageSelect(stage.stage)}
                className="group text-left rounded-xl p-4 transition-all duration-200 relative overflow-hidden focus:outline-none"
                style={isActive ? {
                  background: 'rgba(255,255,255,0.97)',
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.5), 0 0 24px ${stage.color}30`,
                } : {
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Stage color top bar */}
                <div
                  className="absolute top-0 left-0 right-0 rounded-t-xl transition-all duration-200"
                  style={{
                    backgroundColor: stage.color,
                    height: isActive ? '5px' : '2px',
                    opacity: isActive ? 1 : 0.25,
                    boxShadow: isActive ? `0 0 12px ${stage.color}70` : 'none',
                  }}
                />
                {/* Ghost stage number background */}
                <div
                  className="absolute -right-1 -bottom-2 text-[52px] font-black leading-none select-none pointer-events-none transition-all duration-200"
                  style={{ color: isActive ? `${stage.color}14` : 'rgba(255,255,255,0.04)', fontFamily: 'inherit' }}
                >
                  {stage.stage}
                </div>

                <p className={`text-[9px] font-bold uppercase tracking-[0.2em] mb-2 relative ${
                  isActive ? 'text-lm-green' : 'text-lm-green/40'
                }`}>
                  Stage {stage.stage}
                </p>
                <p className={`text-[15px] font-display font-bold leading-tight mb-1.5 relative ${
                  isActive ? 'text-lm-dark' : 'text-white'
                }`}>
                  {stage.name}
                </p>
                <p className={`text-[10px] font-medium relative ${
                  isActive ? 'text-lm-ink-muted' : 'text-white/30'
                }`}>
                  {sessionCount} session{sessionCount !== 1 ? 's' : ''}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="px-8 py-8">
        {currentStageData && (
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* ── Left: Session List + Tools ── */}
            <div className="w-full lg:w-64 flex-shrink-0 space-y-4 lg:sticky lg:top-6">
              {/* Sessions */}
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <div className="px-1 mb-4 pb-3 border-b border-border flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF63]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Sessions</p>
                </div>
                <SessionList
                  sessions={currentStageData.sessions}
                  activeId={getActiveSessionId(activeStage)}
                  onSelect={handleSessionSelect}
                />
              </div>

              {/* Activities & Tools — promoted to own card */}
              <button
                onClick={() => setViewMode(viewMode === 'activities' ? 'session' : 'activities')}
                className={`w-full text-left rounded-2xl border p-4 shadow-sm transition-all focus:outline-none ${
                  viewMode === 'activities'
                    ? 'bg-[#00FF63]/[.08] border-[#00FF63]/20'
                    : 'bg-card border-border hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                    viewMode === 'activities' ? 'bg-[#00FF63]/15' : 'bg-white/5'
                  }`}>
                    <Zap className={`w-4 h-4 ${viewMode === 'activities' ? 'text-[#00FF63]' : 'text-white/40'}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-bold leading-tight ${viewMode === 'activities' ? 'text-white' : 'text-foreground'}`}>
                      Activities & Tools
                    </p>
                    <p className={`text-[11px] mt-0.5 ${viewMode === 'activities' ? 'text-[#00FF63]/50' : 'text-muted-foreground'}`}>
                      {currentStageData.keActivities?.reduce((s, g) => s + g.items.length, 0) ?? 0} activities
                    </p>
                  </div>
                </div>
              </button>

              {/* Reference links */}
              <div className="bg-card rounded-2xl border border-border p-4 shadow-sm">
                <div className="px-1 mb-3 pb-3 border-b border-border flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF63]" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Reference</p>
                </div>
                <div className="space-y-px">
                  {[
                    { icon: MessageSquareQuote, label: 'Guided Feedback', sub: 'CRC & GROW tools', page: 'feedback' },
                  ].map(({ icon: Icon, label, sub, page }) => (
                    <button
                      key={label}
                      onClick={() => onNavigate?.(page)}
                      className="w-full text-left flex items-center gap-3 px-2.5 py-2.5 rounded-lg hover:bg-white/[.04] transition-all group focus:outline-none border border-transparent"
                    >
                      <div className="w-6 h-6 rounded-md bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:bg-white/8 transition-colors">
                        <Icon className="w-3 h-3 text-white/40" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-white/55 leading-none">{label}</p>
                        <p className="text-[10px] text-white/25 mt-0.5 leading-none">{sub}</p>
                      </div>
                      <ArrowUpRight className="w-3 h-3 text-white/20 flex-shrink-0 group-hover:text-white/40 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Session Workspace / Activities ── */}
            <div className="flex-1 min-w-0">
              <div className="bg-card rounded-2xl border border-border px-8 py-7 shadow-sm">
                {viewMode === 'activities' ? (
                  <ActivitiesView groups={currentStageData.keActivities || []} />
                ) : currentSession ? (
                  <SessionWorkspace
                    key={currentSession.id}
                    session={currentSession}
                    stageColor={currentStageColor}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                  />
                ) : (
                  <p className="text-lm-ink-muted text-sm">Select a session to begin.</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
