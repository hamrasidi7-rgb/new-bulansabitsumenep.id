-- ============================================================
-- Portal Bulan Sabit Sumenep — Skema Lengkap + RLS
-- Jalankan di: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Aktifkan ekstensi uuid (biasanya sudah aktif di Supabase)
create extension if not exists "pgcrypto";


-- ╔══════════════════════════════════════════════╗
-- ║  1. TABEL articles                           ║
-- ║  Menampung: Berita Kesehatan, Aksi           ║
-- ║  Kemanusiaan, Dokter Menulis                 ║
-- ╚══════════════════════════════════════════════╝

create table if not exists public.articles (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        unique not null,
  -- 'berita-kesehatan' | 'aksi-kemanusiaan' | 'dokter-menulis'
  channel      text        not null,
  -- slug sub-kanal (null untuk dokter-menulis)
  subchannel   text,
  excerpt      text,
  content      text        not null default '',
  cover_url    text,
  author_name  text,          -- khusus kolom "Dokter Menulis"
  tags         text[]      not null default '{}',
  is_published boolean     not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now()
);

-- Indeks untuk filter publik yang paling sering dipakai
create index if not exists idx_articles_channel
  on public.articles (channel, subchannel, is_published, published_at desc);

create index if not exists idx_articles_slug
  on public.articles (slug);

-- RLS articles
alter table public.articles enable row level security;

-- SELECT publik: hanya artikel yang sudah diterbitkan
create policy "articles_select_published"
  on public.articles for select
  using (is_published = true);

-- INSERT/UPDATE/DELETE: hanya pengguna terotentikasi (admin)
create policy "articles_insert_admin"
  on public.articles for insert
  with check (auth.role() = 'authenticated');

create policy "articles_update_admin"
  on public.articles for update
  using (auth.role() = 'authenticated');

create policy "articles_delete_admin"
  on public.articles for delete
  using (auth.role() = 'authenticated');


-- ╔══════════════════════════════════════════════╗
-- ║  2. TABEL galleries (album foto)             ║
-- ╚══════════════════════════════════════════════╝

create table if not exists public.galleries (
  id           uuid        primary key default gen_random_uuid(),
  title        text        not null,
  slug         text        unique not null,
  description  text,
  cover_url    text,
  event_date   date,
  -- 'donor-darah' | 'bakti-sosial' | 'tanggap-bencana' | 'kegiatan' | 'lainnya'
  category     text        not null default 'lainnya',
  is_published boolean     not null default true,
  sort_order   int         not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists idx_galleries_published
  on public.galleries (is_published, sort_order, created_at desc);

create index if not exists idx_galleries_category
  on public.galleries (category, is_published);

alter table public.galleries enable row level security;

create policy "galleries_select_published"
  on public.galleries for select
  using (is_published = true);

create policy "galleries_insert_admin"
  on public.galleries for insert
  with check (auth.role() = 'authenticated');

create policy "galleries_update_admin"
  on public.galleries for update
  using (auth.role() = 'authenticated');

create policy "galleries_delete_admin"
  on public.galleries for delete
  using (auth.role() = 'authenticated');


-- ╔══════════════════════════════════════════════╗
-- ║  3. TABEL gallery_photos                     ║
-- ╚══════════════════════════════════════════════╝

create table if not exists public.gallery_photos (
  id           uuid        primary key default gen_random_uuid(),
  gallery_id   uuid        not null references public.galleries (id) on delete cascade,
  image_url    text        not null,  -- path di Supabase Storage bucket 'gallery'
  caption      text,
  sort_order   int         not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists idx_gallery_photos_gallery
  on public.gallery_photos (gallery_id, sort_order);

alter table public.gallery_photos enable row level security;

-- Foto mengikuti visibilitas album induknya
create policy "gallery_photos_select"
  on public.gallery_photos for select
  using (
    exists (
      select 1 from public.galleries g
      where g.id = gallery_id and g.is_published = true
    )
  );

create policy "gallery_photos_insert_admin"
  on public.gallery_photos for insert
  with check (auth.role() = 'authenticated');

create policy "gallery_photos_update_admin"
  on public.gallery_photos for update
  using (auth.role() = 'authenticated');

create policy "gallery_photos_delete_admin"
  on public.gallery_photos for delete
  using (auth.role() = 'authenticated');


-- ╔══════════════════════════════════════════════╗
-- ║  4. TABEL videos (Video Story multi-platform)║
-- ╚══════════════════════════════════════════════╝

create table if not exists public.videos (
  id             uuid        primary key default gen_random_uuid(),
  title          text        not null,
  video_url      text        not null,  -- URL asli yang ditempel admin
  -- 'youtube' | 'instagram' | 'tiktok' | 'facebook'
  platform       text        not null,
  video_id       text,                  -- id hasil ekstraksi (terutama YouTube)
  thumbnail_url  text,                  -- auto untuk YouTube; manual untuk lainnya
  description    text,
  sort_order     int         not null default 0,
  is_published   boolean     not null default true,
  created_at     timestamptz not null default now()
);

create index if not exists idx_videos_published
  on public.videos (is_published, sort_order, created_at desc);

alter table public.videos enable row level security;

create policy "videos_select_published"
  on public.videos for select
  using (is_published = true);

create policy "videos_insert_admin"
  on public.videos for insert
  with check (auth.role() = 'authenticated');

create policy "videos_update_admin"
  on public.videos for update
  using (auth.role() = 'authenticated');

create policy "videos_delete_admin"
  on public.videos for delete
  using (auth.role() = 'authenticated');


-- ╔══════════════════════════════════════════════╗
-- ║  5. STORAGE BUCKETS                          ║
-- ╚══════════════════════════════════════════════╝

-- Bucket 'gallery' — foto galeri
-- Bucket 'media'   — cover artikel & thumbnail video

-- Catatan: buat bucket melalui Supabase Dashboard > Storage > New Bucket
-- dengan pengaturan:
--   gallery : Public = true
--   media   : Public = true
--
-- Atau gunakan SQL berikut (membutuhkan extension storage):

insert into storage.buckets (id, name, public)
  values ('gallery', 'gallery', true)
  on conflict (id) do nothing;

insert into storage.buckets (id, name, public)
  values ('media', 'media', true)
  on conflict (id) do nothing;

-- Policy Storage: baca publik
create policy "gallery_public_read"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

-- Policy Storage: write hanya admin
create policy "gallery_admin_write"
  on storage.objects for insert
  with check (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "gallery_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'gallery' and auth.role() = 'authenticated');

create policy "media_admin_write"
  on storage.objects for insert
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

create policy "media_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'media' and auth.role() = 'authenticated');
