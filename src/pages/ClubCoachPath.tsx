import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  AlertTriangle, CheckCircle2, Info, Star, Clock,
  Eye, Megaphone, Check, Target,
  GraduationCap, MessageSquareQuote, NotebookPen, Shield,
  CalendarClock, Users, BookOpen, Plus,
  ChevronRight, Brain, ShieldCheck, Layers, Lightbulb,
} from 'lucide-react';
import { coachPathStages, COACH_STAGE_META } from '@/data/coach-path-data';
import type { Session } from '@/data/stage-sessions';

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
   Brief Tab
   ───────────────────────────────────────────── */
function BriefTab({ session, stageColor }: { session: Session; stageColor: string }) {
  const cs = session.coachingSession;

  return (
    <div className="space-y-5">
      {cs?.goals && cs.goals.length > 0 && (
        <div className="rounded-xl border border-lm-green/25 bg-lm-green-mid p-5">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-lm-dark" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-dark">Session Goals</span>
          </div>
          <ul className="space-y-2">
            {cs.goals.map((goal, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-lm-dark leading-relaxed">
                <Check className="w-4 h-4 flex-shrink-0 mt-0.5 text-lm-dark/60" />
                <span className="font-medium">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {session.coachRole && (
        <div className="rounded-xl border border-lm-sunken bg-lm-subtle p-5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
          <div className="flex items-center gap-2 mb-3">
            <Megaphone className="w-3.5 h-3.5" style={{ color: stageColor }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Your Role</span>
          </div>
          <p className="text-lm-dark font-semibold text-sm leading-relaxed mb-2">{session.coachRole.summary}</p>
          <p className="text-lm-ink-mid text-sm leading-relaxed mb-4">{session.coachRole.context}</p>
          <div className="flex items-start gap-2.5 bg-lm-green-mid rounded-lg px-4 py-3 border border-lm-green/10">
            <Star className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-lm-dark" />
            <p className="text-lm-dark font-semibold text-sm italic">{session.coachRole.principle}</p>
          </div>
        </div>
      )}

      {session.keyElementFocus && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-3.5 h-3.5 text-lm-ink-muted" />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Focus Area</span>
          </div>
          <p className="text-lm-ink-mid text-xs mb-3 leading-relaxed">{session.keyElementFocus.title}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {session.keyElementFocus.elements.map((el) => (
              <div key={el.name} className="bg-white rounded-xl border border-border p-4">
                <p className="font-bold text-lm-dark text-sm mb-1">{el.name}</p>
                <p className="text-lm-ink-muted text-xs leading-relaxed">{el.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {cs && (
        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full" style={{ backgroundColor: stageColor }} />
            <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 mb-2" style={{ backgroundColor: stageColor, color: '#fff' }}>What</Badge>
            <p className="text-lm-dark text-sm font-medium leading-relaxed">{cs.what}</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-lm-dark" />
            <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 mb-2 bg-lm-dark text-white">Why</Badge>
            <p className="text-lm-dark text-sm font-medium leading-relaxed">{cs.why}</p>
          </div>

          <div className="rounded-xl border border-border bg-white p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-lm-green" />
            <div className="flex items-center gap-2 mb-3">
              <Badge className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-lm-green text-lm-dark">How</Badge>
              <span className="text-xs text-lm-ink-muted">Your Actions</span>
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
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-start gap-3">
              <Shield className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-lm-dark text-[10px] uppercase tracking-[0.15em] mb-1">LMQ Alignment</p>
                <p className="text-lm-ink-mid text-sm leading-relaxed">{cs.lmqAlignment}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {!cs && session.content.map((section, idx) => (
        <div key={idx} className="border border-border rounded-xl p-5 bg-white relative overflow-hidden">
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
   Plan Tab
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
              <div className="flex-1 rounded-xl border border-border bg-white p-5 hover:shadow-sm transition-shadow">
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
                  <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 px-3 py-2.5">
                    <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-600" />
                    <p className="text-xs text-amber-800 leading-relaxed">{block.tip}</p>
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
   Prompts Tab
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
          <div key={group.label} className="rounded-xl border border-border bg-white p-5">
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
    </div>
  );
}

/* ─────────────────────────────────────────────
   Notes Tab
   ───────────────────────────────────────────── */
function NotesTab({ session }: { session: Session }) {
  const [notes, setNotes] = useState('');

  return (
    <div className="space-y-6">
      {session.warning && (
        <Alert variant="destructive" className="bg-red-50 border-red-200 rounded-xl">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 mt-1 leading-relaxed">{session.warning.description}</AlertDescription>
        </Alert>
      )}

      {session.proTip && (
        <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center bg-amber-100 flex-shrink-0">
            <Info className="w-3.5 h-3.5 text-amber-700" />
          </div>
          <div>
            <p className="font-bold text-amber-900 text-[10px] uppercase tracking-wider mb-1">Pro Tip</p>
            <p className="text-amber-800 text-sm leading-relaxed">{session.proTip}</p>
          </div>
        </div>
      )}

      <div className="rounded-xl border border-border bg-lm-subtle p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <NotebookPen className="w-3.5 h-3.5 text-lm-ink-muted" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Your Notes</span>
        </div>
        <p className="text-lm-ink-muted text-xs mb-3">Capture reflections from this session. Stays local to your browser.</p>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="What landed? What will you try? What questions came up?"
          rows={5}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-lm-ink-mid placeholder:text-lm-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-lm-green focus:border-transparent resize-y"
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
            {session.id.split('-')[0].replace('S', '')}
          </div>
        </div>
      </div>

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
                  ? 'bg-lm-dark text-white shadow-sm'
                  : 'text-lm-ink-muted bg-lm-subtle hover:bg-lm-sunken hover:text-lm-ink-mid'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

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
            className={`w-full text-left px-3 py-4 rounded-xl transition-all focus:outline-none flex items-start gap-3 ${
              isActive ? 'bg-lm-dark shadow-sm' : 'hover:bg-lm-subtle'
            }`}
          >
            <span className={`text-[10px] font-bold tabular-nums mt-0.5 flex-shrink-0 w-4 ${
              isActive ? 'text-white/30' : 'text-lm-ink-muted/40'
            }`}>
              {String(idx + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-medium leading-snug ${isActive ? 'text-white' : 'text-lm-dark'}`}>
                {session.title}
              </p>
              {session.sessionPlan && (
                <p className={`text-xs mt-1 ${isActive ? 'text-white/40' : 'text-lm-ink-muted'}`}>
                  {session.sessionPlan.totalDuration}
                </p>
              )}
            </div>
          </button>
        );
      })}

      <button className="w-full text-left px-3 py-2.5 rounded-xl border border-dashed border-lm-sunken hover:border-lm-ink-muted/40 hover:bg-lm-subtle/50 transition-all focus:outline-none mt-1 group">
        <span className="flex items-center gap-1.5 text-xs text-lm-ink-muted/50 group-hover:text-lm-ink-muted transition-colors">
          <Plus className="w-3.5 h-3.5" />
          Add session
        </span>
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Conversation Templates Tool
   ───────────────────────────────────────────── */
function ConversationTemplates() {
  const sections = [
    {
      label: 'E-P-E Structure',
      color: '#2563EB',
      description: 'Elicit–Provide–Elicit: the backbone of every coaching conversation. Always start by asking.',
      items: [
        { step: 'Elicit', prompt: 'How did that class feel for you?', note: 'Open it — ask before you share anything.' },
        { step: 'Elicit', prompt: 'What did you notice about [Key Element] today?', note: 'Get specific to the element you observed.' },
        { step: 'Elicit', prompt: 'Which moment felt strongest to you — and why?', note: 'Let them identify their own peak before you do.' },
        { step: 'Provide', prompt: 'I noticed that in the [track], [specific factual observation].', note: 'One observation only. Factual, not judgmental.' },
        { step: 'Provide', prompt: 'From where I was standing, I could see [observation].', note: 'Ground it in what you literally saw.' },
        { step: 'Elicit', prompt: 'Given what you noticed and what I shared — what would you want to try next time?', note: 'Close it — let them own the next step.' },
        { step: 'Elicit', prompt: 'What would that look like specifically?', note: 'Push for precision, not vague intention.' },
      ],
    },
    {
      label: 'Scaling Questions',
      color: '#7C3AED',
      description: 'Use when you want to help an instructor locate themselves and identify the next increment of growth.',
      items: [
        { prompt: 'On a scale of 1–10, how satisfied are you with your connection in that class?' },
        { prompt: 'What would move you one number higher?' },
        { prompt: 'When have you been at that higher number — what was different?' },
        { prompt: 'On a scale of 1–10, how confident are you going into your next class?' },
        { prompt: "What's the one thing that would shift that number?" },
      ],
    },
    {
      label: 'Exception-Finding',
      color: '#059669',
      description: 'Use when an instructor is stuck or discouraged. Find what\'s already working and amplify it.',
      items: [
        { prompt: 'When does this challenge not happen — what\'s different about those classes?' },
        { prompt: 'Tell me about a time when that Key Element was really clicking for you.' },
        { prompt: 'What were you doing differently in your best class this month?' },
        { prompt: 'Who on your team does this well? What do you notice about how they approach it?' },
        { prompt: 'If you were at your best right now — what would you be doing?' },
      ],
    },
    {
      label: 'Future-Focused',
      color: '#D97706',
      description: 'Use to shift from problem-analysis to possibility-thinking. Points toward identity, not just behaviour.',
      items: [
        { prompt: 'What kind of instructor do you want to be known for?' },
        { prompt: 'If this was going perfectly six months from now — what would that look like?' },
        { prompt: 'What do your participants experience when you\'re at your most yourself in class?' },
        { prompt: 'What story do you want to tell about your teaching in five years?' },
        { prompt: 'What\'s one thing you could start doing this week that your future self would thank you for?' },
      ],
    },
  ];

  const stepColors: Record<string, string> = {
    Elicit: '#2563EB',
    Provide: '#059669',
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Conversation Templates</h3>
        <p className="text-sm text-lm-ink-muted mt-1">E-P-E scripts, scaling questions, and question banks for every coaching moment.</p>
      </div>

      {sections.map((section) => (
        <div key={section.label}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: section.color }} />
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">{section.label}</p>
          </div>
          {section.description && (
            <p className="text-xs text-lm-ink-muted mb-3 leading-relaxed pl-4">{section.description}</p>
          )}
          <div className="space-y-2 pl-4">
            {section.items.map((item, i) => (
              <div key={i} className="rounded-xl border border-border bg-white p-4">
                <div className="flex items-start gap-3">
                  {'step' in item && item.step && (
                    <span
                      className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white mt-0.5"
                      style={{ backgroundColor: stepColors[item.step] }}
                    >
                      {item.step}
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-lm-dark italic">"{item.prompt}"</p>
                    {'note' in item && item.note && (
                      <p className="text-[11px] text-lm-ink-muted mt-1 leading-relaxed">{item.note}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Observation Framework Tool
   ───────────────────────────────────────────── */
function ObservationFramework() {
  const elements = [
    { name: 'Choreography', color: '#F59E0B', what: 'Movement accuracy, timing, transitions, use of music phrasing', g1: 'Follows choreography with some errors or hesitation; focuses on getting moves right', g2: 'Executes choreography accurately with good timing; transitions are mostly clean', g3: 'Choreography is second nature; uses phrasing and transitions to serve the class energy' },
    { name: 'Technique', color: '#3B82F6', what: 'Body alignment, range of motion, safety cues, personal demonstration', g1: 'Basic technique present but inconsistencies visible; limited self-monitoring', g2: 'Solid technique most of the time; demonstrates key positions and corrects common faults', g3: 'Excellent technique consistently; proactively prevents common errors across the class' },
    { name: 'Coaching', color: '#8B5CF6', what: 'Verbal cues, motivational language, feedback quality, class management', g1: 'Coaching is scripted or reactive; limited variation in language or delivery', g2: 'Coaching is purposeful; adapts language for different participants; gives specific feedback', g3: 'Coaching feels instinctive; reads the room and shifts approach in real-time' },
    { name: 'Connection', color: '#EF4444', what: 'Eye contact, name use, participant awareness, room scanning', g1: 'Limited eye contact; instructor-focused; minimal individual acknowledgement', g2: 'Regular scanning; uses names; responds to participant effort and energy', g3: 'Deep two-way connection; every participant feels seen; energy flows between instructor and class' },
    { name: 'Performance', color: '#10B981', what: 'Commitment, energy, authenticity, physical and emotional presence', g1: 'Performance is functional but held back; energy is uneven across the class', g2: 'Consistent energy and presence; commits to the music and the room', g3: 'Transformative presence; elevates the room; instructor identity fully expressed' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Observation Framework</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Structured template for class observation. Capture facts first — interpretation second.</p>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-xs font-bold text-amber-900 mb-1">Observation rule</p>
          <p className="text-xs text-amber-800 leading-relaxed">Write facts first. Separate what you <em>saw</em> from what you <em>think</em> about what you saw. "Instructor looked at the back wall during the squat track" is a fact. "Instructor lacks confidence" is an interpretation.</p>
        </div>
      </div>

      <div className="space-y-4">
        {elements.map((el) => (
          <div key={el.name} className="rounded-2xl border border-border bg-white overflow-hidden shadow-sm">
            <div className="px-5 py-3 flex items-center gap-2.5" style={{ borderBottom: `3px solid ${el.color}` }}>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: el.color }} />
              <p className="text-sm font-bold text-lm-dark uppercase tracking-wider">{el.name}</p>
              <p className="text-xs text-lm-ink-muted ml-1">— {el.what}</p>
            </div>
            <div className="grid grid-cols-3 divide-x divide-lm-sunken">
              {[
                { label: 'G1 Signals', text: el.g1 },
                { label: 'G2 Signals', text: el.g2 },
                { label: 'G3 Signals', text: el.g3 },
              ].map(({ label, text }) => (
                <div key={label} className="px-4 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-lm-ink-muted mb-2">{label}</p>
                  <p className="text-xs text-lm-ink-mid leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 bg-lm-subtle border-t border-lm-sunken">
              <p className="text-[10px] font-bold uppercase tracking-wider text-lm-ink-muted mb-1">Facts observed (your notes)</p>
              <div className="h-8 border-b border-dashed border-lm-ink-muted/20" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-white p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lm-ink-muted mb-3">Track-by-track notes</p>
        <div className="space-y-3">
          {['Warm-up', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6', 'Cool-down'].map((track) => (
            <div key={track} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-lm-ink-muted w-20 flex-shrink-0">{track}</span>
              <div className="flex-1 h-px border-b border-dashed border-lm-ink-muted/20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Intention Builder Tool
   ───────────────────────────────────────────── */
function IntentionBuilder() {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const elements = [
    {
      name: 'Choreography',
      color: '#F59E0B',
      examples: [
        "If I feel myself falling behind the music in a transition, then I will hold the current move for one extra count, reset my timing, and cue the next exercise cleanly.",
        "If I reach the chorus in the squat track, then I will look up from the floor and make eye contact with the front row.",
      ],
    },
    {
      name: 'Technique',
      color: '#3B82F6',
      examples: [
        "If I begin the squat track, then I will check my own alignment in the mirror and demonstrate one perfect rep before cueing participants.",
        "If I see someone with their knees caving in during a lunge, then I will move toward them, mirror the correct position, and give one specific verbal cue.",
      ],
    },
    {
      name: 'Coaching',
      color: '#8B5CF6',
      examples: [
        "If an instructor finishes a class they've been nervous about, then I will ask what they noticed before I share anything.",
        "If I feel the urge to give more than one correction in a coaching conversation, then I will pause, choose the most important one, and save the rest for next time.",
      ],
    },
    {
      name: 'Connection',
      color: '#EF4444',
      examples: [
        "If I'm coaching a working track, then I will scan all four quadrants and use one participant's name before the track ends.",
        "If I notice the back row disengaging, then I will walk toward them and make direct eye contact during the next coaching cue.",
      ],
    },
    {
      name: 'Performance',
      color: '#10B981',
      examples: [
        "If the music peaks, then I will commit fully to the energy — no holding back — and let my expression lead the room.",
        "If I notice myself going through the motions, then I will pick one participant and teach the next track as if it's just for them.",
      ],
    },
  ];

  const checklist = [
    { label: 'Has a specific trigger', description: 'The "if" names a precise moment — not a general situation.' },
    { label: 'Has a specific behaviour', description: 'The "then" describes exactly what you will do — not what you\'ll try to do.' },
    { label: 'Is observable', description: 'Someone watching could confirm whether you did it or not.' },
    { label: 'Is in your control', description: 'You can execute it regardless of how participants respond.' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Intention Builder</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Build if–then plans that actually stick. Specificity is the mechanism.</p>
      </div>

      {/* Template */}
      <div className="rounded-2xl border-2 border-lm-green/30 bg-lm-green-mid p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-lm-dark mb-4">The Template</p>
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-lm-green/20 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lm-ink-muted">If</span>
            <span className="text-sm font-semibold text-lm-dark">[specific class moment]</span>
          </div>
          <div className="flex items-center self-center">
            <ChevronRight className="w-4 h-4 text-lm-ink-muted" />
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-lm-green/20 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-wider text-lm-ink-muted">Then</span>
            <span className="text-sm font-semibold text-lm-dark">[specific behaviour I will do]</span>
          </div>
        </div>
        <p className="text-xs text-lm-dark/60 mt-4 leading-relaxed">Implementation intentions are completed ~3× more often than vague goals. The if–then structure creates a mental link to the trigger — making the behaviour semi-automatic.</p>
      </div>

      {/* Specificity checklist */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-ink-muted mb-3">Specificity Checklist</p>
        <div className="space-y-2">
          {checklist.map((item) => (
            <div key={item.label} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <div className="w-4 h-4 rounded border-2 border-lm-ink-muted/30 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-lm-dark">{item.label}</p>
                <p className="text-xs text-lm-ink-muted mt-0.5 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Examples by Key Element */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-ink-muted mb-3">Examples by Key Element</p>
        <div className="space-y-2">
          {elements.map((el) => {
            const isOpen = selectedElement === el.name;
            return (
              <div key={el.name} className="rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setSelectedElement(isOpen ? null : el.name)}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-lm-subtle transition-colors focus:outline-none text-left"
                >
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: el.color }} />
                  <span className="text-sm font-semibold text-lm-dark flex-1">{el.name}</span>
                  <ChevronRight className={`w-4 h-4 text-lm-ink-muted transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 bg-lm-subtle space-y-2 pt-2">
                    {el.examples.map((ex, i) => (
                      <div key={i} className="rounded-lg bg-white border border-border p-3">
                        <p className="text-xs text-lm-ink-mid italic leading-relaxed">"{ex}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Frameworks Overview Tool
   ───────────────────────────────────────────── */
function FrameworksOverviewTool() {
  const frameworks = [
    {
      question: "How do I know what stage an instructor is at — for each skill?",
      model: 'Dreyfus Model',
      answer: 'Five stages from Novice to Expert. Each stage requires qualitatively different coaching — not just more of the same.',
    },
    {
      question: "When can I step back and trust them to work unsupervised?",
      model: 'ETAs',
      answer: 'Eight real teaching activities, each assessed on a five-level trust scale — not pass/fail.',
    },
    {
      question: "How do I make sure my approach fits this person right now?",
      model: 'SSDL',
      answer: 'Four coaching roles that shift based on how self-directed the instructor is for each skill domain.',
    },
    {
      question: "How do I have a conversation that creates change, not resistance?",
      model: 'E-P-E',
      answer: 'Elicit–Provide–Elicit from Motivational Interviewing. Ask first — always. Supported by 200+ meta-analyses.',
    },
    {
      question: "How do I make sure feedback actually changes behaviour?",
      model: 'Implementation Intentions',
      answer: 'If-then plans that turn vague goals into automatic behaviour. A meta-analysis of 94 studies found a medium-to-large effect size.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">The Frameworks Behind Club Coach</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Why the system works the way it does.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-dark mb-2">The Standard</p>
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          LMQ defines what instructor excellence looks like. Club Coach exists to help coaches develop that excellence in their instructors — and these frameworks are the research-backed tools that make that coaching effective.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">Five Frameworks, Five Questions Answered</p>
        </div>
        <div className="space-y-3">
          {frameworks.map((f) => (
            <div key={f.model} className="rounded-xl border border-border bg-white p-4">
              <p className="text-xs text-lm-ink-muted italic mb-1.5">{f.question}</p>
              <p className="text-sm font-bold text-lm-dark mb-1">{f.model}</p>
              <p className="text-sm text-lm-ink-mid leading-relaxed">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-3">How They Work as a System</p>
        <div className="space-y-2 text-sm text-lm-ink-mid leading-relaxed">
          <p><span className="font-semibold text-lm-dark">Dreyfus</span> tells you where the instructor is for each skill.</p>
          <p><span className="font-semibold text-lm-dark">SSDL</span> tells you how to coach them at that stage.</p>
          <p><span className="font-semibold text-lm-dark">ETAs</span> tell you when to trust them to work unsupervised.</p>
          <p><span className="font-semibold text-lm-dark">E-P-E</span> is how you structure every conversation.</p>
          <p><span className="font-semibold text-lm-dark">Implementation Intentions</span> make the change stick between sessions.</p>
          <p className="mt-2 pt-2 border-t border-lm-sunken text-lm-ink-muted">LMQ is the standard all of this is in service of.</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dreyfus Model Tool
   ───────────────────────────────────────────── */
function DreyfusModelTool() {
  const stages = [
    {
      stage: 'Novice',
      color: '#64748b',
      coachRole: 'Authority',
      description: "Follows rules. Needs step-by-step instruction. Cannot deviate from what they've been taught.",
      approach: 'Direct — give specific instructions and checklists.',
    },
    {
      stage: 'Advanced Beginner',
      color: '#2563EB',
      coachRole: 'Mentor',
      description: 'Starting to recognise patterns. Understands context but still relies on guidelines.',
      approach: 'Guide — demonstrate and explain why.',
    },
    {
      stage: 'Competent',
      color: '#D97706',
      coachRole: 'Facilitator',
      description: 'Can problem-solve with support. Makes conscious choices. Feels responsibility for outcomes.',
      approach: 'Facilitate — ask questions, let them work through it.',
    },
    {
      stage: 'Proficient',
      color: '#059669',
      coachRole: 'Consultant',
      description: 'Strong intuition. Sees the whole picture. Mostly self-directed.',
      approach: 'Consult — prompt reflection, they lead.',
    },
    {
      stage: 'Expert',
      color: '#0a0a0a',
      coachRole: 'Peer',
      description: 'Intuitive mastery. Acts without conscious deliberation. Difficult to articulate their own expertise.',
      approach: 'Delegate — support their mentoring of others.',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">The Dreyfus Model</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Skill stages and what they mean for how you coach each Key Element.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          An instructor is not at one stage globally — they are at different stages for different Key Elements. Someone Proficient in Choreography may be a Novice in Connection. Your coaching approach must shift accordingly.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Five Stages</p>
        </div>
        <div className="space-y-3">
          {stages.map((s) => (
            <div key={s.stage} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.stage}
                </span>
                <span className="text-xs text-lm-ink-muted font-medium">Coach as {s.coachRole}</span>
              </div>
              <p className="text-sm text-lm-ink-mid leading-relaxed mb-2">{s.description}</p>
              <p className="text-xs font-semibold text-lm-dark italic">{s.approach}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">Where you see this in Club Coach</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          The <span className="font-semibold text-lm-dark">Dreyfus Stage by Domain</span> card on every Instructor Profile shows each instructor's current stage per Key Element. The italicised coaching approach next to each stage tells you exactly how to coach that skill.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ETAs Tool
   ───────────────────────────────────────────── */
function ETAsTool() {
  const levels = [
    { level: 1, label: 'Observe only', description: 'Not yet ready. Still learning the foundations.' },
    { level: 2, label: 'Direct supervision', description: 'You need to be present. Still developing — needs real-time guidance and correction.' },
    { level: 3, label: 'Indirect supervision', description: "You don't need to be in the room, but check in regularly. Competent but benefits from periodic observation." },
    { level: 4, label: 'Unsupervised', description: 'Self-directed. Your role is to stretch and challenge, not monitor.' },
    { level: 5, label: 'Can supervise others', description: 'Ready to support and develop others in this area.' },
  ];

  const etas = [
    'Execute choreography with accuracy & timing',
    'Can lead 2–3 tracks safely and effectively in a team taught class',
    'Coach technique corrections in real-time',
    'Adapt intensity for mixed-ability participants',
    'Build connection with every participant',
    'Manage equipment failure or participant injury',
    'Deliver a complete class independently',
    'Mentor newer instructors',
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Entrustable Teaching Activities</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Trust-based assessment and the Teaching Trust Map.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          ETAs ask a different question from pass/fail: not "can this instructor demonstrate competency?" but "can I trust this instructor to do this activity unsupervised?" The answer is different for every activity — and that's the point.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Five Entrustment Levels</p>
        </div>
        <div className="space-y-2">
          {levels.map((l) => (
            <div key={l.level} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-lm-dark text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {l.level}
              </span>
              <div>
                <p className="text-sm font-semibold text-lm-dark">{l.label}</p>
                <p className="text-xs text-lm-ink-muted mt-0.5 leading-relaxed">{l.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The 8 Teaching Activities</p>
        </div>
        <div className="space-y-1.5">
          {etas.map((eta, i) => (
            <div key={eta} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-white">
              <span className="text-xs font-bold text-lm-ink-muted w-5 flex-shrink-0">{i + 1}</span>
              <span className="text-sm text-lm-ink-mid">{eta}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">Where you see this in Club Coach</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          The <span className="font-semibold text-lm-dark">Teaching Trust Map</span> on every Instructor Profile shows the current entrustment level for each of these 8 activities. Entrustment is about the task, not the person — the same instructor can be at Level 4 for one activity and Level 2 for another.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SSDL Tool
   ───────────────────────────────────────────── */
function SSDLTool() {
  const stages = [
    {
      code: 'S1',
      label: 'Dependent',
      role: 'Authority',
      color: '#64748b',
      description: 'Low self-direction. Needs explicit instruction and clear structure to function.',
      approach: "Structured checklists, specific drills, directive feedback. Tell them exactly what to do and why.",
    },
    {
      code: 'S2',
      label: 'Interested',
      role: 'Motivator',
      color: '#2563EB',
      description: 'Moderate self-direction. Responds to motivation. Wants to understand the reasoning behind feedback.',
      approach: "Curated examples, guided goal-setting, explain the why behind your asks.",
    },
    {
      code: 'S3',
      label: 'Involved',
      role: 'Facilitator',
      color: '#D97706',
      description: 'Intermediate self-direction. Explores with guidance. Capable of designing their own solutions.',
      approach: "Open-ended challenges, questions over answers. Let them design their own experiments.",
    },
    {
      code: 'S4',
      label: 'Self-directed',
      role: 'Consultant',
      color: '#059669',
      description: 'High self-direction. Sets own goals. Ready to mentor others.',
      approach: "Available on request. Prompt reflection — the instructor leads. Connect them to the right people.",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-display font-bold text-lm-dark">Staged Self-Directed Learning</h3>
        <p className="text-sm text-lm-ink-muted mt-1">Matching your coaching role to the instructor's stage.</p>
      </div>

      <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
        <p className="text-sm font-semibold text-lm-dark leading-relaxed">
          The most common coaching failure is a mismatch: directing a self-directed instructor feels patronising; going hands-off with a dependent learner feels abandoning. Club Coach surfaces the right coaching role per skill domain — so you never default to one mode for everyone.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-2 h-2 rounded-full bg-lm-dark flex-shrink-0" />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-lm-dark">The Four Stages</p>
        </div>
        <div className="space-y-3">
          {stages.map((s) => (
            <div key={s.code} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold text-white"
                  style={{ backgroundColor: s.color }}
                >
                  {s.code}: {s.label}
                </span>
                <span className="text-xs text-lm-ink-muted font-medium">Coach as {s.role}</span>
              </div>
              <p className="text-sm text-lm-ink-mid leading-relaxed mb-2">{s.description}</p>
              <p className="text-xs font-semibold text-lm-dark italic">{s.approach}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-lm-subtle p-4">
        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted mb-2">How SSDL maps to Dreyfus</p>
        <p className="text-sm text-lm-ink-mid leading-relaxed">
          Dreyfus describes <span className="font-semibold text-lm-dark">cognitive capability</span> — what an instructor can do. SSDL describes <span className="font-semibold text-lm-dark">motivational self-direction</span> — how much they drive their own learning. They often align (a Novice is usually S1) but not always — an experienced instructor returning from a break may be S3 in motivation but S1 in current capability.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
type ViewMode = 'session' | 'conversation-templates' | 'observation-framework' | 'intention-builder' | 'frameworks-overview' | 'dreyfus-model' | 'etas' | 'ssdl';

export default function ClubCoachPath(_props: { onNavigate?: (page: string) => void }) {
  const [activeStage, setActiveStage] = useState(1);
  const [activeSessions, setActiveSessions] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState<TabId>('brief');
  const [viewMode, setViewMode] = useState<ViewMode>('session');

  const currentStageData = coachPathStages[activeStage];
  const currentStageMeta = COACH_STAGE_META[activeStage - 1];
  const currentStageColor = currentStageMeta?.color || '#0A0A0A';

  const getActiveSessionId = (stageNum: number) => {
    const stage = coachPathStages[stageNum];
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

  const handleToolSelect = (tool: ViewMode) => {
    setViewMode(viewMode === tool ? 'session' : tool);
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

        <div className="relative mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-lm-green/60" />
            <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">
              Club Coach Development
            </span>
          </div>
          <h1 className="font-display font-bold leading-[1.0] mb-4">
            <span className="block text-white text-5xl md:text-6xl">Club Coach</span>
            <span className="block text-lm-green text-5xl md:text-6xl italic">Development.</span>
          </h1>
          <p className="text-white/40 text-sm leading-relaxed max-w-md">
            Develop the Coach. Strengthen the Club.<br />
            A structured pathway for every stage of the Club Coach journey — from first observation to fully independent mentor.
          </p>
        </div>

        {/* ── Stage Cards ── */}
        <div className="relative grid grid-cols-5 gap-2.5">
          {COACH_STAGE_META.map((stage) => {
            const isActive = activeStage === stage.stage;
            const detail = coachPathStages[stage.stage];
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
                  className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl transition-all duration-200"
                  style={{ backgroundColor: stage.color, opacity: isActive ? 1 : 0.4 }}
                />
                {/* Ghost stage number background */}
                <div
                  className="absolute -right-1 -bottom-2 text-[52px] font-black leading-none select-none pointer-events-none transition-all duration-200"
                  style={{ color: isActive ? `${stage.color}14` : 'rgba(255,255,255,0.04)', fontFamily: 'inherit' }}
                >
                  {stage.stage}
                </div>

                <p
                  className="text-[9px] font-bold uppercase tracking-[0.2em] mb-2 relative"
                  style={{ color: isActive ? stage.color : 'rgba(0,255,99,0.4)' }}
                >
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
              <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                <div className="px-1 mb-6 pb-3 border-b border-border">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted">Sessions</p>
                  <p className="text-xs text-lm-ink-muted mt-0.5">{currentStageData.subtitle}</p>
                </div>
                <SessionList
                  sessions={currentStageData.sessions}
                  activeId={getActiveSessionId(activeStage)}
                  onSelect={handleSessionSelect}
                />
              </div>

              {/* Tools & Reference */}
              <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
                <div className="px-1 mb-3 pb-3 border-b border-border">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted">Tools & Reference</p>
                </div>
                <div className="space-y-1">
                  {([
                    { icon: Lightbulb, label: 'Frameworks Overview', sub: 'Why Club Coach works the way it does', tool: 'frameworks-overview' as ViewMode },
                    { icon: Brain, label: 'Dreyfus Model', sub: 'Skill stages & coaching approach per domain', tool: 'dreyfus-model' as ViewMode },
                    { icon: ShieldCheck, label: 'ETAs', sub: 'Trust-based activities & the Teaching Trust Map', tool: 'etas' as ViewMode },
                    { icon: Layers, label: 'SSDL', sub: "Matching your coaching role to the instructor's stage", tool: 'ssdl' as ViewMode },
                    { icon: Eye, label: 'Observation Framework', sub: 'Structured class observation template', tool: 'observation-framework' as ViewMode },
                    { icon: MessageSquareQuote, label: 'Conversation Templates', sub: 'E-P-E scripts & question banks', tool: 'conversation-templates' as ViewMode },
                    { icon: Target, label: 'Intention Builder', sub: 'If–then planning template', tool: 'intention-builder' as ViewMode },
                  ]).map(({ icon: Icon, label, sub, tool }) => {
                    const isActive = viewMode === tool;
                    return (
                      <button
                        key={label}
                        onClick={() => handleToolSelect(tool)}
                        className={`w-full text-left flex items-start gap-3 px-3 py-3 rounded-xl transition-all group focus:outline-none ${
                          isActive ? 'bg-lm-dark' : 'hover:bg-lm-subtle'
                        }`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                          isActive ? 'bg-lm-green/20' : 'bg-lm-subtle group-hover:bg-lm-sunken'
                        }`}>
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-lm-green' : 'text-lm-ink-mid'}`} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-semibold leading-tight ${isActive ? 'text-white' : 'text-lm-dark'}`}>{label}</p>
                          <p className={`text-[11px] mt-0.5 leading-snug ${isActive ? 'text-white/50' : 'text-lm-ink-muted'}`}>{sub}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ── Right: Session Workspace / Tool Panel ── */}
            <div className="flex-1 min-w-0">
              <div className="bg-white rounded-2xl border border-border px-8 py-7 shadow-sm">
                {viewMode === 'conversation-templates' ? (
                  <ConversationTemplates />
                ) : viewMode === 'observation-framework' ? (
                  <ObservationFramework />
                ) : viewMode === 'intention-builder' ? (
                  <IntentionBuilder />
                ) : viewMode === 'frameworks-overview' ? (
                  <FrameworksOverviewTool />
                ) : viewMode === 'dreyfus-model' ? (
                  <DreyfusModelTool />
                ) : viewMode === 'etas' ? (
                  <ETAsTool />
                ) : viewMode === 'ssdl' ? (
                  <SSDLTool />
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
