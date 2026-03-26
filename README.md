# math_game_sinhala

Sinhala primary math practice MVP built as a static web app.

The app now includes:

- student math practice flow
- parent progress dashboard
- admin question management interface
- Supabase migration preparation files

## Run

```bash
npm start
```

Open `http://localhost:4173`.

Admin access:

- Parent PIN: `1234`
- Admin PIN: `4321`

## Supabase Preparation

Prepared SQL and setup docs are available in:

- [supabase/001_questions_schema.sql](/mnt/d/Chandani/codex/ex2/supabase/001_questions_schema.sql)
- [supabase/002_rls_policies.sql](/mnt/d/Chandani/codex/ex2/supabase/002_rls_policies.sql)
- [docs/technical/supabase-setup.md](/mnt/d/Chandani/codex/ex2/docs/technical/supabase-setup.md)

Example runtime config file:

- [public-config.example.js](/mnt/d/Chandani/codex/ex2/public-config.example.js)
- [public-config.js](/mnt/d/Chandani/codex/ex2/public-config.js)

## Check content

```bash
npm run check
```
