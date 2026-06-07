-- Jalankan di Supabase Dashboard → SQL Editor → New Query
-- Menambah kolom caption, credit, dan foto inline ke tabel articles

alter table articles
  add column if not exists hero_caption  text,
  add column if not exists hero_credit   text,
  add column if not exists is_verified   boolean default false,
  add column if not exists body_images   jsonb default '[]';
