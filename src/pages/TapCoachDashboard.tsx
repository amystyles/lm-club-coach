import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useSessionProgress } from '@/context/SessionProgressContext';
import { coachPathStages, COACH_STAGE_META } from '@/data/coach-path-data';
import { deriveCoachStage } from '@/lib/coach-path-progress';
import type { CompletionStatus } from '@/lib/roles';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle2, Clock, Users } from 'lucide-react';

interface TapAssignmentRow {
  enrollment_id: string;
  coach_user_id: string;
  club_id: string;
  club_name: string;
  coach_name: string;
  coach_initials: string;
}

interface CoachSessionRow {
  session_id: string;
  notes: string;
  completion_status: CompletionStatus;
  tap_feedback: string;
}

export default function TapCoachDashboard() {
  const { user, profile } = useAuth();
  const { confirmSessionForCoach, confirmStageForCoach } = useSessionProgress();
  const [assignments, setAssignments] = useState<TapAssignmentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoachId, setSelectedCoachId] = useState<string | null>(null);
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);
  const [coachSessions, setCoachSessions] = useState<CoachSessionRow[]>([]);
  const [stageSignoffs, setStageSignoffs] = useState<Set<number>>(new Set());
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [tapFeedback, setTapFeedback] = useState('');
  const [saving, setSaving] = useState(false);

  const loadAssignments = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    const { data: assignmentRows } = await supabase
      .from('tap_coach_assignments')
      .select('enrollment_id')
      .eq('tap_coach_user_id', user.id)
      .eq('active', true);

    const enrollmentIds = (assignmentRows ?? []).map((r) => r.enrollment_id);
    if (enrollmentIds.length === 0) {
      setAssignments([]);
      setLoading(false);
      return;
    }

    const { data: enrollments } = await supabase
      .from('coach_path_enrollments')
      .select('id, user_id, club_id, status')
      .in('id', enrollmentIds)
      .eq('status', 'active');

    const mapped: TapAssignmentRow[] = [];
    for (const enrollment of enrollments ?? []) {
      const [{ data: profile }, { data: club }] = await Promise.all([
        supabase.from('profiles').select('name, initials').eq('id', enrollment.user_id).single(),
        supabase.from('clubs').select('name').eq('id', enrollment.club_id).single(),
      ]);
      if (!profile || !club) continue;
      mapped.push({
        enrollment_id: enrollment.id,
        coach_user_id: enrollment.user_id,
        club_id: enrollment.club_id,
        club_name: club.name,
        coach_name: profile.name,
        coach_initials: profile.initials,
      });
    }

    setAssignments(mapped);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadAssignments();
  }, [loadAssignments]);

  const loadCoachDetail = useCallback(async (coachUserId: string, clubId: string) => {
    const [{ data: sessions }, { data: signoffs }] = await Promise.all([
      supabase
        .from('session_progress')
        .select('session_id, notes, completion_status, tap_feedback')
        .eq('user_id', coachUserId)
        .eq('club_id', clubId)
        .eq('path_key', 'coach-path'),
      supabase
        .from('coach_path_stage_signoffs')
        .select('stage_number')
        .eq('user_id', coachUserId)
        .eq('club_id', clubId),
    ]);

    setCoachSessions((sessions ?? []) as CoachSessionRow[]);
    setStageSignoffs(new Set((signoffs ?? []).map((s) => s.stage_number as number)));
  }, []);

  const selectCoach = async (coachUserId: string, clubId: string) => {
    setSelectedCoachId(coachUserId);
    setSelectedClubId(clubId);
    setActiveSessionId(null);
    setTapFeedback('');
    await loadCoachDetail(coachUserId, clubId);
  };

  const selectedAssignment = assignments.find((a) => a.coach_user_id === selectedCoachId);

  const confirmedIds = coachSessions
    .filter((s) => s.completion_status === 'tap_confirmed')
    .map((s) => s.session_id);

  const coachStage = deriveCoachStage(confirmedIds);

  const pendingSessions = Object.entries(coachPathStages).flatMap(([stageKey, stage]) =>
    stage.sessions
      .filter((session) => {
        const row = coachSessions.find((r) => r.session_id === session.id);
        return row?.completion_status === 'prepped';
      })
      .map((session) => ({ stageNum: Number(stageKey), session })),
  );

  const activeSession = activeSessionId
    ? Object.values(coachPathStages).flatMap((s) => s.sessions).find((s) => s.id === activeSessionId)
    : null;

  const activeRow = coachSessions.find((r) => r.session_id === activeSessionId);

  const handleSignOffSession = async () => {
    if (!selectedCoachId || !selectedClubId || !activeSessionId) return;
    setSaving(true);
    try {
      await confirmSessionForCoach(selectedCoachId, selectedClubId, activeSessionId, tapFeedback);
      await loadCoachDetail(selectedCoachId, selectedClubId);
      setActiveSessionId(null);
      setTapFeedback('');
    } finally {
      setSaving(false);
    }
  };

  const handleSignOffStage = async (stageNum: number) => {
    if (!selectedCoachId || !selectedClubId) return;
    setSaving(true);
    try {
      await confirmStageForCoach(selectedCoachId, selectedClubId, stageNum);
      await loadCoachDetail(selectedCoachId, selectedClubId);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-muted-foreground">Loading your coaches…</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-bold text-lm-dark">TAP Coach — My Coaches</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome {profile?.name}. Review prep notes, add debrief feedback, and sign off sessions and stages.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Assigned coaches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {assignments.length === 0 && (
              <p className="text-sm text-muted-foreground">No active assignments. LMUS will enroll coaches and assign you.</p>
            )}
            {assignments.map((a) => (
              <button
                key={a.enrollment_id}
                type="button"
                onClick={() => selectCoach(a.coach_user_id, a.club_id)}
                className={`w-full text-left rounded-xl border p-3 transition-colors ${
                  selectedCoachId === a.coach_user_id ? 'border-lm-green bg-lm-green-mid/30' : 'border-border hover:border-lm-green/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-lm-dark text-white text-xs font-bold flex items-center justify-center">
                    {a.coach_initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold truncate">{a.coach_name}</p>
                    <p className="text-xs text-muted-foreground truncate">{a.club_name}</p>
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {selectedAssignment ? (
            <>
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="text-sm">{selectedAssignment.coach_name}</CardTitle>
                    <Badge style={{ backgroundColor: COACH_STAGE_META[coachStage - 1]?.color }}>
                      Stage {coachStage}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {pendingSessions.length > 0 ? (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-lm-ink-muted uppercase tracking-wide">Awaiting your sign-off</p>
                      {pendingSessions.map(({ stageNum, session }) => (
                        <button
                          key={session.id}
                          type="button"
                          onClick={() => {
                            setActiveSessionId(session.id);
                            const row = coachSessions.find((r) => r.session_id === session.id);
                            setTapFeedback(row?.tap_feedback ?? '');
                          }}
                          className="w-full text-left rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm hover:border-amber-300"
                        >
                          <span className="font-semibold">S{stageNum}: {session.title}</span>
                          <span className="block text-xs text-muted-foreground mt-0.5">Prepped — ready for debrief</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No sessions awaiting sign-off.</p>
                  )}
                </CardContent>
              </Card>

              {activeSession && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">{activeSession.title}</CardTitle>
                    {activeSession.sessionPlan && (
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Clock className="w-3 h-3" /> {activeSession.sessionPlan.totalDuration}
                        <Users className="w-3 h-3 ml-2" /> {activeSession.sessionPlan.format}
                      </p>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">Coach prep notes</p>
                      <div className="rounded-lg border bg-lm-subtle p-3 text-sm whitespace-pre-wrap min-h-[80px]">
                        {activeRow?.notes?.trim() || 'No prep notes yet.'}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground mb-2">TAP debrief & feedback</p>
                      <Textarea
                        value={tapFeedback}
                        onChange={(e) => setTapFeedback(e.target.value)}
                        rows={5}
                        placeholder="Debrief points, coaching feedback, answers to session prompts…"
                      />
                    </div>
                    <Button
                      onClick={handleSignOffSession}
                      disabled={saving || !tapFeedback.trim()}
                      className="bg-lm-green text-lm-dark hover:bg-lm-green/90"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Sign off session
                    </Button>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Stage sign-offs</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((stageNum) => {
                    const stageSessions = coachPathStages[stageNum]?.sessions ?? [];
                    const allConfirmed = stageSessions.every((s) => confirmedIds.includes(s.id));
                    const signed = stageSignoffs.has(stageNum);
                    return (
                      <Button
                        key={stageNum}
                        variant="outline"
                        size="sm"
                        disabled={!allConfirmed || signed || saving}
                        onClick={() => handleSignOffStage(stageNum)}
                      >
                        {signed ? `Stage ${stageNum} ✓` : `Sign off Stage ${stageNum}`}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="py-12 text-center text-sm text-muted-foreground">
                Select a coach to review their pathway progress.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
