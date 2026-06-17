-- trust_overrides for Teaching Trust Map assessments
alter table public.instructors
  add column if not exists trust_overrides jsonb not null default '{}';

-- per-user session completion and notes (coach path + development pathway)
create table if not exists public.session_progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  club_id uuid references public.clubs(id) on delete cascade not null,
  path_key text not null check (path_key in ('coach-path', 'development-pathway')),
  session_id text not null,
  completed boolean not null default false,
  notes text not null default '',
  updated_at timestamptz not null default now(),
  unique (user_id, club_id, path_key, session_id)
);

alter table public.session_progress enable row level security;

create policy "users can read own session_progress"
  on public.session_progress for select using (user_id = auth.uid());

create policy "users can insert own session_progress"
  on public.session_progress for insert with check (user_id = auth.uid());

create policy "users can update own session_progress"
  on public.session_progress for update using (user_id = auth.uid());

create policy "users can delete own session_progress"
  on public.session_progress for delete using (user_id = auth.uid());

-- allow deleting development notes authored in club
create policy "club members can delete development_notes"
  on public.development_notes for delete using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
