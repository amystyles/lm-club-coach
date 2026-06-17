import React, { useState } from 'react';
import { Copy, ChevronRight, Check, ArrowLeft, ChevronDown, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { useData } from '@/context/DataContext';
import type { Instructor } from '@/data/types';
import type { KeyElement, Grade } from '@/data/types';

/* ─────────────────────────────────────────────
   LMQ Grade Criteria — what each grade looks like per KE
   ───────────────────────────────────────────── */
const LMQ_GRADE_DESCRIPTORS: Record<KeyElement, Record<Grade, { label: string; description: string }>> = {
  choreography: {
    1: { label: 'Developing', description: 'Learning the pattern — some timing errors, structure still forming' },
    2: { label: 'Consistent', description: 'Correct patterns and timing, music sync developing across most tracks' },
    3: { label: 'Masterful', description: 'Smooth automatic execution — choreography is music-led and effortless' },
  },
  technique: {
    1: { label: 'Developing', description: 'Understanding setup cues — demonstration is present but inconsistent' },
    2: { label: 'Consistent', description: 'Position and Execution Setup delivered reliably across key exercises' },
    3: { label: 'Masterful', description: '100% competency — technique is inspirational and visibly elevates participants' },
  },
  coaching: {
    1: { label: 'Developing', description: 'Layer 1 cues present, limited layering — learning the framework' },
    2: { label: 'Consistent', description: 'All 3 layers delivered — compulsory cues consistent, structure solid' },
    3: { label: 'Masterful', description: 'Targeted real-time corrections — every cue has clear purpose, no over-instruction' },
  },
  connection: {
    1: { label: 'Developing', description: 'Acknowledges the group — individual connection is limited' },
    2: { label: 'Consistent', description: 'Uses names genuinely, Look See & Respond is present and developing' },
    3: { label: 'Masterful', description: 'Individuals feel seen and valued — "we/us" language builds real group cohesion' },
  },
  performance: {
    1: { label: 'Developing', description: 'Energy is present but inconsistent — intensity fluctuates across the class' },
    2: { label: 'Consistent', description: 'Consistent energy and presence — tracks and responds to the class mood' },
    3: { label: 'Masterful', description: 'Inspirational performance — their energy visibly elevates how participants train' },
  },
};

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

const KE_COLORS: Record<KeyElement, string> = {
  choreography: '#6366f1',
  technique:    '#f59e0b',
  coaching:     '#0A0A0A',
  connection:   '#ef4444',
  performance:  '#00FF63',
};

/* ─────────────────────────────────────────────
   Observation Framework data
   ───────────────────────────────────────────── */
const OBS_KE_DATA: Record<KeyElement, { description: string; signals: { g1: string; g2: string; g3: string } }> = {
  choreography: {
    description: 'Movement accuracy, timing, transitions, music phrasing',
    signals: {
      g1: 'Follows choreography with some errors or hesitation; focuses on getting moves right',
      g2: 'Executes choreography accurately with good timing; transitions are mostly clean',
      g3: 'Choreography is second nature; uses phrasing and transitions to serve the class energy',
    },
  },
  technique: {
    description: 'Position Setups, Execution Setups, form under fatigue',
    signals: {
      g1: 'Basic technique present but inconsistencies visible; limited self-monitoring',
      g2: 'Solid technique most of the time; demonstrates key positions and corrects common faults',
      g3: 'Excellent technique consistently; proactively prevents common errors across the class',
    },
  },
  coaching: {
    description: 'Coaching layers 1–3, cue specificity, real-time adjustment',
    signals: {
      g1: 'Coaching is scripted or reactive; limited variation in language or delivery',
      g2: 'Coaching is purposeful; adapts language for different participants; gives specific feedback',
      g3: 'Coaching feels instinctive; reads the room and shifts approach in real-time',
    },
  },
  connection: {
    description: 'Eye contact, names, Look-See-Respond, group cohesion',
    signals: {
      g1: 'Limited eye contact; instructor-focused; minimal individual acknowledgement',
      g2: 'Regular scanning; uses names; responds to participant effort and energy',
      g3: 'Deep two-way connection; every participant feels seen; energy flows between instructor and class',
    },
  },
  performance: {
    description: 'Energy, authenticity, commitment, Essence expression',
    signals: {
      g1: 'Performance is functional but held back; energy is uneven across the class',
      g2: 'Consistent energy and presence; commits to the music and the room',
      g3: 'Transformative presence; elevates the room; instructor identity fully expressed',
    },
  },
};

const TRACKS = ['Warm-up', 'Track 2', 'Track 3', 'Track 4', 'Track 5', 'Track 6', 'Cool-down'] as const;

/* ─────────────────────────────────────────────
   Implementation Intention examples per KE
   ───────────────────────────────────────────── */
const INTENTION_EXAMPLES: Record<KeyElement, { if: string; then: string }[]> = {
  choreography: [
    { if: 'I start a new release track', then: 'I will count myself in with the music for 4 beats before moving' },
    { if: 'I feel unsure about the next transition', then: 'I will hold the current move for 4 extra counts rather than rushing' },
  ],
  technique: [
    { if: 'I begin the squat track', then: "I will cue 'sit back, weight in heels' before the first rep" },
    { if: "I see someone's knees tracking forward", then: 'I will walk toward them and cue the correction by name' },
  ],
  coaching: [
    { if: 'I finish the warm-up track', then: 'I will deliver one specific praise to someone by name before Track 2 starts' },
    { if: 'I notice energy dropping in the room', then: "I will make eye contact with 3 people and use 'we' language" },
  ],
  connection: [
    { if: 'A new person sets up in the room', then: 'I will introduce myself by name and ask theirs before class starts' },
    { if: "I'm midway through the class", then: 'I will scan the back row and make eye contact with at least 2 people' },
  ],
  performance: [
    { if: 'The peak track starts', then: 'I will commit 100% to the effort — full range, full energy, full expression' },
    { if: 'I feel my energy dropping', then: 'I will use the music transition to reset my posture and facial expression' },
  ],
};

/* ─────────────────────────────────────────────
   E-P-E section definitions
   ───────────────────────────────────────────── */
const EPE_SECTIONS = [
  {
    key: 'epeElicit1' as const,
    label: 'Elicit — Open',
    letter: 'E',
    hint: 'Ask before you share anything. Let the instructor identify what they noticed first.',
    suggestions: [
      'How did that class feel for you?',
      'What did you notice about your [Key Element] today?',
      'Which moment felt strongest to you — and why?',
    ],
    placeholder: "e.g. 'Sarah, how did that feel? What stood out to you from that class?'",
  },
  {
    key: 'epeProvide' as const,
    label: 'Provide — One Observation',
    letter: 'P',
    hint: 'One observation only. Factual, not judgmental. Grounded in what you literally saw.',
    suggestions: [
      'I noticed that in [track], [specific factual observation].',
      'From where I was standing, I could see [observation].',
    ],
    placeholder: "e.g. 'I noticed in the squat track your Position Setup was really clear — participants responded to it immediately.'",
  },
  {
    key: 'epeElicit2' as const,
    label: 'Elicit — Close',
    letter: 'E',
    hint: "Close it — let them own the next step. Push for precision, not vague intention.",
    suggestions: [
      'Given what you noticed and what I shared — what would you want to try next time?',
      'What would that look like specifically?',
    ],
    placeholder: "e.g. 'What do you want to focus on in your next class based on what we've talked about?'",
  },
] as const;

type Framework = 'crc' | 'grow' | 'epe';
type Step = 'context' | 'framework' | 'build' | 'review';

interface FeedbackState {
  instructorId: string;
  keyElement: KeyElement | '';
  framework: Framework | null;
  // CRC
  connect: string;
  recommend: string;
  commend: string;
  // GROW
  goal: string;
  reality: string;
  options: string;
  will: string;
  // E-P-E
  epeElicit1: string;
  epeProvide: string;
  epeElicit2: string;
}

/* ─────────────────────────────────────────────
   LMQ Context Panel — sidebar
   ───────────────────────────────────────────── */
function LMQContextPanel({
  state,
  framework,
  intentionIf,
  intentionThen,
  instructors,
}: {
  state: FeedbackState;
  framework: Framework | null;
  intentionIf: string;
  intentionThen: string;
  instructors: Instructor[];
}) {
  const instructor = instructors.find((i) => i.id === state.instructorId);
  const ke = state.keyElement as KeyElement | '';

  const currentGrade = instructor?.grades.find((g) => g.element === ke)?.grade;
  const nextGrade = currentGrade && currentGrade < 3 ? ((currentGrade + 1) as Grade) : null;
  const keColor = ke ? KE_COLORS[ke] : '#0A0A0A';

  const hasEpeContent = state.epeElicit1 || state.epeProvide || state.epeElicit2;

  return (
    <div className="space-y-5">
      {/* Instructor + KE context */}
      {instructor && ke && (
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-3">LMQ Context</p>
          <p className="font-bold text-lm-dark text-sm">{instructor.name}</p>
          <div className="flex items-center gap-2 mt-1 mb-4">
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: keColor }}
            >
              {KEY_ELEMENT_LABELS[ke]}
            </span>
            {currentGrade && (
              <span className="text-[10px] font-semibold text-lm-ink-muted bg-lm-subtle px-2 py-0.5 rounded-full">
                Grade {currentGrade}
              </span>
            )}
          </div>

          {currentGrade && (
            <div className="space-y-3">
              <div className="rounded-lg bg-lm-subtle p-3">
                <p className="text-[9px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1">
                  Currently at Grade {currentGrade}
                </p>
                <p className="text-xs text-lm-ink-mid leading-relaxed">
                  {LMQ_GRADE_DESCRIPTORS[ke][currentGrade].description}
                </p>
              </div>

              {nextGrade && (
                <div className="rounded-lg border p-3" style={{ borderColor: keColor + '30', backgroundColor: keColor + '08' }}>
                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: keColor }}>
                    Targeting Grade {nextGrade}
                  </p>
                  <p className="text-xs text-lm-ink-mid leading-relaxed">
                    {LMQ_GRADE_DESCRIPTORS[ke][nextGrade].description}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Framework reminder */}
      {framework && (
        <div className="rounded-xl border border-border bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-3">
            {framework === 'crc' ? 'CRC Method' : framework === 'grow' ? 'GROW Model' : 'E-P-E Method'}
          </p>
          {framework === 'crc' ? (
            <div className="space-y-2.5">
              {[
                { l: 'C', label: 'Connect', desc: 'Eye contact, name, genuine evidence of something working' },
                { l: 'R', label: 'Recommend', desc: 'One priority. Tied to the KE. Concrete next step with a date' },
                { l: 'C', label: 'Commend', desc: 'Affirm the strength and capacity to grow. Evidence-based' },
              ].map(({ l, label, desc }) => (
                <div key={label} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-lm-dark text-lm-green flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                    {l}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-lm-dark">{label}</p>
                    <p className="text-[11px] text-lm-ink-muted leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : framework === 'grow' ? (
            <div className="space-y-2.5">
              {[
                { l: 'G', label: 'Goal', desc: 'Where do they want to be in LMQ?' },
                { l: 'R', label: 'Reality', desc: 'Where are they right now? What does the evidence show?' },
                { l: 'O', label: 'Options', desc: 'What could they try? What does the Masterclass show?' },
                { l: 'W', label: 'Will', desc: 'What will they commit to — specifically, before next session?' },
              ].map(({ l, label, desc }) => (
                <div key={label} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-lm-dark text-lm-green flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                    {l}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-lm-dark">{label}</p>
                    <p className="text-[11px] text-lm-ink-muted leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-2.5">
              {[
                { l: 'E', label: 'Elicit', desc: 'Ask what they noticed — before you share anything' },
                { l: 'P', label: 'Provide', desc: 'One factual observation. Grounded in what you saw.' },
                { l: 'E', label: 'Elicit', desc: 'Let them own the next step. Push for precision.' },
              ].map(({ l, label, desc }, i) => (
                <div key={`${label}-${i}`} className="flex gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-lm-dark text-lm-green flex items-center justify-center text-[9px] font-bold flex-shrink-0 mt-0.5">
                    {l}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-lm-dark">{label}</p>
                    <p className="text-[11px] text-lm-ink-muted leading-snug">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Live preview */}
      {framework && (state.connect || state.goal || hasEpeContent) && (
        <div className="rounded-xl border border-lm-green/20 bg-lm-green-mid p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-dark mb-3">Feedback Preview</p>
          <div className="space-y-3 text-xs text-lm-dark/80">
            {framework === 'crc' && (
              <>
                {state.connect    && <div><p className="font-bold mb-0.5">Connect</p><p className="leading-relaxed line-clamp-3">{state.connect}</p></div>}
                {state.recommend  && <div><p className="font-bold mb-0.5">Recommend</p><p className="leading-relaxed line-clamp-3">{state.recommend}</p></div>}
                {state.commend    && <div><p className="font-bold mb-0.5">Commend</p><p className="leading-relaxed line-clamp-3">{state.commend}</p></div>}
              </>
            )}
            {framework === 'grow' && (
              <>
                {state.goal     && <div><p className="font-bold mb-0.5">Goal</p><p className="leading-relaxed line-clamp-2">{state.goal}</p></div>}
                {state.reality  && <div><p className="font-bold mb-0.5">Reality</p><p className="leading-relaxed line-clamp-2">{state.reality}</p></div>}
                {state.options  && <div><p className="font-bold mb-0.5">Options</p><p className="leading-relaxed line-clamp-2">{state.options}</p></div>}
                {state.will     && <div><p className="font-bold mb-0.5">Will</p><p className="leading-relaxed line-clamp-2">{state.will}</p></div>}
              </>
            )}
            {framework === 'epe' && (
              <>
                {state.epeElicit1 && <div><p className="font-bold mb-0.5">Elicit (Open)</p><p className="leading-relaxed line-clamp-2">{state.epeElicit1}</p></div>}
                {state.epeProvide && <div><p className="font-bold mb-0.5">Provide</p><p className="leading-relaxed line-clamp-2">{state.epeProvide}</p></div>}
                {state.epeElicit2 && <div><p className="font-bold mb-0.5">Elicit (Close)</p><p className="leading-relaxed line-clamp-2">{state.epeElicit2}</p></div>}
              </>
            )}
            {(intentionIf || intentionThen) && (
              <div className="pt-2 border-t border-lm-dark/10">
                <p className="font-bold mb-0.5">Intention</p>
                <p className="leading-relaxed line-clamp-2 italic">
                  {intentionIf && intentionThen ? `IF ${intentionIf} → THEN ${intentionThen}` : intentionIf || intentionThen}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Dreyfus / Coaching Approach derivation
   ───────────────────────────────────────────── */
type DreyfusStage = 'Not yet assessed' | 'Novice' | 'Advanced Beginner' | 'Competent' | 'Proficient' | 'Expert';

function getDreyfusStage(grade: number | null, element: KeyElement, stage: number): DreyfusStage {
  if (grade === null) return 'Not yet assessed';
  if (grade === 1) return stage <= 2 ? 'Novice' : 'Advanced Beginner';
  if (grade === 2) return (element === 'choreography' || stage === 5) ? 'Proficient' : 'Competent';
  return 'Expert';
}

const DREYFUS_COACHING_GUIDANCE: Record<DreyfusStage, {
  register: string;
  avoid: string;
  example: string;
  badge: string;
}> = {
  'Not yet assessed': {
    register: 'No grade data yet — use your observation to calibrate the approach.',
    avoid: 'Assuming a level before you\'ve seen them teach this element.',
    example: 'Watch one class and note what\'s present before giving specific feedback.',
    badge: 'bg-slate-100 text-slate-500',
  },
  'Novice': {
    register: 'Direct and specific. Use clear language — "Do this, then this."',
    avoid: 'Open-ended questions — they don\'t yet have the framework to answer them.',
    example: '"In the squat track, set up with feet hip-width, then cue depth before adding load."',
    badge: 'bg-slate-100 text-slate-600',
  },
  'Advanced Beginner': {
    register: 'Demonstrate and explain why. Show them what good looks like.',
    avoid: 'Assuming they can self-diagnose — they see patterns but can\'t yet prioritise.',
    example: '"Watch how the timing changes when you start the cue before the transition — here\'s why that works."',
    badge: 'bg-blue-50 text-blue-700',
  },
  'Competent': {
    register: 'Ask questions, let them problem-solve. Use E-P-E (Elicit–Provide–Elicit).',
    avoid: 'Telling them the answer when they can find it themselves.',
    example: '"What did you notice about participant engagement in Track 3? What would you try differently?"',
    badge: 'bg-amber-50 text-amber-700',
  },
  'Proficient': {
    register: 'Prompt reflection, they lead. Use coaching-led questions.',
    avoid: 'Over-directing — they\'ll disengage if you treat them like a beginner.',
    example: '"You mentioned wanting to work on Connection — what did you see today that tells you where you are?"',
    badge: 'bg-green-50 text-green-700',
  },
  'Expert': {
    register: 'Stretch and challenge. Thought-provoking questions. One precise observation.',
    avoid: 'Volume of feedback — at this level, less is more.',
    example: '"If that class was 90% of world-class, what do you think the last 10% is?"',
    badge: 'bg-lm-dark text-white',
  },
};

const SUPERVISION_LABELS = ['Observe only', 'Direct supervision', 'Indirect supervision', 'Unsupervised', 'Can supervise others'] as const;

function getSupervisionLevel(grade: number | null, stage: number): string {
  if (grade === null) return SUPERVISION_LABELS[0];
  if (grade === 1 && stage <= 2) return SUPERVISION_LABELS[1];
  if (grade === 1) return SUPERVISION_LABELS[2];
  if (grade === 2) return SUPERVISION_LABELS[3];
  return SUPERVISION_LABELS[4];
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
export default function FeedbackBuilder() {
  const { instructors, loading } = useData();
  const [step, setStep] = useState<Step>('context');
  const [coachingGuideOpen, setCoachingGuideOpen] = useState(true);
  const [obsOpen, setObsOpen] = useState(false);
  const [obsGradeOpen, setObsGradeOpen] = useState<Partial<Record<KeyElement, boolean>>>({});
  const [obsTrackOpen, setObsTrackOpen] = useState<Record<string, boolean>>({});
  const [obsNotesInStep3Open, setObsNotesInStep3Open] = useState(false);
  const [intentionExamplesOpen, setIntentionExamplesOpen] = useState(false);
  const [obsNotes, setObsNotes] = useState<Partial<Record<KeyElement, string>>>({});
  const [trackNotes, setTrackNotes] = useState<Record<string, string>>({});
  const [intentionIf, setIntentionIf] = useState('');
  const [intentionThen, setIntentionThen] = useState('');

  const [state, setState] = useState<FeedbackState>({
    instructorId: '',
    keyElement: '',
    framework: null,
    connect: '', recommend: '', commend: '',
    goal: '', reality: '', options: '', will: '',
    epeElicit1: '', epeProvide: '', epeElicit2: '',
  });

  const set = (patch: Partial<FeedbackState>) => setState((prev) => ({ ...prev, ...patch }));

  const instructor = instructors.find((i) => i.id === state.instructorId);
  const ke = state.keyElement as KeyElement | '';
  const keColor = ke ? KE_COLORS[ke] : '#0A0A0A';
  const currentGrade = instructor?.grades.find((g) => g.element === ke)?.grade;

  const contextReady = !!state.instructorId && !!state.keyElement;

  const buildComplete =
    state.framework === 'crc' ? !!(state.connect && state.recommend && state.commend) :
    state.framework === 'grow' ? !!(state.goal && state.reality && state.options && state.will) :
    state.framework === 'epe' ? !!(state.epeElicit1 && state.epeProvide && state.epeElicit2) :
    false;

  const handleCopy = () => {
    const instrName = instructor?.name ?? '';
    const keLabel = ke ? KEY_ELEMENT_LABELS[ke] : '';
    let text = '';

    if (state.framework === 'crc') {
      text = `CONNECT:\n${state.connect}\n\nRECOMMEND:\n${state.recommend}\n\nCOMMEND:\n${state.commend}`;
    } else if (state.framework === 'grow') {
      text = `GOAL:\n${state.goal}\n\nREALITY:\n${state.reality}\n\nOPTIONS:\n${state.options}\n\nWILL:\n${state.will}`;
    } else if (state.framework === 'epe') {
      text = `E-P-E Conversation — ${instrName} — ${keLabel}\n\nElicit (Open):\n${state.epeElicit1}\n\nProvide:\n${state.epeProvide}\n\nElicit (Close):\n${state.epeElicit2}`;
    }

    const keObsNotes = ke ? obsNotes[ke] : undefined;
    if (keObsNotes) {
      text += `\n\n---\nObservation Notes (${keLabel}):\n${keObsNotes}`;
    }

    if (intentionIf && intentionThen) {
      text += `\n\nImplementation Intention:\nIF ${intentionIf} → THEN ${intentionThen}`;
    }

    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setState({
      instructorId: '', keyElement: '', framework: null,
      connect: '', recommend: '', commend: '',
      goal: '', reality: '', options: '', will: '',
      epeElicit1: '', epeProvide: '', epeElicit2: '',
    });
    setIntentionIf('');
    setIntentionThen('');
    setObsNotes({});
    setTrackNotes({});
    setObsOpen(false);
    setStep('context');
  };

  if (loading) {
    return <div className="p-8 text-muted-foreground text-sm">Loading instructors…</div>;
  }

  return (
    <div className="min-h-screen bg-background -m-6">
      {/* ── Compact dark hero ── */}
      <div
        className="relative overflow-hidden px-8 pt-10 pb-11"
        style={{
          background: 'linear-gradient(140deg, #060606 0%, #0c0c0c 35%, #091409 65%, #080808 100%)',
          borderTop: '3px solid #00FF63',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 65% 90% at 92% 70%, rgba(0,255,99,0.10) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 45% 55% at 55% 0%, rgba(0,255,99,0.05) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 35% 50% at -8% 30%, rgba(0,180,255,0.04) 0%, transparent 55%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.055 }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px' }} />
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 185" preserveAspectRatio="none" aria-hidden="true">
          {Array.from({ length: 16 }, (_, i) => (
            <ellipse key={i} cx={1340} cy={160} rx={(i + 1) * 86} ry={(i + 1) * 86 * 0.28} fill="none" stroke="#00FF63" strokeWidth={1} strokeOpacity={0.07} />
          ))}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 h-px pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(0,255,99,0.25) 25%, rgba(0,255,99,0.45) 50%, rgba(0,255,99,0.25) 75%, transparent 100%)' }} />
        <div className="relative">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-5 h-px bg-lm-green/60" />
            <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">LMQ-Driven</span>
          </div>
          <h1 className="font-display font-bold text-white text-4xl md:text-5xl leading-tight mb-2">Guided Feedback</h1>
          <p className="text-white/40 text-sm">Start with LMQ. Use CRC, GROW, or E-P-E to deliver it.</p>
        </div>
      </div>

      <div className="px-8 py-8 flex flex-col lg:flex-row gap-8 items-start">
        {/* ── Main Panel ── */}
        <div className="flex-1 min-w-0 space-y-6">

          {/* Step nav */}
          <div className="flex items-center gap-2">
            {(['context', 'framework', 'build', 'review'] as Step[]).map((s, idx) => {
              const labels: Record<Step, string> = { context: 'LMQ Context', framework: 'Approach', build: 'Build Feedback', review: 'Review & Copy' };
              const reached = ['context', 'framework', 'build', 'review'].indexOf(step) >= idx;
              const done = ['context', 'framework', 'build', 'review'].indexOf(step) > idx;
              return (
                <React.Fragment key={s}>
                  <div className={`flex items-center gap-1.5 text-xs font-semibold transition-colors ${reached ? 'text-lm-dark' : 'text-lm-ink-muted/40'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                      done ? 'bg-lm-green text-lm-dark' : reached ? 'bg-lm-dark text-white' : 'bg-lm-sunken text-lm-ink-muted'
                    }`}>
                      {done ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    {labels[s]}
                  </div>
                  {idx < 3 && <ChevronRight className="w-3 h-3 text-lm-ink-muted/30 flex-shrink-0" />}
                </React.Fragment>
              );
            })}
          </div>

          {/* ── Step 1: LMQ Context ── */}
          {step === 'context' && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden space-y-0">
                <div className="px-5 py-3 bg-[#0d0d0d] flex items-center gap-3">
                  <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
                  <div>
                    <p className="text-white text-sm font-bold leading-tight">Set LMQ Context</p>
                    <p className="text-white/40 text-xs mt-0.5">Choose the instructor and the Key Element this feedback is focused on.</p>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  {/* Instructor select */}
                  <div>
                    <p className="text-xs font-bold text-lm-dark uppercase tracking-wider mb-2">Instructor</p>
                    <Select value={state.instructorId} onValueChange={(v) => set({ instructorId: v })}>
                      <SelectTrigger className="max-w-sm">
                        <SelectValue placeholder="Select instructor" />
                      </SelectTrigger>
                      <SelectContent>
                        {instructors.map((inst) => (
                          <SelectItem key={inst.id} value={inst.id}>
                            {inst.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Key Element pills */}
                  <div>
                    <p className="text-xs font-bold text-lm-dark uppercase tracking-wider mb-3">Key Element Focus</p>
                    <div className="flex flex-wrap gap-2">
                      {KEY_ELEMENTS.map((element) => {
                        const isSelected = state.keyElement === element;
                        const instrGrade = instructor?.grades.find((g) => g.element === element)?.grade;
                        return (
                          <button
                            key={element}
                            onClick={() => set({ keyElement: element })}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all text-sm font-semibold focus:outline-none ${
                              isSelected ? 'text-white shadow-sm' : 'border-lm-sunken text-lm-ink-mid hover:border-lm-ink-muted/30 bg-white'
                            }`}
                            style={isSelected ? { backgroundColor: KE_COLORS[element], borderColor: KE_COLORS[element] } : {}}
                          >
                            {KEY_ELEMENT_LABELS[element]}
                            {instrGrade && (
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                                isSelected ? 'bg-white/20 text-white' : 'bg-lm-subtle text-lm-ink-muted'
                              }`}>
                                G{instrGrade}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Grade context preview */}
                  {instructor && ke && currentGrade && (
                    <div className="rounded-xl p-5 border-2" style={{ borderColor: keColor + '30', backgroundColor: keColor + '06' }}>
                      <p className="text-xs font-bold mb-3" style={{ color: keColor }}>
                        {instructor.name} — {KEY_ELEMENT_LABELS[ke]}
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/70 rounded-lg p-3">
                          <p className="text-[9px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1">Current — Grade {currentGrade}</p>
                          <p className="text-xs text-lm-ink-mid leading-relaxed">{LMQ_GRADE_DESCRIPTORS[ke][currentGrade].description}</p>
                        </div>
                        {currentGrade < 3 && (
                          <div className="bg-white/70 rounded-lg p-3">
                            <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: keColor }}>
                              Target — Grade {currentGrade + 1}
                            </p>
                            <p className="text-xs text-lm-ink-mid leading-relaxed">
                              {LMQ_GRADE_DESCRIPTORS[ke][(currentGrade + 1) as Grade].description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Observation Notes button */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setObsOpen((o) => !o)}
                      className={`flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full border transition-all focus:outline-none ${
                        obsOpen
                          ? 'bg-lm-dark text-white border-lm-dark'
                          : 'bg-white text-lm-ink-mid border-lm-sunken hover:border-lm-ink-muted/40'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Observation Notes
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform ${obsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {Object.values(obsNotes).some(Boolean) && (
                      <span className="text-[10px] font-semibold text-lm-ink-muted">Notes captured</span>
                    )}
                  </div>

                  <div className="flex justify-end pt-2">
                    <Button
                      onClick={() => setStep('framework')}
                      disabled={!contextReady}
                      className="bg-lm-dark text-white hover:bg-lm-dark/90 rounded-full px-6"
                    >
                      Choose Approach
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* ── Observation Framework Panel ── */}
              {obsOpen && (
                <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
                  <div className="px-5 py-3 bg-[#0d0d0d] flex items-center gap-3">
                    <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-bold leading-tight">Observation Framework</p>
                      <p className="text-white/40 text-xs mt-0.5">Capture facts first — interpretation second.</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Rule callout */}
                    <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                      <p className="text-xs text-amber-800 leading-relaxed">
                        <span className="font-bold">Write what you SAW, not what you THINK about what you saw.</span>{' '}
                        "Instructor looked at the back row twice in Track 3" is an observation. "Instructor doesn't connect with the back row" is an interpretation.
                      </p>
                    </div>

                    {/* 5 KE sections */}
                    {KEY_ELEMENTS.map((element) => {
                      const keData = OBS_KE_DATA[element];
                      const color = KE_COLORS[element];
                      const gradeOpen = obsGradeOpen[element];
                      return (
                        <div key={element} className="rounded-xl border border-lm-sunken overflow-hidden">
                          <div className="px-4 py-3 bg-lm-subtle flex items-center justify-between gap-3">
                            <div>
                              <span className="text-xs font-bold text-lm-dark">{KEY_ELEMENT_LABELS[element]}</span>
                              <span className="text-xs text-lm-ink-muted"> — {keData.description}</span>
                            </div>
                            <button
                              onClick={() => setObsGradeOpen((prev) => ({ ...prev, [element]: !prev[element] }))}
                              className="text-[10px] font-semibold text-lm-ink-muted hover:text-lm-dark transition-colors flex items-center gap-1 flex-shrink-0"
                            >
                              Grade signals
                              <ChevronDown className={`w-3 h-3 transition-transform ${gradeOpen ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          {gradeOpen && (
                            <div className="px-4 py-3 bg-white border-b border-lm-sunken grid grid-cols-3 gap-3">
                              {(['g1', 'g2', 'g3'] as const).map((g, idx) => (
                                <div key={g} className="rounded-lg bg-lm-subtle p-2.5">
                                  <p className="text-[9px] font-bold uppercase tracking-widest mb-1" style={{ color: idx === 2 ? color : undefined }}>
                                    G{idx + 1} Signals
                                  </p>
                                  <p className="text-[11px] text-lm-ink-mid leading-snug">{keData.signals[g]}</p>
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="p-4 bg-white">
                            <Textarea
                              value={obsNotes[element] ?? ''}
                              onChange={(e) => setObsNotes((prev) => ({ ...prev, [element]: e.target.value }))}
                              placeholder="What did you literally see and hear?"
                              rows={2}
                              className="text-sm resize-y focus:ring-lm-green"
                            />
                          </div>
                        </div>
                      );
                    })}

                    {/* Track-by-Track Notes */}
                    <div>
                      <p className="text-xs font-bold text-lm-dark uppercase tracking-wider mb-3">Track-by-Track Notes</p>
                      <div className="space-y-2">
                        {TRACKS.map((track) => {
                          const isOpen = obsTrackOpen[track];
                          return (
                            <div key={track} className="rounded-xl border border-lm-sunken overflow-hidden">
                              <button
                                onClick={() => setObsTrackOpen((prev) => ({ ...prev, [track]: !prev[track] }))}
                                className="w-full flex items-center justify-between px-4 py-2.5 bg-lm-subtle hover:bg-lm-sunken transition-colors text-left"
                              >
                                <span className="text-xs font-semibold text-lm-dark">{track}</span>
                                <ChevronDown className={`w-3.5 h-3.5 text-lm-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                              </button>
                              {isOpen && (
                                <div className="p-3 bg-white">
                                  <Textarea
                                    value={trackNotes[track] ?? ''}
                                    onChange={(e) => setTrackNotes((prev) => ({ ...prev, [track]: e.target.value }))}
                                    placeholder="Free-form notes for this track…"
                                    rows={2}
                                    className="text-sm resize-y focus:ring-lm-green"
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Step 2: Framework ── */}
          {step === 'framework' && (
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8">
              <div>
                <button onClick={() => setStep('context')} className="flex items-center gap-1.5 text-xs text-lm-ink-muted hover:text-lm-dark mb-4 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">Step 2</p>
                <h2 className="text-xl font-display font-bold text-lm-dark">How will you deliver this feedback?</h2>
                <p className="text-sm text-lm-ink-muted mt-1">Choose the framework that fits this conversation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[
                  {
                    id: 'crc' as Framework,
                    label: 'Post-Observation',
                    sub: 'CRC Method',
                    desc: 'You\'ve just watched them teach. You have specific evidence. Deliver structured, evidence-based feedback tied to the Key Element.',
                    when: 'Use after: class observations, self-review sessions, assessment debrief',
                    steps: ['Connect', 'Recommend', 'Commend'],
                  },
                  {
                    id: 'grow' as Framework,
                    label: 'Development Conversation',
                    sub: 'GROW Model',
                    desc: 'A coaching conversation to help them own their development. Coach-led but instructor-driven. Forward-looking.',
                    when: 'Use for: goal-setting, quarterly reviews, breakthrough conversations',
                    steps: ['Goal', 'Reality', 'Options', 'Will'],
                  },
                  {
                    id: 'epe' as Framework,
                    label: 'Quick Conversation',
                    sub: 'E-P-E Method',
                    desc: 'Elicit–Provide–Elicit. The 30-second coaching conversation from Motivational Interviewing. Ask what they noticed, share one observation, ask what they\'ll try next.',
                    when: 'Use for: post-class hallway conversations, quick check-ins, any moment where you have 2 minutes',
                    steps: ['Elicit', 'Provide', 'Elicit'],
                  },
                ].map((opt) => {
                  const isSelected = state.framework === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => set({ framework: opt.id })}
                      className={`text-left rounded-xl border-2 p-6 transition-all focus:outline-none ${
                        isSelected ? 'border-lm-dark bg-lm-subtle shadow-sm' : 'border-lm-sunken hover:border-lm-ink-muted/30 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div>
                          <p className="text-xs font-bold text-lm-ink-muted uppercase tracking-wider">{opt.sub}</p>
                          <p className="font-display font-bold text-lm-dark text-lg leading-tight mt-0.5">{opt.label}</p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-lm-dark flex items-center justify-center flex-shrink-0 mt-1">
                            <Check className="w-3 h-3 text-lm-green" />
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-lm-ink-mid leading-relaxed mb-4">{opt.desc}</p>
                      <p className="text-[11px] text-lm-ink-muted leading-snug mb-4">{opt.when}</p>
                      <div className="flex gap-2 flex-wrap">
                        {opt.steps.map((s, i) => (
                          <span key={`${s}-${i}`} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lm-sunken text-lm-ink-mid">{s}</span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep('build')}
                  disabled={!state.framework}
                  className="bg-lm-dark text-white hover:bg-lm-dark/90 rounded-full px-6"
                >
                  Build Feedback
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 3: Build ── */}
          {step === 'build' && (
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8">
              <div>
                <button onClick={() => setStep('framework')} className="flex items-center gap-1.5 text-xs text-lm-ink-muted hover:text-lm-dark mb-4 transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="flex items-center gap-3 mb-1">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted">Step 3</p>
                  {ke && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: keColor }}>
                      {KEY_ELEMENT_LABELS[ke]}
                    </span>
                  )}
                </div>
                <h2 className="text-xl font-display font-bold text-lm-dark">
                  {state.framework === 'crc' ? 'Build CRC Feedback' :
                   state.framework === 'grow' ? 'Build GROW Conversation' :
                   'Build E-P-E Conversation'}
                </h2>
              </div>

              {/* ── Coaching Approach guidance ── */}
              {instructor && ke && (() => {
                const grade = instructor.grades.find(g => g.element === ke)?.grade ?? null;
                const dreyfus = getDreyfusStage(grade, ke, instructor.stage);
                const guidance = DREYFUS_COACHING_GUIDANCE[dreyfus];
                const supervision = getSupervisionLevel(grade, instructor.stage);
                return (
                  <div className="rounded-xl border border-lm-sunken overflow-hidden">
                    <button
                      onClick={() => setCoachingGuideOpen(o => !o)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-lm-subtle hover:bg-lm-sunken transition-colors text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${guidance.badge}`}>{dreyfus}</span>
                        <span className="text-xs font-semibold text-lm-dark">Coaching Approach</span>
                        <span className="text-[10px] text-lm-ink-muted border border-lm-sunken px-2 py-0.5 rounded-full">{supervision}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-lm-ink-muted transition-transform ${coachingGuideOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {coachingGuideOpen && (
                      <div className="px-4 py-4 space-y-3 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <div className="rounded-lg bg-lm-subtle p-3">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1">Register</p>
                            <p className="text-xs text-lm-ink-mid leading-relaxed">{guidance.register}</p>
                          </div>
                          <div className="rounded-lg bg-lm-subtle p-3">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1">Avoid</p>
                            <p className="text-xs text-lm-ink-mid leading-relaxed">{guidance.avoid}</p>
                          </div>
                          <div className="rounded-lg bg-lm-subtle p-3">
                            <p className="text-[9px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1">Example framing</p>
                            <p className="text-xs text-lm-ink-mid leading-relaxed italic">{guidance.example}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* ── Observation notes toggle (if notes exist for this KE) ── */}
              {ke && obsNotes[ke] && (
                <div className="rounded-xl border border-lm-sunken overflow-hidden">
                  <button
                    onClick={() => setObsNotesInStep3Open((o) => !o)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-lm-subtle hover:bg-lm-sunken transition-colors text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-lm-ink-muted" />
                      <span className="text-xs font-semibold text-lm-dark">
                        Observation notes — {KEY_ELEMENT_LABELS[ke]}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-lm-ink-muted transition-transform ${obsNotesInStep3Open ? 'rotate-180' : ''}`} />
                  </button>
                  {obsNotesInStep3Open && (
                    <div className="px-4 py-3 bg-white">
                      <p className="text-xs text-lm-ink-mid leading-relaxed whitespace-pre-wrap">{obsNotes[ke]}</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── CRC form ── */}
              {state.framework === 'crc' && (
                <div className="space-y-6">
                  {[
                    { key: 'connect' as const, label: 'Connect', letter: 'C', hint: 'Eye contact, use their name, state genuine evidence of something working — not a compliment, an observation.', placeholder: 'e.g. "Sarah, your Position Setup on the squat is really clear — I can see participants responding to it immediately."' },
                    { key: 'recommend' as const, label: 'Recommend', letter: 'R', hint: 'One development priority tied to the Key Element. Specific. A concrete next step with a date.', placeholder: 'e.g. "Before your next class, I\'d like you to focus on your Execution Setup cues for the deadlift — add the target zone and stability cue."' },
                    { key: 'commend' as const, label: 'Commend', letter: 'C', hint: 'Affirm both the strength you observed and their capacity to grow — grounded in what you actually saw.', placeholder: 'e.g. "You\'ve built a really strong technical foundation. The way you\'re focusing on one thing at a time is exactly the right approach."' },
                  ].map(({ key, label, letter, hint, placeholder }) => (
                    <div key={key}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-6 h-6 rounded-full bg-lm-dark flex items-center justify-center text-[10px] font-bold text-lm-green flex-shrink-0">
                          {letter}
                        </div>
                        <p className="font-bold text-lm-dark text-sm uppercase tracking-wider">{label}</p>
                      </div>
                      <p className="text-xs text-lm-ink-muted mb-2 leading-relaxed">{hint}</p>
                      <Textarea
                        value={state[key]}
                        onChange={(e) => set({ [key]: e.target.value })}
                        placeholder={placeholder}
                        rows={3}
                        className="text-sm resize-y focus:ring-lm-green"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── GROW form ── */}
              {state.framework === 'grow' && (
                <div className="space-y-6">
                  {[
                    { key: 'goal' as const, label: 'Goal', letter: 'G', hint: 'Where do they want to be in this Key Element — by when? Make it LMQ-specific.', placeholder: 'e.g. "I want to consistently deliver all 3 coaching layers in my next observation — moving from Grade 2 to Grade 3 in Coaching."' },
                    { key: 'reality' as const, label: 'Reality', letter: 'R', hint: 'Where are they right now? What does the evidence — observation, self-review — actually show?', placeholder: 'e.g. "Currently Layer 1 and Layer 2 are consistent, but Layer 3 real-time corrections are still limited — maybe 1-2 per class."' },
                    { key: 'options' as const, label: 'Options', letter: 'O', hint: 'What could they try? What does the Masterclass show? What would happen if they committed to one thing?', placeholder: 'e.g. "Watch the Masterclass and count how many Layer 3 corrections the presenter makes per track. Try targeting one per track."' },
                    { key: 'will' as const, label: 'Will', letter: 'W', hint: 'What will they commit to — specifically — before the next session?', placeholder: 'e.g. "I\'ll watch the Masterclass this week and teach 3 times before our next session, targeting one named correction per track."' },
                  ].map(({ key, label, letter, hint, placeholder }) => (
                    <div key={key}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-6 h-6 rounded-full bg-lm-dark flex items-center justify-center text-[10px] font-bold text-lm-green flex-shrink-0">
                          {letter}
                        </div>
                        <p className="font-bold text-lm-dark text-sm uppercase tracking-wider">{label}</p>
                      </div>
                      <p className="text-xs text-lm-ink-muted mb-2 leading-relaxed">{hint}</p>
                      <Textarea
                        value={state[key]}
                        onChange={(e) => set({ [key]: e.target.value })}
                        placeholder={placeholder}
                        rows={3}
                        className="text-sm resize-y focus:ring-lm-green"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── E-P-E form ── */}
              {state.framework === 'epe' && (
                <div className="space-y-6">
                  {EPE_SECTIONS.map(({ key, label, letter, hint, suggestions, placeholder }) => (
                    <div key={key}>
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-6 h-6 rounded-full bg-lm-dark flex items-center justify-center text-[10px] font-bold text-lm-green flex-shrink-0">
                          {letter}
                        </div>
                        <p className="font-bold text-lm-dark text-sm uppercase tracking-wider">{label}</p>
                      </div>
                      <p className="text-xs text-lm-ink-muted mb-2 leading-relaxed">{hint}</p>
                      {/* Clickable suggestion chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => {
                              const current = state[key];
                              set({ [key]: current ? `${current}\n${s}` : s });
                            }}
                            className="text-[10px] text-lm-ink-muted italic px-2.5 py-1 rounded-full bg-lm-subtle hover:bg-lm-sunken border border-lm-sunken transition-colors text-left"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <Textarea
                        value={state[key]}
                        onChange={(e) => set({ [key]: e.target.value })}
                        placeholder={placeholder}
                        rows={3}
                        className="text-sm resize-y focus:ring-lm-green"
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* ── Implementation Intention ── */}
              <div className="rounded-xl border border-lm-sunken overflow-hidden">
                <div className="px-5 py-4 bg-lm-subtle border-b border-lm-sunken">
                  <p className="text-xs font-bold text-lm-dark uppercase tracking-wider mb-0.5">Implementation Intention</p>
                  <p className="text-[11px] text-lm-ink-muted leading-snug">
                    End every conversation with one specific if-then plan. Goals with if-then plans are completed ~3× more often.
                  </p>
                </div>
                <div className="p-5 space-y-4 bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1.5">IF</p>
                      <Textarea
                        value={intentionIf}
                        onChange={(e) => setIntentionIf(e.target.value)}
                        placeholder="a specific class moment, e.g. 'I start the squat track in BODYPUMP'"
                        rows={2}
                        className="text-sm resize-y focus:ring-lm-green"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-1.5">THEN</p>
                      <Textarea
                        value={intentionThen}
                        onChange={(e) => setIntentionThen(e.target.value)}
                        placeholder="a specific behaviour, e.g. 'I will use the 3-2-1 countdown cue while making eye contact with the back row'"
                        rows={2}
                        className="text-sm resize-y focus:ring-lm-green"
                      />
                    </div>
                  </div>

                  {/* Specificity checklist */}
                  {(intentionIf || intentionThen) && (
                    <div className="space-y-1.5 pt-1">
                      {[
                        'Has a specific trigger — the "if" names a precise moment, not a general situation',
                        'Has a specific behaviour — the "then" describes exactly what they will do',
                        'Is observable — someone watching could confirm whether they did it',
                        'Is in their control — they can execute regardless of how participants respond',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2">
                          <span className="text-lm-green font-bold text-[11px] flex-shrink-0 mt-0.5">✓</span>
                          <p className="text-[11px] text-lm-ink-muted leading-snug">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Examples by KE */}
                  {ke && INTENTION_EXAMPLES[ke] && (
                    <div className="rounded-lg border border-lm-sunken overflow-hidden">
                      <button
                        onClick={() => setIntentionExamplesOpen((o) => !o)}
                        className="w-full flex items-center justify-between px-3 py-2.5 bg-lm-subtle hover:bg-lm-sunken transition-colors text-left"
                      >
                        <span className="text-[10px] font-semibold text-lm-dark">
                          Examples — {KEY_ELEMENT_LABELS[ke]}
                        </span>
                        <ChevronDown className={`w-3.5 h-3.5 text-lm-ink-muted transition-transform ${intentionExamplesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {intentionExamplesOpen && (
                        <div className="px-3 py-3 space-y-2.5 bg-white">
                          {INTENTION_EXAMPLES[ke].map((ex, i) => (
                            <button
                              key={i}
                              onClick={() => { setIntentionIf(ex.if); setIntentionThen(ex.then); }}
                              className="w-full text-left rounded-lg bg-lm-subtle hover:bg-lm-sunken border border-lm-sunken p-2.5 transition-colors"
                            >
                              <p className="text-[11px] text-lm-dark leading-snug">
                                <span className="font-bold">IF</span> {ex.if} <span className="text-lm-ink-muted mx-1">→</span> <span className="font-bold">THEN</span> {ex.then}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {!intentionIf && !intentionThen && (
                    <p className="text-[11px] text-lm-ink-muted/70 italic">Every great coaching conversation ends with a plan. What will they try next?</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep('review')}
                  disabled={!buildComplete}
                  className="bg-lm-dark text-white hover:bg-lm-dark/90 rounded-full px-6"
                >
                  Review & Copy
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {/* ── Step 4: Review ── */}
          {step === 'review' && (
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">Step 4</p>
                <h2 className="text-xl font-display font-bold text-lm-dark">Review & Deliver</h2>
                {instructor && ke && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-lm-ink-muted">For {instructor.name}</span>
                    <span className="text-lm-sunken">·</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: keColor }}>
                      {KEY_ELEMENT_LABELS[ke]}
                    </span>
                    {currentGrade && <Badge variant="secondary">Grade {currentGrade}</Badge>}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {state.framework === 'crc' && [
                  { label: 'Connect', value: state.connect },
                  { label: 'Recommend', value: state.recommend },
                  { label: 'Commend', value: state.commend },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="rounded-xl border border-border p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">{label}</p>
                    <p className="text-sm text-lm-dark leading-relaxed whitespace-pre-wrap">{value}</p>
                  </div>
                ) : null)}

                {state.framework === 'grow' && [
                  { label: 'Goal', value: state.goal },
                  { label: 'Reality', value: state.reality },
                  { label: 'Options', value: state.options },
                  { label: 'Will', value: state.will },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="rounded-xl border border-border p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">{label}</p>
                    <p className="text-sm text-lm-dark leading-relaxed whitespace-pre-wrap">{value}</p>
                  </div>
                ) : null)}

                {state.framework === 'epe' && [
                  { label: 'Elicit (Open)', value: state.epeElicit1 },
                  { label: 'Provide', value: state.epeProvide },
                  { label: 'Elicit (Close)', value: state.epeElicit2 },
                ].map(({ label, value }) => value ? (
                  <div key={label} className="rounded-xl border border-border p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">{label}</p>
                    <p className="text-sm text-lm-dark leading-relaxed whitespace-pre-wrap">{value}</p>
                  </div>
                ) : null)}

                {/* Observation notes in review */}
                {ke && obsNotes[ke] && (
                  <div className="rounded-xl border border-lm-sunken p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">
                      Observation Notes — {KEY_ELEMENT_LABELS[ke]}
                    </p>
                    <p className="text-sm text-lm-ink-mid leading-relaxed whitespace-pre-wrap">{obsNotes[ke]}</p>
                  </div>
                )}

                {/* Implementation Intention in review */}
                {(intentionIf || intentionThen) && (
                  <div className="rounded-xl border border-lm-green/30 bg-lm-green/5 p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">Implementation Intention</p>
                    <p className="text-sm text-lm-dark leading-relaxed">
                      {intentionIf && intentionThen
                        ? <><span className="font-bold">IF</span> {intentionIf} <span className="text-lm-ink-muted mx-1">→</span> <span className="font-bold">THEN</span> {intentionThen}</>
                        : intentionIf
                        ? <><span className="font-bold">IF</span> {intentionIf}</>
                        : <><span className="font-bold">THEN</span> {intentionThen}</>
                      }
                    </p>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between gap-4">
                <button onClick={reset} className="text-xs text-lm-ink-muted hover:text-lm-dark transition-colors font-semibold">
                  Start new feedback
                </button>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep('build')} className="rounded-full">
                    <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Edit
                  </Button>
                  <Button onClick={handleCopy} className="bg-lm-dark text-white hover:bg-lm-dark/90 rounded-full gap-2">
                    <Copy className="w-3.5 h-3.5" />
                    Copy Feedback
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="w-full lg:w-72 flex-shrink-0 lg:sticky lg:top-6">
          <LMQContextPanel
            state={state}
            framework={state.framework}
            intentionIf={intentionIf}
            intentionThen={intentionThen}
            instructors={instructors}
          />
        </div>
      </div>
    </div>
  );
}
