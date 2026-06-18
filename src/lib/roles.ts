export type AppRole = 'club_coach' | 'gfm' | 'tap_coach' | 'lmus_admin';

export type CompletionStatus = 'not_started' | 'prepped' | 'tap_confirmed';

export function isLmusAdmin(
  appRole: AppRole | undefined,
  email: string | undefined,
  adminEmail: string | undefined,
): boolean {
  if (appRole === 'lmus_admin') return true;
  return !!adminEmail && !!email && email === adminEmail;
}

export function isTapCoach(appRole: AppRole | undefined): boolean {
  return appRole === 'tap_coach';
}
