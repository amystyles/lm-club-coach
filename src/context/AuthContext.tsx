import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Club } from '@/data/types';

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  title: 'Club Coach' | 'GFM';
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  clubs: Club[];
  activeClub: Club | null;
  setActiveClub: (club: Club) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  return data as UserProfile | null;
}

async function fetchClubs(userId: string): Promise<Club[]> {
  const { data } = await supabase
    .from('user_clubs')
    .select('clubs(*)')
    .eq('user_id', userId);
  return (data ?? []).map(({ clubs: c }: any) => ({
    id: c.id,
    name: c.name,
    region: c.region,
    deploymentPath: c.deployment_path,
    gfmName: c.gfm_name,
    instructorCount: 0,
    coachCount: 0,
  }));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeClub, setActiveClub] = useState<Club | null>(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async function hydrate(session: Session | null) {
    if (!session) {
      setUser(null);
      setProfile(null);
      setClubs([]);
      setActiveClub(null);
      return;
    }
    setUser(session.user);
    const [p, c] = await Promise.all([
      fetchProfile(session.user.id),
      fetchClubs(session.user.id),
    ]);
    setProfile(p);
    setClubs(c);
    setActiveClub(prev => prev ?? (c.length === 1 ? c[0] : null));
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      await hydrate(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await hydrate(session);
    });

    return () => subscription.unsubscribe();
  }, [hydrate]);

  return (
    <AuthContext.Provider value={{ user, profile, clubs, activeClub, setActiveClub, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
