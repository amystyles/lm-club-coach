import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useData } from '@/context/DataContext';
import type { Instructor } from '@/data/types';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { X, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';

const LEVEL_LABELS = ['Observe only', 'Direct supervision', 'Indirect supervision', 'Unsupervised', 'Can supervise others'] as const;

const LEVEL_COLORS = ['#94a3b8', '#f59e0b', '#3b82f6', '#00FF63', '#a855f7'] as const;

interface ETAGuide {
  name: string;
  what: string;
  levels: [string, string, string, string, string];
}

const ETA_GUIDES: ETAGuide[] = [
  {
    name: 'Execute choreography with accuracy & timing',
    what: 'Watch for accuracy at transitions, under fatigue, and at intensity peaks. Can they stay on the music when the pressure is highest?',
    levels: [
      'Choreography is unsafe or significantly inaccurate. Not ready to lead.',
      'Mostly accurate but timing breaks down at transitions or intensity peaks. You must be in the room.',
      'Generally accurate throughout. Minor lapses under high load. Observe every 2–3 sessions.',
      'Consistent accuracy and timing across the full class. No monitoring needed.',
      'Models choreography accuracy and actively helps others improve theirs.',
    ],
  },
  {
    name: 'Lead 2–3 tracks in a team taught class',
    what: 'Watch for confidence taking the mic, ability to hold their own tracks, and how they hand back to team members cleanly.',
    levels: [
      'Not ready to take tracks. Needs to observe team teaching first.',
      'Can take tracks but still needs your presence for confidence and safety.',
      'Leads team-taught tracks safely. May benefit from a debrief after.',
      'Leads team-taught confidently without any oversight required.',
      'Leads team-taught and actively develops other team teachers in the session.',
    ],
  },
  {
    name: 'Coach technique corrections in real-time',
    what: 'Watch for whether they identify form issues, whether they respond or keep talking through their script, and the quality of the cue they give.',
    levels: [
      'Not yet noticing or correcting technique. Focus is entirely on own delivery.',
      'Attempts corrections but cues are unclear or poorly timed. Needs real-time coaching from you.',
      'Makes relevant corrections independently. Accuracy may drop under pressure.',
      'Coaches technique fluently in real-time throughout the class.',
      'Develops other instructors\' ability to observe and correct technique.',
    ],
  },
  {
    name: 'Adapt intensity for mixed-ability participants',
    what: 'Is the instructor reading the room? Watch for whether they notice participants struggling or breezing, and whether they respond.',
    levels: [
      'Delivers the same experience to all. Not yet reading or adapting to the room.',
      'Aware of mixed ability but adaptations are scripted or inconsistent.',
      'Adapts intensity to the room most of the time. Occasional misreads.',
      'Reads and adapts naturally throughout. No prompting needed.',
      'Coaches other instructors to observe and adapt to mixed-ability groups.',
    ],
  },
  {
    name: 'Build connection with every participant',
    what: 'Count genuine moments of connection — names used, eye contact that sticks, energy that travels. Is it sustained or just occasional?',
    levels: [
      'Not yet connecting beyond scripted cues. Focus is on survival delivery.',
      'Occasional connection attempts but they feel forced or inconsistent.',
      'Builds genuine connection with most participants during most classes.',
      'Sustains authentic connection with the whole group independently.',
      'Creates a culture of connection. Coaches others on how to build it.',
    ],
  },
  {
    name: 'Manage equipment failure or participant injury',
    what: 'Have they read the emergency protocols? Would they know what to do if someone went down? Can they keep the class calm while handling it?',
    levels: [
      'Not ready. Would need immediate hands-on support from you.',
      'Knows the protocol but execution under pressure is uncertain. Must be in the building.',
      'Can handle most situations. May need guidance on edge cases after the fact.',
      'Confident and competent. Handles unexpected situations without any support.',
      'Trains and prepares other instructors in safety and emergency protocols.',
    ],
  },
  {
    name: 'Deliver a complete class independently',
    what: 'Watch the full arc — start, middle, and finish. Does energy hold? Are technical and coaching elements consistent throughout?',
    levels: [
      'Not ready for solo delivery. Needs a co-facilitated or team-taught environment.',
      'Can deliver solo but you should be present or immediately contactable.',
      'Delivers independently. Regular observation (every 4–6 weeks) recommended.',
      'Consistently delivers high-quality classes. No monitoring required.',
      'Ready to be an observer and coach for other instructors\' full class delivery.',
    ],
  },
  {
    name: 'Mentor newer instructors',
    what: 'Can they hold space for someone else\'s development? Watch for their ability to ask questions rather than tell, and to give specific, useful feedback.',
    levels: [
      'Not ready to mentor. Still consolidating their own skills.',
      'Has mentoring instincts but needs guidance on how to coach others effectively.',
      'Provides useful informal support. Needs oversight of their mentoring approach.',
      'Mentors effectively without support. Trusted to develop others independently.',
      'Leads mentoring culture. Builds and runs structured development for newer instructors.',
    ],
  },
];

interface TrustState {
  level: number | null;
  notes: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  instructor: Instructor;
}

export default function AssessTrustSheet({ open, onClose, instructor }: Props) {
  const { refresh } = useData();
  const [trust, setTrust] = useState<TrustState[]>(() => initTrust(instructor));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);

  function initTrust(inst: Instructor): TrustState[] {
    return ETA_GUIDES.map((_, i) => ({
      level: inst.trustOverrides[String(i)] ?? null,
      notes: '',
    }));
  }

  useEffect(() => {
    setTrust(initTrust(instructor));
  }, [instructor.id]);

  function setLevel(idx: number, level: number) {
    setTrust(prev => prev.map((t, i) => i === idx ? { ...t, level } : t));
  }

  function setNotes(idx: number, notes: string) {
    setTrust(prev => prev.map((t, i) => i === idx ? { ...t, notes } : t));
  }

  function clearOverride(idx: number) {
    setTrust(prev => prev.map((t, i) => i === idx ? { ...t, level: null } : t));
  }

  async function handleSave() {
    setSaving(true);
    const overrides: Record<string, number> = { ...instructor.trustOverrides };
    trust.forEach((t, i) => {
      if (t.level !== null) overrides[String(i)] = t.level;
      else delete overrides[String(i)];
    });
    await supabase
      .from('instructors')
      .update({ trust_overrides: overrides })
      .eq('id', instructor.id);
    refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  }

  const assessedCount = trust.filter(t => t.level !== null).length;

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent
        side="right"
        className="p-0 w-full sm:max-w-[580px] flex flex-col overflow-hidden border-l border-[#e8e8e8]"
        style={{ gap: 0 }}
      >
        {/* Header */}
        <div
          className="relative flex-shrink-0 px-7 pt-8 pb-6"
          style={{
            background: 'linear-gradient(140deg, #060606 0%, #0c0c0c 60%, #091409 100%)',
            borderTop: '3px solid #00FF63',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 100%, rgba(0,255,99,0.10) 0%, transparent 65%)' }} />
          <button onClick={onClose} className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-lm-green/60" />
              <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">Assessment</span>
            </div>
            <h2 className="text-white font-display font-bold text-2xl leading-tight">Teaching Trust Map</h2>
            <p className="text-white/40 text-xs mt-1">{instructor.name} · {assessedCount} of {ETA_GUIDES.length} assessed</p>
          </div>

          {/* Legend */}
          <div className="relative flex items-center gap-3 mt-5 flex-wrap">
            {LEVEL_LABELS.map((label, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: LEVEL_COLORS[i] }} />
                <span className="text-[10px] text-white/50">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Intro */}
        <div className="px-7 py-5 bg-[#f8f8f8] border-b border-[#ebebeb] space-y-3">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">What is this?</p>
            <p className="text-xs text-lm-dark leading-relaxed">
              The Teaching Trust Map tells you <span className="font-semibold">how much oversight this instructor needs</span> for each key teaching task — not as a judgement, but as a coaching tool. Different tasks require different levels of supervision, and a great instructor can be fully independent in one area while still needing support in another.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">Why it matters</p>
            <p className="text-xs text-lm-dark leading-relaxed">
              Giving too much supervision to someone who is ready creates dependency. Giving too little to someone who isn't ready creates risk. Getting this right is what separates reactive management from genuine coaching.
            </p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1">How to use it</p>
            <p className="text-xs text-lm-dark leading-relaxed">
              Levels are auto-calculated from key element grades as a starting point. Use the guidance under each task to <span className="font-semibold">assess based on what you've directly observed</span> — not what you expect, or what they tell you. Set a level, add a note, and revisit after each observation cycle.
            </p>
          </div>
        </div>

        {/* ETA list */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#f0f0f0]">
          {ETA_GUIDES.map((eta, idx) => {
            const t = trust[idx];
            const isExpanded = expanded === idx;
            const hasOverride = t.level !== null;

            return (
              <div key={idx} className={`transition-colors ${isExpanded ? 'bg-[#fafafa]' : 'bg-white'}`}>
                {/* Row header */}
                <button
                  type="button"
                  onClick={() => setExpanded(isExpanded ? null : idx)}
                  className="w-full flex items-center gap-3 px-5 py-4 text-left"
                >
                  {/* Level dots */}
                  <div className="flex gap-1 flex-shrink-0">
                    {([1, 2, 3, 4, 5] as const).map(lv => (
                      <div
                        key={lv}
                        className="w-2.5 h-2.5 rounded-full transition-all border"
                        style={{
                          backgroundColor: hasOverride && lv <= t.level!
                            ? LEVEL_COLORS[t.level! - 1]
                            : 'transparent',
                          borderColor: hasOverride && lv <= t.level!
                            ? LEVEL_COLORS[t.level! - 1]
                            : '#aaa',
                        }}
                      />
                    ))}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-lm-dark leading-snug truncate">{eta.name}</p>
                    {hasOverride && (
                      <p className="text-[10px] mt-0.5" style={{ color: LEVEL_COLORS[t.level! - 1] }}>
                        {LEVEL_LABELS[t.level! - 1]}
                      </p>
                    )}
                    {!hasOverride && (
                      <p className="text-[10px] text-lm-ink-muted mt-0.5">Not yet assessed</p>
                    )}
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-lm-ink-muted flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-4 border-t border-[#ebebeb]">

                    {/* What to look for */}
                    <div className="pt-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1.5">What to look for</p>
                      <p className="text-xs text-lm-ink-mid leading-relaxed">{eta.what}</p>
                    </div>

                    {/* Level selector */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-2">Set supervision level</p>
                      <div className="space-y-2">
                        {eta.levels.map((desc, lv) => {
                          const level = lv + 1;
                          const isSelected = t.level === level;
                          const color = LEVEL_COLORS[lv];
                          return (
                            <button
                              key={level}
                              type="button"
                              onClick={() => setLevel(idx, level)}
                              className={`w-full text-left rounded-lg border-2 px-3.5 py-3 transition-all ${
                                isSelected
                                  ? ''
                                  : 'border-[#d0d0d0] bg-white hover:border-[#aaa]'
                              }`}
                              style={isSelected ? { backgroundColor: color + '18', borderColor: color } : {}}
                            >
                              <div className="flex items-start gap-2.5">
                                <div
                                  className="w-4 h-4 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center text-[9px] font-bold border-2"
                                  style={{
                                    backgroundColor: isSelected ? color : 'transparent',
                                    borderColor: isSelected ? color : '#aaa',
                                    color: isSelected ? (lv === 3 ? '#000' : '#fff') : '#777',
                                  }}
                                >
                                  {level}
                                </div>
                                <div>
                                  <p className={`text-[11px] font-bold mb-0.5 ${isSelected ? 'text-lm-dark' : 'text-lm-ink-mid'}`}>
                                    {LEVEL_LABELS[lv]}
                                  </p>
                                  <p className={`text-[11px] leading-relaxed ${isSelected ? 'text-lm-dark/70' : 'text-lm-ink-muted'}`}>
                                    {desc}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {hasOverride && (
                        <button
                          type="button"
                          onClick={() => clearOverride(idx)}
                          className="mt-2 text-[10px] text-lm-ink-muted hover:text-lm-red underline underline-offset-2"
                        >
                          Clear assessment (revert to auto)
                        </button>
                      )}
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1.5 block">
                        Notes <span className="font-normal normal-case tracking-normal">(optional)</span>
                      </label>
                      <Textarea
                        value={t.notes}
                        onChange={e => setNotes(idx, e.target.value)}
                        placeholder="What did you observe that informed this level?"
                        className="text-xs resize-none h-20 focus-visible:ring-lm-green/50 focus-visible:border-lm-green"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-7 py-5 border-t border-[#f0f0f0] bg-white flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="flex-1 h-10 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            style={{ backgroundColor: saved ? '#00FF63' : '#0A0A0A', color: saved ? '#0A0A0A' : '#fff' }}
          >
            {saved ? (
              <><CheckCircle2 className="w-4 h-4" />Saved</>
            ) : saving ? (
              <><Loader2 className="w-3.5 h-3.5 animate-spin" />Saving…</>
            ) : (
              'Save Assessment'
            )}
          </button>
          <button
            onClick={onClose}
            className="h-10 px-5 text-sm font-medium rounded-full border border-[#ddd] text-lm-ink-mid hover:bg-[#f5f5f5] transition-colors"
          >
            Cancel
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
