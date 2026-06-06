import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { getChannelBySlug, subchannelHref } from '@/lib/channels'
import VerifiedBadge from '@/components/article/VerifiedBadge'
import ShareButtons from '@/components/article/ShareButtons'
import AiToolbar from '@/components/ai/AiToolbar'
import AiSummary from '@/components/ai/AiSummary'
import AskArticle from '@/components/ai/AskArticle'
import WhatsAppCard from '@/components/ui/WhatsAppCard'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await supabase
    .from('articles')
    .select('title,excerpt,cover_url,channel,subchannel,published_at,author_name,is_verified')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (!data) return {}
  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: data.title,
      description: data.excerpt ?? undefined,
      type: 'article',
      publishedTime: data.published_at,
      authors: data.author_name ? [data.author_name] : undefined,
      images: data.cover_url ? [{ url: data.cover_url, width: 1200, height: 630 }] : [],
    },
  }
}

async function fetchArticle(slug) {
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  return data
}

async function fetchRelated(channel, subchannel, currentSlug) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,cover_url,published_at')
    .eq('channel', channel)
    .eq('is_published', true)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(3)
  return data ?? []
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function estimateMinutes(html = '') {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params
  const article = await fetchArticle(slug)
  if (!article) notFound()

  const related = await fetchRelated(article.channel, article.subchannel, slug)
  const ch = getChannelBySlug(article.channel)

  const articleText = stripHtml(article.content)
  const durationMinutes = estimateMinutes(article.content)

  return (
    <div className="mx-auto w-full max-w-2xl pb-20 pt-0">

      {/* ── Cover ──────────────────────────────────────────────── */}
      {article.cover_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-b-2xl">
          <Image src={article.cover_url} alt={article.title} fill
            className="object-cover" sizes="(max-width:640px) 100vw, 640px" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* ── Cover caption ──────────────────────────────────────── */}
      {(article.hero_caption || article.hero_credit) && (
        <p className="px-4 pt-1.5 text-[11px] italic text-[var(--muted)]">
          {article.hero_caption}
          {article.hero_caption && article.hero_credit && ' '}
          {article.hero_credit && `(Foto: ${article.hero_credit})`}
        </p>
      )}

      <div className="px-4 pt-4">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-[var(--muted)]">
          {ch && (
            <>
              <Link href={ch.href} className="hover:text-[var(--accent-red)]">{ch.label}</Link>
              {article.subchannel && (
                <>
                  <span aria-hidden="true">›</span>
                  <Link href={subchannelHref(article.channel, article.subchannel)}
                    className="hover:text-[var(--accent-red)]">
                    {ch.subchannels.find((s) => s.slug === article.subchannel)?.label}
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Judul */}
        <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
          {article.title}
        </h1>

        {/* Verifikasi + Meta */}
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {article.is_verified && <VerifiedBadge size="sm" />}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted)]">
            {article.author_name && (
              <span className="font-medium text-[var(--foreground)]">{article.author_name}</span>
            )}
            {article.author_name && <span>·</span>}
            <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
          </div>
        </div>

        {/* Share (atas) */}
        <div className="mt-4 pb-4 border-b border-[var(--border)]">
          <ShareButtons title={article.title} slug={slug} />
        </div>

        {/* AI Toolbar */}
        <div className="mt-4">
          <AiToolbar
            articleText={articleText}
            durationMinutes={durationMinutes}
            articleSlug={slug}
          />
        </div>

        {/* AI Summary */}
        <div className="mt-4">
          <AiSummary />
        </div>

        {/* Konten artikel */}
        <article
          className="article-body prose prose-sm mt-6 max-w-none
            prose-headings:font-serif prose-headings:text-[var(--foreground)]
            prose-p:text-[var(--foreground)] prose-a:text-[var(--accent-red)]"
          dangerouslySetInnerHTML={{ __html: article.content }}
          aria-label={`Isi artikel: ${article.title}`}
        />

        {/* Tag */}
        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Share (bawah) */}
        <div className="mt-6 pt-4 border-t border-[var(--border)]">
          <ShareButtons title={article.title} slug={slug} />
        </div>

        {/* WhatsApp */}
        <div className="mt-6">
          <WhatsAppCard />
        </div>

        {/* Artikel terkait */}
        {related.length > 0 && (
          <section className="mt-8" aria-labelledby="related-heading">
            <h2 id="related-heading"
              className="mb-4 font-serif text-lg font-bold text-[var(--foreground)]">
              Baca Juga
            </h2>
            <div className="space-y-0">
              {related.map((r) => (
                <Link key={r.id} href={`/artikel/${r.slug}`}
                  className="group flex items-start gap-3 border-b border-[var(--border)] py-3 last:border-0">
                  {r.cover_url && (
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={r.cover_url} alt="" fill className="object-cover" sizes="80px" />
                    </div>
                  )}
                  <p className="font-serif text-sm font-semibold leading-snug
                    text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tanya AI */}
        <div className="mt-6">
          <AskArticle articleTitle={article.title} articleSlug={slug} />
        </div>

        {/* Kembali */}
        <div className="mt-6 text-center">
          <Link href="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl
              border border-[var(--border)] px-5 py-2.5 text-sm font-medium
              text-[var(--muted)] transition hover:text-[var(--foreground)]">
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
