import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  defaultFormValues,
  emptyBlock,
  emptyPromptGroup,
  formValuesToSessionData,
  type CustomSessionFormValues,
} from '@/lib/custom-session-form';

interface AddSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CustomSessionFormValues) => Promise<void>;
}

function BlockEditor({
  block,
  index,
  onChange,
  onRemove,
  canRemove,
}: {
  block: CustomSessionFormValues['blocks'][number];
  index: number;
  onChange: (block: CustomSessionFormValues['blocks'][number]) => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="rounded-xl border border-border p-4 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Block {index + 1}
        </p>
        {canRemove && (
          <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label>Block title</Label>
          <Input
            value={block.title}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="e.g. Connection recap"
          />
        </div>
        <div>
          <Label>Duration</Label>
          <Input
            value={block.duration}
            onChange={(e) => onChange({ ...block, duration: e.target.value })}
            placeholder="5 min"
          />
        </div>
      </div>
      <div>
        <Label>Steps (one per line)</Label>
        <Textarea
          value={block.steps.join('\n')}
          onChange={(e) => onChange({ ...block, steps: e.target.value.split('\n') })}
          rows={4}
          placeholder={'Brief check-in from previous session\nFrame today’s focus'}
        />
      </div>
      <div>
        <Label>Coach tip (optional)</Label>
        <Input
          value={block.tip ?? ''}
          onChange={(e) => onChange({ ...block, tip: e.target.value })}
          placeholder="Optional tip for the coach running this block"
        />
      </div>
    </div>
  );
}

function PromptGroupEditor({
  group,
  index,
  onChange,
  onRemove,
}: {
  group: CustomSessionFormValues['promptGroups'][number];
  index: number;
  onChange: (group: CustomSessionFormValues['promptGroups'][number]) => void;
  onRemove: () => void;
}) {
  return (
    <div className="rounded-xl border border-border p-4 space-y-3 bg-muted/20">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Prompt group {index + 1}
        </p>
        <Button type="button" variant="ghost" size="sm" onClick={onRemove}>
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
      <div>
        <Label>Label</Label>
        <Input
          value={group.label}
          onChange={(e) => onChange({ ...group, label: e.target.value })}
          placeholder="e.g. Dreyfus"
        />
      </div>
      <div>
        <Label>Prompts (one per line)</Label>
        <Textarea
          value={group.prompts.join('\n')}
          onChange={(e) => onChange({ ...group, prompts: e.target.value.split('\n') })}
          rows={3}
          placeholder={'Think of an instructor you know well...\nWhere do they sit for Choreography vs Connection?'}
        />
      </div>
    </div>
  );
}

export default function AddSessionDialog({ open, onOpenChange, onSubmit }: AddSessionDialogProps) {
  const [values, setValues] = useState<CustomSessionFormValues>(defaultFormValues);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setValues(defaultFormValues());
    setError(null);
  }

  function setField<K extends keyof CustomSessionFormValues>(key: K, value: CustomSessionFormValues[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.title.trim()) {
      setError('Session title is required.');
      return;
    }
    if (!values.what.trim() || !values.why.trim() || !values.how.trim()) {
      setError('Brief tab requires What, Why, and at least one How action.');
      return;
    }

    const sessionData = formValuesToSessionData(values);
    if (!sessionData.sessionPlan?.blocks.length) {
      setError('Add at least one session plan block with a title and steps.');
      return;
    }

    setSaving(true);
    setError(null);
    try {
      await onSubmit(values);
      reset();
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add session.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset();
        onOpenChange(next);
      }}
    >
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add session</DialogTitle>
          <DialogDescription>
            Build a session using the same framework as built-in sessions: coach role, brief (What / Why / How), timed plan blocks, and optional prompts. Admin only.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Accordion type="multiple" defaultValue={['overview', 'coach-role', 'brief', 'plan']} className="w-full">
            <AccordionItem value="overview">
              <AccordionTrigger className="text-sm font-semibold">Session overview</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="session-title">Title *</Label>
                  <Input
                    id="session-title"
                    value={values.title}
                    onChange={(e) => setField('title', e.target.value)}
                    placeholder="e.g. Follow-up check-in"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="session-subtitle">Subtitle</Label>
                  <Input
                    id="session-subtitle"
                    value={values.subtitle}
                    onChange={(e) => setField('subtitle', e.target.value)}
                    placeholder="e.g. Review progress on connection cues"
                  />
                </div>
                <div>
                  <Label htmlFor="session-pro-tip">Pro tip</Label>
                  <Textarea
                    id="session-pro-tip"
                    value={values.proTip}
                    onChange={(e) => setField('proTip', e.target.value)}
                    rows={2}
                    placeholder="Optional coaching tip shown on the Notes tab"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="coach-role">
              <AccordionTrigger className="text-sm font-semibold">Coach role</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <Label>Summary</Label>
                  <Input
                    value={values.coachRoleSummary}
                    onChange={(e) => setField('coachRoleSummary', e.target.value)}
                    placeholder="e.g. Guide. You're not teaching theory — you're showing the tools."
                  />
                </div>
                <div>
                  <Label>Context</Label>
                  <Textarea
                    value={values.coachRoleContext}
                    onChange={(e) => setField('coachRoleContext', e.target.value)}
                    rows={3}
                    placeholder="Why this session exists and what the coach should understand going in"
                  />
                </div>
                <div>
                  <Label>Principle</Label>
                  <Input
                    value={values.coachRolePrinciple}
                    onChange={(e) => setField('coachRolePrinciple', e.target.value)}
                    placeholder="e.g. When you understand the why behind a tool, you use it better."
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="brief">
              <AccordionTrigger className="text-sm font-semibold">Brief — What / Why / How</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div>
                  <Label>What *</Label>
                  <Textarea
                    value={values.what}
                    onChange={(e) => setField('what', e.target.value)}
                    rows={3}
                    placeholder="What happens in this session"
                  />
                </div>
                <div>
                  <Label>Why *</Label>
                  <Textarea
                    value={values.why}
                    onChange={(e) => setField('why', e.target.value)}
                    rows={3}
                    placeholder="Why this session matters"
                  />
                </div>
                <div>
                  <Label>How — coach actions (one per line) *</Label>
                  <Textarea
                    value={values.how}
                    onChange={(e) => setField('how', e.target.value)}
                    rows={5}
                    placeholder={'Introduce yourself and explain your role\nAgree on meeting rhythm\nLeave with one clear expectation'}
                  />
                </div>
                <div>
                  <Label>Session goals (one per line)</Label>
                  <Textarea
                    value={values.goals}
                    onChange={(e) => setField('goals', e.target.value)}
                    rows={3}
                    placeholder={'Coach understands the pathway structure\nExpectations set for the journey'}
                  />
                </div>
                <div>
                  <Label>LMQ alignment</Label>
                  <Textarea
                    value={values.lmqAlignment}
                    onChange={(e) => setField('lmqAlignment', e.target.value)}
                    rows={2}
                    placeholder="How this session connects to LMQ standards"
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="plan">
              <AccordionTrigger className="text-sm font-semibold">Session plan</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label>Total duration *</Label>
                    <Input
                      value={values.planDuration}
                      onChange={(e) => setField('planDuration', e.target.value)}
                      placeholder="30 min"
                    />
                  </div>
                  <div>
                    <Label>Format *</Label>
                    <Input
                      value={values.planFormat}
                      onChange={(e) => setField('planFormat', e.target.value)}
                      placeholder="1:1 with TAP Coach"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {values.blocks.map((block, index) => (
                    <BlockEditor
                      key={index}
                      block={block}
                      index={index}
                      canRemove={values.blocks.length > 1}
                      onChange={(next) => {
                        const blocks = [...values.blocks];
                        blocks[index] = next;
                        setField('blocks', blocks);
                      }}
                      onRemove={() => setField('blocks', values.blocks.filter((_, i) => i !== index))}
                    />
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setField('blocks', [...values.blocks, emptyBlock()])}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add plan block
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="prompts">
              <AccordionTrigger className="text-sm font-semibold">Coaching prompts (optional)</AccordionTrigger>
              <AccordionContent className="space-y-4 pt-2">
                {values.promptGroups.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No prompt groups yet.</p>
                ) : (
                  values.promptGroups.map((group, index) => (
                    <PromptGroupEditor
                      key={index}
                      group={group}
                      index={index}
                      onChange={(next) => {
                        const promptGroups = [...values.promptGroups];
                        promptGroups[index] = next;
                        setField('promptGroups', promptGroups);
                      }}
                      onRemove={() => setField('promptGroups', values.promptGroups.filter((_, i) => i !== index))}
                    />
                  ))
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setField('promptGroups', [...values.promptGroups, emptyPromptGroup()])}
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Add prompt group
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Adding…' : 'Add session'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
