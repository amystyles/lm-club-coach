-- store full session framework (coach role, brief, plan, prompts) as JSON
alter table public.custom_sessions
  add column if not exists session_data jsonb not null default '{}';
