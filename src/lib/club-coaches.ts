import { supabase } from '@/lib/supabase';

export interface ClubCoachMember {
  id: string;
  name: string;
  initials: string;
  title: 'Club Coach' | 'GFM';
}

export async function fetchClubCoaches(clubId: string): Promise<ClubCoachMember[]> {
  const { data: memberships, error: memError } = await supabase
    .from('user_clubs')
    .select('user_id')
    .eq('club_id', clubId);

  if (memError || !memberships?.length) return [];

  const userIds = memberships.map((m) => m.user_id);
  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, name, initials, title')
    .in('id', userIds);

  return (profiles ?? []).map((p) => ({
    id: p.id,
    name: p.name,
    initials: p.initials,
    title: p.title as 'Club Coach' | 'GFM',
  }));
}
