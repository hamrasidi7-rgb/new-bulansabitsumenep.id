-- ============================================================
-- Schema Bulan Sabit Sumenep — Supabase
-- Jalankan file ini di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Hapus tabel lama jika ada (urutan penting: child dulu sebelum parent)
drop table if exists gallery_photos cascade;
drop table if exists galleries      cascade;
drop table if exists videos         cascade;
drop table if exists articles       cascade;

-- ── TABEL ARTIKEL ────────────────────────────────────────────────────────────
-- Mencakup: berita-kesehatan, aksi-kemanusiaan, dokter-menulis

create table if not exists articles (
  id            text primary key,
  title         text not null,
  slug          text not null unique,
  channel       text not null,        -- 'berita-kesehatan' | 'aksi-kemanusiaan' | 'dokter-menulis'
  subchannel    text,                  -- null untuk dokter-menulis
  excerpt       text not null,
  content       text not null,        -- HTML
  cover_url     text,
  author_name   text,
  tags          text[] default '{}',
  is_published  boolean default true,
  published_at  timestamptz not null default now(),
  created_at    timestamptz default now()
);

create index if not exists articles_channel_idx      on articles (channel);
create index if not exists articles_subchannel_idx   on articles (channel, subchannel);
create index if not exists articles_published_at_idx on articles (published_at desc);

-- ── TABEL VIDEO ──────────────────────────────────────────────────────────────

create table if not exists videos (
  id            text primary key,
  title         text not null,
  platform      text not null,        -- 'youtube' | 'instagram' | 'tiktok'
  video_id      text not null,
  video_url     text not null,
  thumbnail_url text,
  description   text,
  is_published  boolean default true,
  sort_order    int default 0,
  created_at    timestamptz default now()
);

create index if not exists videos_sort_idx on videos (sort_order asc);

-- ── TABEL GALERI ─────────────────────────────────────────────────────────────

create table if not exists galleries (
  id            text primary key,
  title         text not null,
  slug          text not null unique,
  description   text,
  category      text,                 -- 'donor-darah' | 'bakti-sosial' | 'tanggap-bencana' | 'kegiatan'
  cover_url     text,
  event_date    date,
  is_published  boolean default true,
  sort_order    int default 0,
  created_at    timestamptz default now()
);

create index if not exists galleries_sort_idx on galleries (sort_order asc);

-- ── TABEL FOTO GALERI ────────────────────────────────────────────────────────

create table if not exists gallery_photos (
  id            text primary key,
  gallery_id    text not null references galleries (id) on delete cascade,
  image_url     text not null,
  caption       text,
  sort_order    int default 0,
  created_at    timestamptz default now()
);

create index if not exists gallery_photos_gallery_idx on gallery_photos (gallery_id, sort_order asc);

-- ── ROW LEVEL SECURITY ───────────────────────────────────────────────────────
-- Semua tabel: baca publik, tulis hanya dari server (service_role)

alter table articles       enable row level security;
alter table videos         enable row level security;
alter table galleries      enable row level security;
alter table gallery_photos enable row level security;

create policy "public read articles"
  on articles for select using (is_published = true);

create policy "public read videos"
  on videos for select using (is_published = true);

create policy "public read galleries"
  on galleries for select using (is_published = true);

create policy "public read gallery_photos"
  on gallery_photos for select using (true);
