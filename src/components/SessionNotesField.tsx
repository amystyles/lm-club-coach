import { useEffect, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import type { SessionPathKey } from '@/context/SessionProgressContext';
import { useSessionProgress } from '@/context/SessionProgressContext';

interface SessionNotesFieldProps {
  pathKey: SessionPathKey;
  sessionId: string;
  placeholder?: string;
}

export default function SessionNotesField({
  pathKey,
  sessionId,
  placeholder = 'What landed? What will you try? What questions came up?',
}: SessionNotesFieldProps) {
  const { getNotes, saveNotes } = useSessionProgress();
  const [notes, setNotes] = useState(() => getNotes(pathKey, sessionId));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setNotes(getNotes(pathKey, sessionId));
  }, [getNotes, pathKey, sessionId]);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const persisted = getNotes(pathKey, sessionId);
      if (notes === persisted) return;
      setSaving(true);
      try {
        await saveNotes(pathKey, sessionId, notes);
      } finally {
        setSaving(false);
      }
    }, 600);

    return () => window.clearTimeout(timer);
  }, [notes, pathKey, sessionId, getNotes, saveNotes]);

  return (
    <div className="rounded-xl border border-border bg-lm-subtle p-5">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <div className="flex items-center gap-2">
          <NotebookPen className="w-3.5 h-3.5 text-lm-ink-muted" />
          <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-lm-ink-muted">Your Notes</span>
        </div>
        {saving && <span className="text-[10px] text-lm-ink-muted">Saving…</span>}
      </div>
      <p className="text-lm-ink-muted text-xs mb-3">Saved to your account for this club.</p>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={placeholder}
        rows={5}
        className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-lm-ink-mid placeholder:text-lm-ink-muted/50 focus:outline-none focus:ring-2 focus:ring-lm-green focus:border-transparent resize-y"
      />
    </div>
  );
}
