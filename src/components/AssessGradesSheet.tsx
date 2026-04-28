import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useData } from '@/context/DataContext';
import type { Instructor, KeyElement } from '@/data/types';
import { KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

interface GradeCriteria {
  grade: number;
  label: string;
  desc: string;
  disabled?: boolean;
}

const ELEMENT_GUIDE: Record<KeyElement, { overview: string; criteria: GradeCriteria[] }> = {
  choreography: {
    overview: 'Accuracy, timing, and smooth transitions through any structured format. Applies to all programs — LM or otherwise. Grade 2 is the mastery ceiling for this element; excellence beyond it expresses through Performance.',
    criteria: [
      { grade: 1, label: 'Grade 1', desc: 'Mostly accurate with noticeable timing breakdowns. Hesitates at transitions or under pressure. Relies on muscle memory rather than confident delivery.' },
      { grade: 2, label: 'Grade 2 — Mastery Ceiling', desc: 'Consistent, accurate choreography throughout. Strong timing, smooth transitions. This is the ceiling for this element — further growth shows up in Performance.' },
      { grade: 3, label: 'Grade 3', desc: 'Not applicable. Choreography mastery ceiling is Grade 2 for all formats.', disabled: true },
    ],
  },
  technique: {
    overview: 'Movement quality, biomechanics, and the ability to identify and correct form — in themselves and others. Applies universally across all fitness formats.',
    criteria: [
      { grade: 1, label: 'Grade 1', desc: 'Basic movement standards met. Some breakdown under load or fatigue. Needs external reminders to self-correct.' },
      { grade: 2, label: 'Grade 2', desc: 'Consistently strong technique. Identifies own breakdowns and self-corrects. Beginning to coach technique corrections to participants in real-time.' },
      { grade: 3, label: 'Grade 3', desc: 'Expert-level mastery. Coaches technique fluently without breaking flow. Models excellence and raises the standard in the room.' },
    ],
  },
  coaching: {
    overview: 'The ability to observe what\'s happening, read the room, and respond in the moment — moving from scripted delivery to genuine real-time coaching. Universal across all formats.',
    criteria: [
      { grade: 1, label: 'Grade 1', desc: 'Uses scripted cues. Limited real-time adaptation. Coaching feels disconnected from what is actually happening in the room.' },
      { grade: 2, label: 'Grade 2', desc: 'Adapts cues based on observation. Starting to coach individuals within the class flow. CRC or equivalent framework being applied.' },
      { grade: 3, label: 'Grade 3', desc: 'Reads the room and adapts instantly. Coaches individuals and the group simultaneously. Masterful real-time presence regardless of format.' },
    ],
  },
  connection: {
    overview: 'How this instructor makes participants feel seen, valued, and part of a shared experience — not just attending a workout. A universal competency for any instructor.',
    criteria: [
      { grade: 1, label: 'Grade 1', desc: 'Aware of participants but attention is mostly inward. Occasional acknowledgment but sustained connection isn\'t yet present.' },
      { grade: 2, label: 'Grade 2', desc: 'Actively engages individuals. Uses names. People feel seen and welcomed. Shared energy is building throughout the session.' },
      { grade: 3, label: 'Grade 3', desc: 'Creates a powerful collective experience. Participants feel individually connected. This instructor builds culture wherever they teach.' },
    ],
  },
  performance: {
    overview: 'Commitment, energy, and the ability to inspire the room — not just lead the workout. This is what separates competent delivery from transformative instruction. Applies to all formats.',
    criteria: [
      { grade: 1, label: 'Grade 1', desc: 'Functional delivery. Energy and commitment are inconsistent — especially in high-intensity or high-fatigue moments.' },
      { grade: 2, label: 'Grade 2', desc: 'Strong, consistent performance energy. Commitment is visible throughout. Participants feel genuinely inspired by their presence.' },
      { grade: 3, label: 'Grade 3', desc: 'Elite performance presence. Transcends the workout — moves, inspires, and elevates the entire room in any format.' },
    ],
  },
};

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

const ELEMENT_COLORS: Record<KeyElement, string> = {
  choreography: '#6366f1',
  technique:    '#f59e0b',
  coaching:     '#3b82f6',
  connection:   '#ec4899',
  performance:  '#00FF63',
};

interface GradeState {
  grade: number;
  notes: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  instructor: Instructor;
}

export default function AssessGradesSheet({ open, onClose, instructor }: Props) {
  const { refresh } = useData();
  const [grades, setGrades] = useState<Record<KeyElement, GradeState>>(() => initGrades(instructor));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeElement, setActiveElement] = useState<KeyElement>('choreography');

  function initGrades(inst: Instructor): Record<KeyElement, GradeState> {
    const result = {} as Record<KeyElement, GradeState>;
    for (const el of KEY_ELEMENTS) {
      const existing = inst.grades.find(g => g.element === el);
      result[el] = { grade: existing?.grade ?? 1, notes: existing?.notes ?? '' };
    }
    return result;
  }

  // Sync when instructor prop changes (e.g. after refresh)
  useEffect(() => {
    setGrades(initGrades(instructor));
  }, [instructor.id]);

  function setGrade(el: KeyElement, grade: number) {
    setGrades(prev => ({ ...prev, [el]: { ...prev[el], grade } }));
  }

  function setNotes(el: KeyElement, notes: string) {
    setGrades(prev => ({ ...prev, [el]: { ...prev[el], notes } }));
  }

  async function handleSave() {
    setSaving(true);
    const today = new Date().toISOString().slice(0, 10);

    await Promise.all(
      KEY_ELEMENTS.map(el =>
        supabase
          .from('instructor_grades')
          .update({ grade: grades[el].grade, notes: grades[el].notes || null, last_assessed: today })
          .eq('instructor_id', instructor.id)
          .eq('element', el)
      )
    );

    refresh();
    setSaving(false);
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 800);
  }

  const guide = ELEMENT_GUIDE[activeElement];
  const currentGrade = grades[activeElement].grade;
  const accentColor = ELEMENT_COLORS[activeElement];

  return (
    <Sheet open={open} onOpenChange={v => !v && onClose()}>
      <SheetContent
        side="right"
        className="p-0 w-full sm:max-w-[560px] flex flex-col overflow-hidden border-l border-[#e8e8e8]"
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
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-lm-green/60" />
              <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">Assessment</span>
            </div>
            <h2 className="text-white font-display font-bold text-2xl leading-tight">Key Element Grades</h2>
            <p className="text-white/40 text-xs mt-1">{instructor.name}</p>
          </div>

          {/* Element tab strip */}
          <div className="relative flex gap-1 mt-6 -mx-1">
            {KEY_ELEMENTS.map(el => {
              const isActive = el === activeElement;
              const g = grades[el].grade;
              return (
                <button
                  key={el}
                  onClick={() => setActiveElement(el)}
                  className={`flex-1 px-2 py-2 rounded text-center transition-all ${
                    isActive ? 'bg-white/12' : 'hover:bg-white/6'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full mx-auto mb-1 flex items-center justify-center text-[10px] font-bold"
                    style={{
                      backgroundColor: isActive ? accentColor : '#333',
                      color: isActive ? '#000' : '#999',
                    }}
                  >
                    {g}
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider leading-none ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {KEY_ELEMENT_LABELS[el].slice(0, 4)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-7 py-6 space-y-5">

            {/* Element header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: accentColor }} />
                <h3 className="text-base font-bold text-lm-dark">{KEY_ELEMENT_LABELS[activeElement]}</h3>
              </div>
              <p className="text-xs text-lm-ink-muted leading-relaxed pl-[18px]">{guide.overview}</p>
            </div>

            {/* Grade selector */}
            <div className="space-y-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted">Skills & Observation Guide</p>
              {guide.criteria.map(({ grade, label, desc, disabled }) => {
                const isSelected = currentGrade === grade && !disabled;
                return (
                  <button
                    key={grade}
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && setGrade(activeElement, grade)}
                    className={`w-full text-left rounded-xl border-2 px-4 py-3.5 transition-all ${
                      disabled
                        ? 'border-dashed border-[#e5e5e5] opacity-40 cursor-not-allowed'
                        : isSelected
                        ? 'border-lm-dark bg-lm-dark'
                        : 'border-[#e8e8e8] hover:border-[#ccc] bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5 transition-all ${
                          disabled ? 'bg-[#e5e5e5] text-[#aaa]'
                          : isSelected ? 'text-lm-dark' : 'bg-[#f0f0f0] text-lm-ink-mid'
                        }`}
                        style={isSelected && !disabled ? { backgroundColor: accentColor } : {}}
                      >
                        {grade}
                      </div>
                      <div className="min-w-0">
                        <p className={`text-xs font-bold mb-0.5 ${isSelected ? 'text-white' : disabled ? 'text-[#aaa]' : 'text-lm-dark'}`}>
                          {label}
                        </p>
                        <p className={`text-xs leading-relaxed ${isSelected ? 'text-white/70' : disabled ? 'text-[#bbb]' : 'text-lm-ink-muted'}`}>
                          {desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Notes */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-lm-ink-muted mb-1.5 block">
                Coaching Notes <span className="text-lm-ink-muted font-normal normal-case tracking-normal">(optional)</span>
              </label>
              <Textarea
                value={grades[activeElement].notes}
                onChange={e => setNotes(activeElement, e.target.value)}
                placeholder="What did you observe? What's the focus for next cycle?"
                className="text-sm resize-none h-24 focus-visible:ring-lm-green/50 focus-visible:border-lm-green"
              />
            </div>

            {/* Grade summary */}
            <div className="rounded-xl bg-[#f8f8f8] border border-[#eee] px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-lm-ink-muted mb-2">All Elements</p>
              <div className="grid grid-cols-5 gap-2">
                {KEY_ELEMENTS.map(el => {
                  const g = grades[el].grade;
                  const isThis = el === activeElement;
                  return (
                    <button
                      key={el}
                      onClick={() => setActiveElement(el)}
                      className="flex flex-col items-center gap-1"
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                        style={{
                          backgroundColor: isThis ? accentColor : '#e8e8e8',
                          color: isThis ? '#000' : '#666',
                        }}
                      >
                        {g}
                      </div>
                      <span className="text-[9px] text-lm-ink-muted font-medium uppercase tracking-wide leading-none text-center">
                        {KEY_ELEMENT_LABELS[el].slice(0, 4)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 px-7 py-5 border-t border-[#f0f0f0] bg-white flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving || saved}
            className="flex-1 h-10 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-70"
            style={{ backgroundColor: saved ? '#00FF63' : '#0A0A0A', color: '#fff' }}
          >
            {saved ? (
              <><CheckCircle2 className="w-4 h-4 text-lm-dark" /><span className="text-lm-dark">Saved</span></>
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
