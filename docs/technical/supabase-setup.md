# Supabase Setup For This App

## Goal

Move all questions into one hosted database so:

- the student app reads questions from Supabase
- the admin interface writes questions to Supabase
- all question data lives in one source of truth

## Why Supabase

- Works well with a static frontend hosted on GitHub Pages
- Supports browser authentication
- Supports direct browser reads and writes with Row Level Security
- Fits relational question data cleanly

Official docs used:

- JavaScript install and CDN: https://supabase.com/docs/reference/javascript/installing
- JavaScript client initialization: https://supabase.com/docs/reference/javascript/v1/initializing
- JavaScript data methods: https://supabase.com/docs/reference/javascript/introduction
- Row Level Security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Auth overview: https://supabase.com/docs/guides/auth

## Recommended Database Design

Use one `questions` table with `options` stored as `jsonb`.

This is the best MVP tradeoff because:

- the current app already uses an array of answer options
- the admin form edits all options together
- the student app can map database rows into the existing question shape easily

## Files Added

- [001_questions_schema.sql](/mnt/d/Chandani/codex/ex2/supabase/001_questions_schema.sql)
- [002_rls_policies.sql](/mnt/d/Chandani/codex/ex2/supabase/002_rls_policies.sql)
- [003_seed_example.sql](/mnt/d/Chandani/codex/ex2/supabase/003_seed_example.sql)

## Step 1: Create a Supabase Project

In Supabase:

1. Create a new project
2. Copy the project URL
3. Copy the anon key
4. Enable Email/Password auth for admin login

The browser app should only use the project URL and anon key. Never expose the service role key in the browser.

## Step 2: Run the SQL

In the Supabase SQL Editor, run these files in order:

1. `supabase/001_questions_schema.sql`
2. `supabase/002_rls_policies.sql`
3. `supabase/003_seed_example.sql` if you want a sample record

## Step 3: Create the First Admin User

1. In Supabase Auth, create a user with email and password
2. Copy that user id
3. Insert it into `admin_profiles`

Example:

```sql
insert into public.admin_profiles (user_id, role)
values ('YOUR_AUTH_USER_UUID', 'admin');
```

## Step 4: Move Existing Built-In Questions

The current app still has generated questions in [content.js](/mnt/d/Chandani/codex/ex2/src/content.js).

Recommended migration:

1. Export or generate those questions into JSON
2. Transform them into `questions` rows
3. Bulk insert into Supabase
4. Switch the app to load from Supabase instead of local generated content

## Step 5: Frontend Connection Plan

### Student App

- On load, fetch published questions:

```js
const { data, error } = await supabase
  .from('questions')
  .select('*')
  .eq('is_published', true);
```

### Admin App

- Sign in with email/password
- List all questions
- Insert new rows
- Update rows by id
- Delete rows by id

Examples:

```js
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

```js
const { data, error } = await supabase
  .from('questions')
  .insert(payload)
  .select();
```

```js
const { data, error } = await supabase
  .from('questions')
  .update(payload)
  .eq('id', questionId)
  .select();
```

```js
const { error } = await supabase
  .from('questions')
  .delete()
  .eq('id', questionId);
```

## Step 6: Recommended Repo Changes Next

This repository now includes the frontend wiring for:

1. Supabase client setup in the browser
2. Student question loading from the database
3. Admin create, update, delete, and import/export flow using the database
4. Local fallback only when Supabase config is missing

## Suggested Runtime Config

For GitHub Pages, use a small runtime config file like:

```js
window.APP_CONFIG = {
  supabaseUrl: "https://YOUR_PROJECT.supabase.co",
  supabaseAnonKey: "YOUR_ANON_KEY"
};
```

Then load it before the app script.

This avoids hardcoding secrets into source files while keeping deployment simple for a static site.

In this repo:

- copy [public-config.example.js](/mnt/d/Chandani/codex/ex2/public-config.example.js)
- create or update [public-config.js](/mnt/d/Chandani/codex/ex2/public-config.js)
- push that file with your project URL and anon key
