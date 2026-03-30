import React, { useState } from 'react';
import { Copy, ChevronRight, Check, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { instructors, KEY_ELEMENT_LABELS } from '@/data/mock-data';
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

type Framework = 'crc' | 'grow';
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
}

/* ─────────────────────────────────────────────
   LMQ Context Panel — sidebar
   ───────────────────────────────────────────── */
function LMQContextPanel({
  state,
  framework,
}: {
  state: FeedbackState;
  framework: Framework | null;
}) {
  const instructor = instructors.find((i) => i.id === state.instructorId);
  const ke = state.keyElement as KeyElement | '';

  const currentGrade = instructor?.grades.find((g) => g.element === ke)?.grade;
  const nextGrade = currentGrade && currentGrade < 3 ? ((currentGrade + 1) as Grade) : null;
  const keColor = ke ? KE_COLORS[ke] : '#0A0A0A';

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
            {framework === 'crc' ? 'CRC Method' : 'GROW Model'}
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
          ) : (
            <div className="space-y-2.5">
              {[
                { l: 'G', label: 'Goal', desc: 'Where do they want to be in the LMQ?' },
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
          )}
        </div>
      )}

      {/* Live preview */}
      {framework && (state.connect || state.goal) && (
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
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Page
   ───────────────────────────────────────────── */
export default function FeedbackBuilder() {
  const [step, setStep] = useState<Step>('context');
  const [state, setState] = useState<FeedbackState>({
    instructorId: '',
    keyElement: '',
    framework: null,
    connect: '', recommend: '', commend: '',
    goal: '', reality: '', options: '', will: '',
  });

  const set = (patch: Partial<FeedbackState>) => setState((prev) => ({ ...prev, ...patch }));

  const instructor = instructors.find((i) => i.id === state.instructorId);
  const ke = state.keyElement as KeyElement | '';
  const keColor = ke ? KE_COLORS[ke] : '#0A0A0A';
  const currentGrade = instructor?.grades.find((g) => g.element === ke)?.grade;

  const contextReady = !!state.instructorId && !!state.keyElement;

  const buildComplete = state.framework === 'crc'
    ? state.connect && state.recommend && state.commend
    : state.goal && state.reality && state.options && state.will;

  const handleCopy = () => {
    const text = state.framework === 'crc'
      ? `CONNECT:\n${state.connect}\n\nRECOMMEND:\n${state.recommend}\n\nCOMMEND:\n${state.commend}`
      : `GOAL:\n${state.goal}\n\nREALITY:\n${state.reality}\n\nOPTIONS:\n${state.options}\n\nWILL:\n${state.will}`;
    navigator.clipboard.writeText(text);
  };

  const reset = () => {
    setState({ instructorId: '', keyElement: '', framework: null, connect: '', recommend: '', commend: '', goal: '', reality: '', options: '', will: '' });
    setStep('context');
  };

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
          <p className="text-white/40 text-sm">Start with the LMQ. Use CRC or GROW to deliver it.</p>
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
            <div className="bg-white rounded-2xl border border-border p-8 shadow-sm space-y-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">Step 1</p>
                <h2 className="text-xl font-display font-bold text-lm-dark">Set the LMQ Context</h2>
                <p className="text-sm text-lm-ink-muted mt-1">Choose the instructor and the Key Element this feedback is focused on.</p>
              </div>

              <div className="space-y-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        {opt.steps.map((s) => (
                          <span key={s} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-lm-sunken text-lm-ink-mid">{s}</span>
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
                  {state.framework === 'crc' ? 'Build CRC Feedback' : 'Build GROW Conversation'}
                </h2>
              </div>

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
          <LMQContextPanel state={state} framework={state.framework} />
        </div>
      </div>
    </div>
  );
}
