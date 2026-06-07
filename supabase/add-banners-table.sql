-- Jalankan di Supabase Dashboard → SQL Editor → New Query

create table if not exists banners (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  position    text not null,   -- 'leaderboard' | 'strip' | 'rectangle'
  type        text not null default 'image',  -- 'image' | 'ucapan'
  image_url   text,
  link_url    text,
  content     text,            -- teks ucapan/pengumuman
  bg_color    text default '#dc2626',
  is_active   boolean default true,
  sort_order  int default 0,
  starts_at   timestamptz,
  ends_at     timestamptz,
  created_at  timestamptz default now()
);

alter table banners enable row level security;

create policy "public read banners"
  on banners for select using (is_active = true);
