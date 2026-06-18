import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useCoachPathEnrollment } from '@/context/CoachPathEnrollmentContext';
import { fetchClubCoaches, type ClubCoachMember } from '@/lib/club-coaches';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface TapCoachOption {
  id: string;
  name: string;
}

interface EnrollmentRow {
  id: string;
  user_id: string;
  club_id: string;
  status: string;
  coach_name: string;
  club_name: string;
  tap_name: string | null;
}

export default function LmusAdminPanel() {
  const { user, activeClub, clubs } = useAuth();
  const { refresh: refreshEnrollment } = useCoachPathEnrollment();
  const [clubCoaches, setClubCoaches] = useState<ClubCoachMember[]>([]);
  const [tapCoaches, setTapCoaches] = useState<TapCoachOption[]>([]);
  const [enrollments, setEnrollments] = useState<EnrollmentRow[]>([]);
  const [selectedCoachId, setSelectedCoachId] = useState('');
  const [selectedTapId, setSelectedTapId] = useState('');
  const [selectedClubId, setSelectedClubId] = useState(activeClub?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const loadData = useCallback(async () => {
    if (!selectedClubId) return;
    setLoading(true);

    const [coaches, { data: tapRows }, { data: enrollmentRows }] = await Promise.all([
      fetchClubCoaches(selectedClubId),
      supabase.from('profiles').select('id, name').eq('app_role', 'tap_coach'),
      supabase
        .from('coach_path_enrollments')
        .select('id, user_id, club_id, status')
        .eq('club_id', selectedClubId),
    ]);

    setClubCoaches(coaches);
    setTapCoaches((tapRows ?? []) as TapCoachOption[]);

    const rows: EnrollmentRow[] = [];
    for (const row of enrollmentRows ?? []) {
      const { data: assignment } = await supabase
        .from('tap_coach_assignments')
        .select('tap_coach_user_id')
        .eq('enrollment_id', row.id)
        .eq('active', true)
        .maybeSingle();

      const { data: coachProfile } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', row.user_id)
        .single();

      const { data: club } = await supabase
        .from('clubs')
        .select('name')
        .eq('id', row.club_id)
        .single();

      let tapName: string | null = null;
      if (assignment?.tap_coach_user_id) {
        const { data: tapProfile } = await supabase
          .from('profiles')
          .select('name')
          .eq('id', assignment.tap_coach_user_id)
          .single();
        tapName = tapProfile?.name ?? null;
      }

      rows.push({
        id: row.id,
        user_id: row.user_id,
        club_id: row.club_id,
        status: row.status,
        coach_name: coachProfile?.name ?? 'Unknown',
        club_name: club?.name ?? 'Unknown',
        tap_name: tapName,
      });
    }
    setEnrollments(rows);
    setLoading(false);
  }, [selectedClubId]);

  useEffect(() => {
    if (activeClub && !selectedClubId) setSelectedClubId(activeClub.id);
  }, [activeClub, selectedClubId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleEnroll = async () => {
    if (!user || !selectedClubId || !selectedCoachId || !selectedTapId) {
      setMessage('Select a club, coach, and TAP Coach.');
      return;
    }
    setMessage('');
    setLoading(true);

    const { data: enrollment, error: enrollError } = await supabase
      .from('coach_path_enrollments')
      .upsert(
        {
          user_id: selectedCoachId,
          club_id: selectedClubId,
          enrolled_by: user.id,
          status: 'active',
        },
        { onConflict: 'user_id,club_id' },
      )
      .select('id')
      .single();

    if (enrollError || !enrollment) {
      setMessage(enrollError?.message ?? 'Enrollment failed.');
      setLoading(false);
      return;
    }

    const { error: assignError } = await supabase.from('tap_coach_assignments').upsert(
      {
        enrollment_id: enrollment.id,
        tap_coach_user_id: selectedTapId,
        assigned_by: user.id,
        active: true,
      },
      { onConflict: 'enrollment_id' },
    );

    if (assignError) {
      setMessage(assignError.message);
    } else {
      setMessage('Coach enrolled and TAP Coach assigned.');
      setSelectedCoachId('');
      setSelectedTapId('');
      await loadData();
      await refreshEnrollment();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-lm-dark">LMUS Admin — TAP AP Enrollment</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Enroll a Club Coach or GFM in the Club Coach Path and assign their TAP Coach.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">New enrollment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Club</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedClubId}
              onChange={(e) => setSelectedClubId(e.target.value)}
            >
              {clubs.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Coach / GFM to enroll</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedCoachId}
              onChange={(e) => setSelectedCoachId(e.target.value)}
            >
              <option value="">Select…</option>
              {clubCoaches.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.title})</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>TAP Coach</Label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={selectedTapId}
              onChange={(e) => setSelectedTapId(e.target.value)}
            >
              <option value="">Select…</option>
              {tapCoaches.map((t) => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            {tapCoaches.length === 0 && (
              <p className="text-xs text-muted-foreground">Create TAP Coach accounts via Add Coach (TAP Coach role).</p>
            )}
          </div>

          <Button onClick={handleEnroll} disabled={loading} className="bg-lm-green text-lm-dark hover:bg-lm-green/90">
            Enroll & assign TAP
          </Button>
          {message && <p className="text-sm text-lm-dark">{message}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Active enrollments — {clubs.find((c) => c.id === selectedClubId)?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {enrollments.length === 0 && (
            <p className="text-sm text-muted-foreground">No enrollments for this club yet.</p>
          )}
          {enrollments.map((e) => (
            <div key={e.id} className="flex items-center justify-between gap-3 rounded-lg border p-3">
              <div>
                <p className="text-sm font-semibold">{e.coach_name}</p>
                <p className="text-xs text-muted-foreground">
                  TAP: {e.tap_name ?? 'Unassigned'}
                </p>
              </div>
              <Badge variant={e.status === 'active' ? 'default' : 'secondary'}>{e.status}</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
