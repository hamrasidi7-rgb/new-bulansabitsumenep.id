-- Jalankan di Supabase Dashboard → SQL Editor → New Query

alter table articles
  add column if not exists author_role  text,
  add column if not exists author_photo text;
