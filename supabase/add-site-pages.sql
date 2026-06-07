-- Jalankan di Supabase Dashboard → SQL Editor → New Query

-- Tabel pengaturan global (kontak, sosial media)
create table if not exists site_settings (
  key         text primary key,
  value       text default '',
  label       text,
  sort_order  int default 0
);

insert into site_settings (key, label, sort_order) values
  ('alamat',        'Alamat Kantor',      1),
  ('email_redaksi', 'Email Redaksi',      2),
  ('email_iklan',   'Email Iklan',        3),
  ('whatsapp',      'Nomor WhatsApp',     4),
  ('facebook_url',  'URL Facebook',       10),
  ('instagram_url', 'URL Instagram',      11),
  ('twitter_url',   'URL X (Twitter)',    12),
  ('youtube_url',   'URL YouTube',        13),
  ('tiktok_url',    'URL TikTok',         14)
on conflict (key) do nothing;

alter table site_settings enable row level security;
create policy "public read site_settings"  on site_settings for select using (true);
create policy "admin write site_settings"  on site_settings for all    using (true) with check (true);

-- Tabel konten halaman footer
create table if not exists site_pages (
  slug        text primary key,
  content     jsonb not null default '{}',
  updated_at  timestamptz default now()
);

alter table site_pages enable row level security;
create policy "public read site_pages"  on site_pages for select using (true);
create policy "admin write site_pages"  on site_pages for all    using (true) with check (true);
