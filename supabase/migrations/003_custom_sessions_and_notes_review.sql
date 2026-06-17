-- user-defined sessions for coach-path and development-pathway
create table if not exists public.custom_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  club_id uuid references public.clubs(id) on delete cascade not null,
  path_key text not null check (path_key in ('coach-path', 'development-pathway')),
  stage_number int not null check (stage_number between 1 and 6),
  title text not null,
  subtitle text not null default '',
  duration text not null default '30 min',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.custom_sessions enable row level security;

create policy "club members can read custom_sessions"
  on public.custom_sessions for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

create policy "users can insert own custom_sessions"
  on public.custom_sessions for insert with check (
    user_id = auth.uid()
    and club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );

create policy "users can update own custom_sessions"
  on public.custom_sessions for update using (user_id = auth.uid());

create policy "users can delete own custom_sessions"
  on public.custom_sessions for delete using (user_id = auth.uid());

-- allow club members to read session notes for coach review within their club
create policy "club members can read club session_progress"
  on public.session_progress for select using (
    club_id in (select club_id from public.user_clubs where user_id = auth.uid())
  );
