-- ============================================================
-- Tibetan Language Site — Supabase Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor → New query
-- ============================================================

-- Lessons table
create table if not exists lessons (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  level text not null check (level in ('elementary', 'intermediate', 'advanced')),
  semester text not null check (semester in ('fall', 'spring')),
  lesson_number integer not null,
  title text not null,
  description text,
  youtube_url text,
  article_url text,
  published boolean default true
);

-- Files table (for uploaded PDFs, audio recordings)
create table if not exists lesson_files (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  lesson_id uuid references lessons(id) on delete cascade,
  file_name text not null,
  file_path text not null,   -- path in Supabase Storage
  file_type text not null check (file_type in ('pdf', 'audio', 'other')),
  public_url text
);

-- Storage bucket for lesson files
insert into storage.buckets (id, name, public)
values ('lesson-files', 'lesson-files', true)
on conflict do nothing;

-- Storage policy: anyone authenticated can read
create policy "Public read access"
  on storage.objects for select
  using (bucket_id = 'lesson-files');

-- Storage policy: only service role (admin uploads) can insert
create policy "Admin upload access"
  on storage.objects for insert
  with check (bucket_id = 'lesson-files');

-- RLS: enable row level security
alter table lessons enable row level security;
alter table lesson_files enable row level security;

-- RLS policy: anyone can read published lessons
create policy "Public can read published lessons"
  on lessons for select
  using (published = true);

-- RLS policy: anyone can read lesson files
create policy "Public can read lesson files"
  on lesson_files for select
  using (true);

-- RLS policy: service role can insert/update/delete (used server-side for admin uploads)
create policy "Service role full access to lessons"
  on lessons for all
  using (auth.role() = 'service_role');

create policy "Service role full access to lesson files"
  on lesson_files for all
  using (auth.role() = 'service_role');

-- ============================================================
-- Seed data — sample lessons (optional, delete if not needed)
-- ============================================================

insert into lessons (level, semester, lesson_number, title, description, youtube_url, published) values
  ('elementary', 'fall', 1, 'Lesson 1: The Tibetan alphabet', 'Introduction to the 30 Tibetan consonants (Uchen script) and their pronunciation.', null, true),
  ('elementary', 'fall', 2, 'Lesson 2: Vowels and stacking', 'The four Tibetan vowel markers, superscribed and subscribed letters, and syllable formation.', null, true),
  ('elementary', 'fall', 3, 'Lesson 3: Basic greetings', 'Common greetings and introductions in colloquial Tibetan (Lhasa dialect).', null, true),
  ('elementary', 'spring', 1, 'Lesson 7: Everyday verbs', 'High-frequency verbs: to go, to eat, to speak, to want. Conjugation in present and past tenses.', null, true),
  ('intermediate', 'fall', 1, 'Lesson 1: Complex verb forms', 'Future and conditional verb conjugations. Honorific and humble verb registers (zhe-sa).', null, true),
  ('advanced', 'fall', 1, 'Lesson 1: Classical Tibetan grammar', 'Introduction to chöke (literary Tibetan). Key differences from colloquial.', null, true),
  ('advanced', 'fall', 2, 'Lesson 2: Reading — "Broken Wings"', 'Tibetan translation of Kahlil Gibran''s "Broken Wings" (གཤོག་པ་རལ་བ།). Close reading of opening chapters.', null, true);
