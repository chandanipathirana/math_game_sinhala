create extension if not exists pgcrypto;

create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('admin')),
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id text primary key,
  grade integer not null check (grade in (1, 2, 3)),
  topic text not null check (topic in ('number', 'counting', 'addition', 'subtraction', 'comparison', 'word')),
  difficulty text not null check (difficulty in ('easy', 'medium', 'hard')),
  prompt text not null,
  audio_text text,
  correct_answer text not null,
  options jsonb not null,
  visual_type text,
  visual_value text,
  is_published boolean not null default true,
  source text not null default 'admin' check (source in ('seed', 'admin')),
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint options_is_array check (jsonb_typeof(options) = 'array')
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists questions_set_updated_at on public.questions;

create trigger questions_set_updated_at
before update on public.questions
for each row
execute function public.set_updated_at();

create index if not exists questions_grade_topic_idx
  on public.questions (grade, topic);

create index if not exists questions_published_idx
  on public.questions (is_published);

create index if not exists questions_created_by_idx
  on public.questions (created_by);
