-- Jalankan di Supabase Dashboard → SQL Editor → New Query

alter table articles add column if not exists view_count int default 0;

-- Fungsi RPC: increment view (security definer = bypass RLS)
create or replace function increment_article_view(p_slug text)
returns void as $$
  update articles
  set view_count = coalesce(view_count, 0) + 1
  where slug = p_slug and is_published = true;
$$ language sql security definer;

grant execute on function increment_article_view(text) to anon;
