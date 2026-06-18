import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import type { Club } from '@/data/types';
import type { AppRole } from '@/lib/roles';
import { isLmusAdmin, isTapCoach } from '@/lib/roles';

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  email: string;
  title: 'Club Coach' | 'GFM';
  appRole: AppRole;
}

interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  clubs: Club[];
  activeClub: Club | null;
  setActiveClub: (club: Club) => void;
  loading: boolean;
  isRecovery: boolean;
  clearRecovery: () => void;
  isAdmin: boolean;
  isLmusAdmin: boolean;
  isTapCoach: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function normalizeName(name: string, email: string): string {
  if (!name || name === email) {
    return email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  }
  return name;
}

function normalizeInitials(initials: string, name: string): string {
  if (!initials || initials.length < 2) {
    return name.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2);
  }
  return initials;
}

async function fetchProfile(userId: string): Promise<UserProfile | null> {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (!data) return null;
  const name = normalizeName(data.name, data.email);
  const appRole = (data.app_role ?? 'club_coach') as AppRole;
  return { ...data, name, initials: normalizeInitials(data.initials, name), appRole } as UserProfile;
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
  const [isRecovery, setIsRecovery] = useState(false);

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
    let settled = false;

    const settle = async (session: Session | null) => {
      if (settled) return;
      settled = true;
      try {
        await hydrate(session);
      } catch (err) {
        console.error('Auth hydrate failed:', err);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsRecovery(true);
        setLoading(false);
        settled = true;
        return;
      }
      if (!settled) {
        settle(session);
      } else {
        hydrate(session).catch(err => console.error('Auth hydrate failed:', err));
      }
    });

    // Fallback: resolve initial session if INITIAL_SESSION event doesn't fire
    supabase.auth.getSession().then(({ data: { session } }) => settle(session));

    return () => subscription.unsubscribe();
  }, [hydrate]);

  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;
  const lmusAdmin = isLmusAdmin(profile?.appRole, user?.email, adminEmail);

  return (
    <AuthContext.Provider value={{
      user, profile, clubs, activeClub, setActiveClub, loading, isRecovery,
      clearRecovery: () => setIsRecovery(false),
      isAdmin: lmusAdmin,
      isLmusAdmin: lmusAdmin,
      isTapCoach: isTapCoach(profile?.appRole),
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
