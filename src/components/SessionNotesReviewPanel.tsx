import { useCallback, useEffect, useMemo, useState } from 'react';
import { NotebookPen } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useCustomSessions } from '@/context/CustomSessionsContext';
import type { SessionPathKey } from '@/context/SessionProgressContext';
import { getPathLabel, getSessionTitle } from '@/lib/session-titles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SessionNoteRow {
  user_id: string;
  path_key: SessionPathKey;
  session_id: string;
  notes: string;
  completed: boolean;
  updated_at: string;
}

interface ProfileRow {
  id: string;
  name: string;
  initials: string;
}

export default function SessionNotesReviewPanel({ title = 'Session Notes Review' }: { title?: string }) {
  const { activeClub, user } = useAuth();
  const { rows: customSessions } = useCustomSessions();
  const [notes, setNotes] = useState<SessionNoteRow[]>([]);
  const [profiles, setProfiles] = useState<Record<string, ProfileRow>>({});
  const [loading, setLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    if (!activeClub) {
      setNotes([]);
      setProfiles({});
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('session_progress')
      .select('user_id, path_key, session_id, notes, completed, updated_at')
      .eq('club_id', activeClub.id)
      .neq('notes', '')
      .order('updated_at', { ascending: false });

    if (error) {
      setLoading(false);
      return;
    }

    const rows = ((data ?? []) as SessionNoteRow[]).filter((row) => row.notes.trim().length > 0);
    setNotes(rows);

    const userIds = [...new Set(rows.map((row) => row.user_id))];
    if (userIds.length > 0) {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('id, name, initials')
        .in('id', userIds);

      const byId: Record<string, ProfileRow> = {};
      for (const profile of (profileData ?? []) as ProfileRow[]) {
        byId[profile.id] = profile;
      }
      setProfiles(byId);
    } else {
      setProfiles({});
    }

    setLoading(false);
  }, [activeClub?.id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const groupedNotes = useMemo(() => {
    const groups = new Map<string, SessionNoteRow[]>();
    for (const row of notes) {
      const key = row.user_id;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key)!.push(row);
    }
    return [...groups.entries()];
  }, [notes]);

  return (
    <Card>
      <CardHeader className="p-0">
        <div className="px-5 py-3 bg-[#0d0d0d] rounded-t-lg border-b border-white/8 flex items-center gap-3">
          <div className="w-1 h-8 rounded-full bg-lm-green/80 flex-shrink-0" />
          <div>
            <CardTitle className="text-white text-sm leading-tight">{title}</CardTitle>
            <p className="text-white/40 text-xs mt-0.5">Saved notes from coaches across your club</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-5 space-y-5">
        {loading && <p className="text-sm text-muted-foreground">Loading session notes…</p>}

        {!loading && groupedNotes.length === 0 && (
          <div className="flex items-start gap-3 rounded-xl border border-dashed border-border p-4">
            <NotebookPen className="w-4 h-4 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              No session notes yet. Notes saved on the Club Coach Path or Development Pathway will appear here for review.
            </p>
          </div>
        )}

        {groupedNotes.map(([userId, userNotes]) => {
          const profile = profiles[userId];
          const isSelf = user?.id === userId;

          return (
            <div key={userId} className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-lm-dark text-white text-xs font-bold flex items-center justify-center">
                  {profile?.initials ?? '??'}
                </div>
                <div>
                  <p className="text-sm font-bold text-lm-dark">
                    {profile?.name ?? 'Unknown coach'}
                    {isSelf && <span className="text-lm-ink-muted font-medium"> (you)</span>}
                  </p>
                  <p className="text-xs text-muted-foreground">{userNotes.length} note{userNotes.length === 1 ? '' : 's'}</p>
                </div>
              </div>

              <div className="space-y-3 pl-2 border-l-2 border-lm-sunken ml-4">
                {userNotes.map((row) => (
                  <div key={`${row.path_key}-${row.session_id}`} className="rounded-xl border border-border p-4 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-lm-dark">
                        {getSessionTitle(row.path_key, row.session_id, customSessions)}
                      </p>
                      <Badge variant="outline" className="text-[10px]">
                        {getPathLabel(row.path_key)}
                      </Badge>
                      {row.completed && (
                        <Badge className="text-[10px] bg-lm-green/15 text-lm-dark border-lm-green/30">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-lm-ink-mid whitespace-pre-wrap">{row.notes}</p>
                    <p className="text-[11px] text-muted-foreground">
                      Updated {new Date(row.updated_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
