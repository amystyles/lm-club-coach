import { useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import type { DevelopmentNote, Grade, KeyElement } from '@/data/types';
import { KEY_ELEMENT_LABELS } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const KEY_ELEMENTS: KeyElement[] = ['choreography', 'technique', 'coaching', 'connection', 'performance'];

interface Props {
  instructorId: string;
  notes: DevelopmentNote[];
}

export default function DevelopmentNotesSection({ instructorId, notes }: Props) {
  const { activeClub, user } = useAuth();
  const { refresh } = useData();
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keyElement, setKeyElement] = useState<KeyElement>('coaching');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [observation, setObservation] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [followUp, setFollowUp] = useState('');
  const [grade, setGrade] = useState<Grade>(2);

  const instructorNotes = notes.filter((note) => note.instructorId === instructorId);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeClub || !user) return;

    setSaving(true);
    setError(null);

    const { error: insertError } = await supabase.from('development_notes').insert({
      club_id: activeClub.id,
      instructor_id: instructorId,
      author_id: user.id,
      date,
      key_element: keyElement,
      observation,
      recommendation,
      follow_up: followUp || null,
      grade,
    });

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setObservation('');
    setRecommendation('');
    setFollowUp('');
    setOpen(false);
    refresh();
  }

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
            <div>
              <CardTitle className="text-white text-sm leading-tight">Development Notes</CardTitle>
              <p className="text-white/40 text-xs mt-0.5">Structured coaching observations</p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="border-white/20 text-white hover:bg-white/10"
            onClick={() => setOpen((value) => !value)}
          >
            <Plus className="w-3.5 h-3.5 mr-1" />
            Add Note
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-4">
        {open && (
          <form onSubmit={handleSubmit} className="space-y-4 border border-border rounded-xl p-4 bg-muted/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="note-date">Date</Label>
                <Input id="note-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="md:col-span-2">
                <Label>Key Element</Label>
                <Select value={keyElement} onValueChange={(value) => setKeyElement(value as KeyElement)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {KEY_ELEMENTS.map((element) => (
                      <SelectItem key={element} value={element}>
                        {KEY_ELEMENT_LABELS[element]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="note-observation">Observation</Label>
              <Textarea
                id="note-observation"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="note-recommendation">Recommendation</Label>
              <Textarea
                id="note-recommendation"
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value)}
                required
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="note-follow-up">Follow-up (optional)</Label>
              <Textarea
                id="note-follow-up"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <Label>Grade</Label>
              <div className="flex gap-2 mt-2">
                {[1, 2, 3].map((value) => (
                  <Button
                    key={value}
                    type="button"
                    variant={grade === value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setGrade(value as Grade)}
                  >
                    {value}
                  </Button>
                ))}
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? 'Saving…' : 'Save Note'}
              </Button>
            </div>
          </form>
        )}

        {instructorNotes.length === 0 ? (
          <p className="text-sm text-muted-foreground">No development notes yet.</p>
        ) : (
          instructorNotes.map((note) => (
            <div key={note.id} className="rounded-xl border border-border p-4 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold">{KEY_ELEMENT_LABELS[note.keyElement]}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(note.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
              {note.grade && (
                <p className="text-xs text-muted-foreground">Grade {note.grade}</p>
              )}
              <p className="text-sm"><span className="font-medium">Observed:</span> {note.observation}</p>
              <p className="text-sm"><span className="font-medium">Recommend:</span> {note.recommendation}</p>
              {note.followUp && (
                <p className="text-sm"><span className="font-medium">Follow-up:</span> {note.followUp}</p>
              )}
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
