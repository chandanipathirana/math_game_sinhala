insert into public.questions (
  id,
  grade,
  topic,
  difficulty,
  prompt,
  audio_text,
  correct_answer,
  options,
  visual_type,
  visual_value,
  is_published,
  source
)
values
(
  'seed-addition-1',
  1,
  'addition',
  'easy',
  '2 + 3 = ?',
  'දෙකයි තුනයි එකතු කළාම කීයක්ද?',
  '5',
  '[
    {"value":"3","label":"3"},
    {"value":"4","label":"4"},
    {"value":"5","label":"5"},
    {"value":"6","label":"6"}
  ]'::jsonb,
  'emoji',
  '🟡 🟡 + 🔵 🔵 🔵',
  true,
  'seed'
);
