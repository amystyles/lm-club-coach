import { useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import { STAGE_DATA, KEY_ELEMENT_LABELS, LM_PROGRAMS } from '@/data/mock-data';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Plus, Loader2 } from 'lucide-react';

const KEY_ELEMENTS = ['choreography', 'technique', 'coaching', 'connection', 'performance'] as const;

// Program status stored as a string token; resolved to int on submit
const CERT_STATUS_MAP: Record<string, number> = {
  certified: 3,
  'in-training': 2,
  'not-certified': 1,
};

function statusToLmqLevel(status: string): number {
  if (status in CERT_STATUS_MAP) return CERT_STATUS_MAP[status];
  const n = parseInt(status, 10);
  return Number.isFinite(n) ? Math.max(1, Math.min(10, n)) : 1;
}

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  joinDate: z.string().min(1, 'Join date is required'),
  stage: z.coerce.number().int().min(1).max(6),
  lmqLevel: z.coerce.number().int().min(1).max(10),
  priorityElement: z.enum(KEY_ELEMENTS),
  riskLevel: z.enum(['low', 'medium', 'high']),
  programs: z
    .array(z.object({ name: z.string().min(1), status: z.string().min(1) }))
    .min(1, 'Add at least one program'),
});

type FormValues = z.infer<typeof schema>;

function deriveInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const LABEL = 'text-[10px] font-bold uppercase tracking-[0.15em] text-[#666] mb-1.5 block';
const SECTION = 'pb-6 border-b border-[#f0f0f0] last:border-0 last:pb-0';

export default function AddInstructorSheet({ open, onClose }: Props) {
  const { activeClub } = useAuth();
  const { refresh } = useData();
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      joinDate: new Date().toISOString().slice(0, 10),
      stage: 3,
      lmqLevel: 1,
      priorityElement: 'choreography',
      riskLevel: 'low',
      programs: [{ name: '', status: 'not-certified' }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control: form.control, name: 'programs' as any });

  async function onSubmit(values: FormValues) {
    if (!activeClub) return;
    setSaving(true);
    setServerError(null);

    const initials = deriveInitials(values.name);

    const { data: instructor, error: instErr } = await supabase
      .from('instructors')
      .insert({
        club_id: activeClub.id,
        name: values.name,
        initials,
        stage: values.stage,
        lmq_level: values.lmqLevel,
        priority_element: values.priorityElement,
        join_date: values.joinDate,
        risk_level: values.riskLevel,
        last_assessment: null,
        goals: [],
      })
      .select('id')
      .single();

    if (instErr || !instructor) {
      setServerError(instErr?.message ?? 'Failed to create instructor');
      setSaving(false);
      return;
    }

    const programRows = values.programs.map((p) => ({
      instructor_id: instructor.id,
      name: p.name,
      lmq_level: statusToLmqLevel(p.status),
    }));

    const gradeRows = KEY_ELEMENTS.map((el) => ({
      instructor_id: instructor.id,
      element: el,
      grade: 1,
    }));

    await Promise.all([
      supabase.from('instructor_programs').insert(programRows),
      supabase.from('instructor_grades').insert(gradeRows),
    ]);

    refresh();
    setSaving(false);
    form.reset();
    onClose();
  }

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="right"
        className="p-0 w-full sm:max-w-[480px] flex flex-col overflow-hidden border-l border-[#e8e8e8]"
        style={{ gap: 0 }}
      >
        {/* Header */}
        <div
          className="relative flex-shrink-0 px-7 pt-8 pb-7"
          style={{
            background: 'linear-gradient(140deg, #060606 0%, #0c0c0c 60%, #091409 100%)',
            borderTop: '3px solid #00FF63',
          }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 80% at 100% 100%, rgba(0,255,99,0.12) 0%, transparent 65%)' }} />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-4 h-px bg-lm-green/60" />
              <span className="text-lm-green/70 text-[10px] font-bold tracking-[0.3em] uppercase">New Profile</span>
            </div>
            <h2 className="text-white font-display font-bold text-2xl leading-tight">Add Instructor</h2>
            <p className="text-white/40 text-xs mt-1">{activeClub?.name}</p>
          </div>
        </div>

        {/* Form body */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto"
        >
          <div className="px-7 py-7 space-y-7">

            {/* Identity */}
            <div className={SECTION}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-lm-ink-muted mb-5">Identity</p>
              <div className="space-y-4">
                <div>
                  <label className={LABEL}>Full Name</label>
                  <Input
                    {...form.register('name')}
                    placeholder="e.g. Jordan Silva"
                    className="h-9 text-sm"
                  />
                  {form.formState.errors.name && (
                    <p className="text-xs text-lm-red mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className={LABEL}>Join Date</label>
                  <Input
                    type="date"
                    {...form.register('joinDate')}
                    className="h-9 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Programs */}
            <div className={SECTION}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-lm-ink-muted">Programs</p>
                <button
                  type="button"
                  onClick={() => append({ name: '', status: 'not-certified' } as any)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-lm-green hover:text-lm-green/80 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add
                </button>
              </div>
              {/* Column headers */}
              <div className="flex items-center gap-2 mb-2 px-0.5">
                <span className="flex-1 text-[10px] font-semibold uppercase tracking-widest text-lm-ink-muted">Program</span>
                <span className="w-32 text-[10px] font-semibold uppercase tracking-widest text-lm-ink-muted">Status</span>
                <span className="w-7" />
              </div>
              <datalist id="lm-programs-list">
                {LM_PROGRAMS.map((p) => <option key={p} value={p} />)}
              </datalist>
              <div className="space-y-2">
                {fields.map((field, idx) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Input
                        {...form.register(`programs.${idx}.name`)}
                        list="lm-programs-list"
                        placeholder="Program name…"
                        className="h-9 text-sm focus-visible:ring-lm-green/50 focus-visible:border-lm-green"
                        autoComplete="off"
                      />
                    </div>
                    <div className="w-36">
                      <Controller
                        control={form.control}
                        name={`programs.${idx}.status` as any}
                        render={({ field: f }) => (
                          <Select value={f.value} onValueChange={f.onChange}>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="certified">Certified</SelectItem>
                              <SelectItem value="in-training">In Training</SelectItem>
                              <SelectItem value="not-certified">Not Certified</SelectItem>
                              <div className="h-px bg-border my-1" />
                              {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                                <SelectItem key={n} value={String(n)}>LMQ {n}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    {fields.length > 1 && (
                      <button
                        type="button"
                        onClick={() => remove(idx)}
                        className="w-7 h-7 flex-shrink-0 flex items-center justify-center rounded text-lm-ink-muted hover:text-lm-red hover:bg-red-50 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {form.formState.errors.programs && (
                <p className="text-xs text-lm-red mt-2">{form.formState.errors.programs.message}</p>
              )}
            </div>

            {/* Development */}
            <div className={SECTION}>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-lm-ink-muted mb-5">Development</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={LABEL}>Stage</label>
                  <Controller
                    control={form.control}
                    name="stage"
                    render={({ field: f }) => (
                      <Select value={String(f.value)} onValueChange={(v) => f.onChange(Number(v))}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STAGE_DATA.map((s) => (
                            <SelectItem key={s.stage} value={String(s.stage)}>
                              {s.stage} — {s.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <label className={LABEL}>Overall LMQ</label>
                  <Controller
                    control={form.control}
                    name="lmqLevel"
                    render={({ field: f }) => (
                      <Select value={String(f.value)} onValueChange={(v) => f.onChange(Number(v))}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                            <SelectItem key={n} value={String(n)}>Level {n}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <label className={LABEL}>Priority Element</label>
                  <Controller
                    control={form.control}
                    name="priorityElement"
                    render={({ field: f }) => (
                      <Select value={f.value} onValueChange={f.onChange}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {KEY_ELEMENTS.map((el) => (
                            <SelectItem key={el} value={el}>
                              {KEY_ELEMENT_LABELS[el]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
                <div>
                  <label className={LABEL}>Risk Level</label>
                  <Controller
                    control={form.control}
                    name="riskLevel"
                    render={({ field: f }) => (
                      <Select value={f.value} onValueChange={f.onChange}>
                        <SelectTrigger className="h-9 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>
              </div>
              <p className="text-[10px] text-lm-ink-muted mt-3">All 5 key element grades will start at Grade 1 and be updated through assessments.</p>
            </div>

            {serverError && (
              <p className="text-xs text-lm-red bg-red-50 border border-red-200 rounded px-3 py-2">{serverError}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-7 py-5 border-t border-[#f0f0f0] bg-white flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-10 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-opacity disabled:opacity-60"
              style={{ backgroundColor: '#00FF63', color: '#0A0A0A' }}
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? 'Saving…' : 'Add Instructor'}
            </button>
            <Button type="button" variant="outline" onClick={onClose} className="h-10 px-5 text-sm rounded-full">
              Cancel
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
