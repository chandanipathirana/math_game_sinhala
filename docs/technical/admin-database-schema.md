# Admin Question Data Model

## Recommended Production Tables

### `admin_users`

- `id`
- `email`
- `password_hash` or auth-provider identity
- `role`
- `created_at`

### `questions`

- `id`
- `grade`
- `topic`
- `difficulty`
- `prompt`
- `audio_text`
- `correct_answer`
- `source`
- `created_by`
- `created_at`
- `updated_at`

### `question_options`

- `id`
- `question_id`
- `option_value`
- `option_label`
- `sort_order`

### `question_visuals`

- `id`
- `question_id`
- `visual_type`
- `visual_value`

## MVP Local Storage Shape

For this repository, the admin interface stores custom questions in browser local storage as an array of question objects following the question schema.

Storage key:

- `sinhala-math-admin-questions`

## Current Supabase-Ready Shape

The prepared Supabase schema uses:

- `questions.id` as `text`
- `questions.options` as `jsonb`
- `created_by` linked to `auth.users`

Text ids are used intentionally so the current app question ids can move into the database without UUID remapping.

## Why Separate Built-In and Admin Questions

- Built-in generated questions give the app a reliable starting content set
- Admin questions allow content managers to extend and override practice content
- Keeping them separate makes export/import easier during the MVP phase
