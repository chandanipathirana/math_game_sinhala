alter table public.admin_profiles enable row level security;
alter table public.questions enable row level security;

drop policy if exists "admins can read own profile" on public.admin_profiles;
create policy "admins can read own profile"
on public.admin_profiles
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "published questions are readable by everyone" on public.questions;
create policy "published questions are readable by everyone"
on public.questions
for select
to anon, authenticated
using (is_published = true);

drop policy if exists "admins can read all questions" on public.questions;
create policy "admins can read all questions"
on public.questions
for select
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = auth.uid()
      and ap.role = 'admin'
  )
);

drop policy if exists "admins can insert questions" on public.questions;
create policy "admins can insert questions"
on public.questions
for insert
to authenticated
with check (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = auth.uid()
      and ap.role = 'admin'
  )
);

drop policy if exists "admins can update questions" on public.questions;
create policy "admins can update questions"
on public.questions
for update
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = auth.uid()
      and ap.role = 'admin'
  )
)
with check (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = auth.uid()
      and ap.role = 'admin'
  )
);

drop policy if exists "admins can delete questions" on public.questions;
create policy "admins can delete questions"
on public.questions
for delete
to authenticated
using (
  exists (
    select 1
    from public.admin_profiles ap
    where ap.user_id = auth.uid()
      and ap.role = 'admin'
  )
);
