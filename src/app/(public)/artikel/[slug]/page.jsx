import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { getChannelBySlug } from '@/lib/channels'
import { getArticleBySlug, getAuthorById, getRecentArticles } from '@/data/articles'
import VerifiedBadge from '@/components/article/VerifiedBadge'
import ArticleImage from '@/components/article/ArticleImage'
import ShareButtons from '@/components/article/ShareButtons'
import AiToolbar from '@/components/ai/AiToolbar'
import AiSummary from '@/components/ai/AiSummary'
import AskArticle from '@/components/ai/AskArticle'
import WhatsAppCard from '@/components/ui/WhatsAppCard'

// Pemetaan category articles.ts → channel slug
const CATEGORY_TO_CHANNEL = {
  'Berita Kesehatan': 'berita-kesehatan',
  'Aksi Kemanusiaan': 'aksi-kemanusiaan',
  'Kemanusiaan': 'aksi-kemanusiaan',
  'Edukasi': 'berita-kesehatan',
  'Gizi': 'berita-kesehatan',
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function estimateMinutes(html = '') {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  })
}

function authorInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Badan artikel dari data articles.ts (array paragraf)
function LocalBody({ body, pullQuote, bodyImages }) {
  if (!body?.length) return null
  const pullAfter = Math.max(1, Math.floor(body.length / 2) - 1)

  return (
    <div className="article-body mt-8 columns-1 md:columns-2 md:gap-8">
      {body.map((para, i) => (
        <Fragment key={i}>
          <p className="mb-5 font-serif text-[17px] leading-[1.85] text-[var(--foreground)]">
            {para}
          </p>
          {/* Gambar inline — muncul setelah paragraf ke-N; [column-span:all] ada di ArticleImage */}
          {bodyImages
            ?.filter((img) => img.afterParagraph === i)
            .map((img, j) => (
              <ArticleImage
                key={j}
                src={img.src}
                alt={img.alt}
                caption={img.caption}
                credit={img.credit}
              />
            ))}
          {/* Pull quote di tengah artikel */}
          {pullQuote && i === pullAfter && (
            <blockquote className="pull-quote my-8 [column-span:all]">
              {pullQuote}
            </blockquote>
          )}
        </Fragment>
      ))}
    </div>
  )
}

// Badan artikel dari Supabase (HTML mentah)
function HtmlBody({ html }) {
  return (
    <article
      className="article-body prose prose-lg mt-8 max-w-none
        prose-headings:font-serif prose-headings:text-[var(--foreground)]
        prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.85]
        prose-p:text-[var(--foreground)] prose-a:text-[var(--accent-red)]"
      dangerouslySetInnerHTML={{ __html: html }}
      aria-label="Isi artikel"
    />
  )
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await supabase
    .from('articles')
    .select('title,excerpt,cover_url,published_at,author_name')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (data) {
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
  const local = getArticleBySlug(slug)
  if (!local) return {}
  return {
    title: local.title,
    description: local.excerpt,
    openGraph: {
      title: local.title,
      description: local.excerpt,
      type: 'article',
      publishedTime: local.publishedAt,
      images: [{ url: local.heroImage, width: 1200, height: 630 }],
    },
  }
}

export default async function ArtikelDetailPage({ params }) {
  const { slug } = await params

  // ── 1. Coba Supabase ─────────────────────────────────────────────────────
  const { data: sbData } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  // ── 2. Normalisasi ke skema tunggal ──────────────────────────────────────
  let art = null
  let bodyKind = 'html'
  let related = []

  if (sbData) {
    const ch = getChannelBySlug(sbData.channel)
    art = {
      title: sbData.title,
      slug: sbData.slug,
      channelSlug: sbData.channel,
      channelLabel: ch?.label ?? sbData.channel,
      channelHref: ch?.href ?? `/${sbData.channel}`,
      subchannel: sbData.subchannel,
      category: null,
      heroUrl: sbData.cover_url,
      heroCaption: sbData.hero_caption ?? null,
      heroCredit: sbData.hero_credit ?? null,
      authorName: sbData.author_name ?? 'Redaksi BSS',
      authorRole: null,
      publishedAt: sbData.published_at,
      readingMinutes: estimateMinutes(sbData.content),
      isVerified: sbData.is_verified ?? false,
      tags: sbData.tags ?? [],
      contentHtml: sbData.content,
      body: null,
      pullQuote: null,
      bodyImages: null,
    }
    const { data: relData } = await supabase
      .from('articles')
      .select('id,title,slug,cover_url,published_at')
      .eq('channel', sbData.channel)
      .eq('is_published', true)
      .neq('slug', slug)
      .order('published_at', { ascending: false })
      .limit(3)
    related = relData ?? []
    bodyKind = 'html'
  } else {
    // ── 3. Fallback ke articles.ts ─────────────────────────────────────────
    const local = getArticleBySlug(slug)
    if (!local) notFound()

    const author = getAuthorById(local.authorId)
    const channelSlug = CATEGORY_TO_CHANNEL[local.category] ?? 'berita-kesehatan'
    const ch = getChannelBySlug(channelSlug)

    art = {
      title: local.title,
      slug: local.slug,
      channelSlug,
      channelLabel: ch?.label ?? local.category,
      channelHref: ch?.href ?? `/${channelSlug}`,
      subchannel: null,
      category: local.category,
      heroUrl: local.heroImage,
      heroCaption: local.heroCaption ?? null,
      heroCredit: local.heroCredit ?? null,
      authorName: author?.name ?? 'Redaksi BSS',
      authorRole: author?.role ?? null,
      publishedAt: local.publishedAt,
      readingMinutes: local.readingMinutes,
      isVerified: local.isVerified,
      tags: local.tags,
      contentHtml: null,
      body: local.body,
      pullQuote: local.pullQuote ?? null,
      bodyImages: local.bodyImages ?? null,
    }
    related = getRecentArticles(3, slug).map((r) => ({
      id: r.slug,
      title: r.title,
      slug: r.slug,
      cover_url: r.thumbnailImage,
      published_at: r.publishedAt,
    }))
    bodyKind = 'local'
  }

  const articleText =
    bodyKind === 'local'
      ? (art.body ?? []).join(' ')
      : stripHtml(art.contentHtml ?? '')

  return (
    <div className="mx-auto w-full max-w-2xl pb-24 pt-0">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {art.heroUrl && (
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-b-2xl">
          <Image
            src={art.heroUrl}
            alt={art.title}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      {/* ── Keterangan foto hero (italic kecil, hanya jika ada) ───────────── */}
      {(art.heroCaption || art.heroCredit) && (
        <p className="px-4 pt-1.5 text-[11px] italic text-[var(--muted)]">
          {art.heroCaption}
          {art.heroCaption && art.heroCredit && ' '}
          {art.heroCredit && `(Foto: ${art.heroCredit})`}
        </p>
      )}

      <div className="px-4 pt-5">

        {/* ── Label kategori — small caps, wide tracking ────────────────── */}
        <div className="mb-3">
          <Link
            href={art.channelHref}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]"
          >
            {art.category ?? art.channelLabel}
          </Link>
        </div>

        {/* ── Judul — tampil SEKALI ─────────────────────────────────────── */}
        <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
          {art.title}
        </h1>

        {/* ── Badge verifikasi medis ────────────────────────────────────── */}
        {art.isVerified && (
          <div className="mt-2">
            <VerifiedBadge size="sm" />
          </div>
        )}

        {/* ── Byline: avatar + nama + jabatan + tanggal + waktu baca ────── */}
        <div className="mt-4 flex items-center gap-3 border-b border-[var(--border)] pb-4">
          {/*
           * Avatar initials — ketika foto asli tersedia, ganti div ini dengan:
           * <Image src={author.avatar} alt={art.authorName} width={40} height={40}
           *   className="h-10 w-10 rounded-full object-cover shrink-0" />
           */}
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-[var(--accent-red)] text-[12px] font-bold text-white"
          >
            {authorInitials(art.authorName)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight text-[var(--foreground)]">
              {art.authorName}
            </p>
            {art.authorRole && (
              <p className="text-[11px] leading-tight text-[var(--muted)]">{art.authorRole}</p>
            )}
          </div>
          <div className="shrink-0 text-right text-[11px] text-[var(--muted)]">
            <time dateTime={art.publishedAt} className="block">
              {formatDate(art.publishedAt)}
            </time>
            <span>{art.readingMinutes} mnt baca</span>
          </div>
        </div>

        {/* ── ShareButtons (atas) ───────────────────────────────────────── */}
        <div className="mt-4">
          <ShareButtons title={art.title} slug={art.slug} />
        </div>

        {/* ── AI Toolbar ────────────────────────────────────────────────── */}
        <div className="mt-4">
          <AiToolbar
            articleText={articleText}
            durationMinutes={art.readingMinutes}
            articleSlug={art.slug}
          />
        </div>

        {/* ── AI Summary ────────────────────────────────────────────────── */}
        <div className="mt-4">
          <AiSummary />
        </div>

        {/* ── Badan artikel ─────────────────────────────────────────────── */}
        {bodyKind === 'local' ? (
          <LocalBody
            body={art.body}
            pullQuote={art.pullQuote}
            bodyImages={art.bodyImages}
          />
        ) : (
          <HtmlBody html={art.contentHtml ?? ''} />
        )}

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        {art.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {art.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* ── ShareButtons (bawah) ─────────────────────────────────────── */}
        <div className="mt-6 border-t border-[var(--border)] pt-4">
          <ShareButtons title={art.title} slug={art.slug} />
        </div>

        {/* ── WhatsApp card ─────────────────────────────────────────────── */}
        <div className="mt-6">
          <WhatsAppCard />
        </div>

        {/* ── Artikel terkait ───────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-8" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="mb-4 font-serif text-lg font-bold text-[var(--foreground)]"
            >
              Baca Juga
            </h2>
            <div>
              {related.map((r) => (
                <Link
                  key={r.id ?? r.slug}
                  href={`/artikel/${r.slug}`}
                  className="group flex items-start gap-3 border-b border-[var(--border)] py-3 last:border-0"
                >
                  {r.cover_url && (
                    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={r.cover_url}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  )}
                  <p className="font-serif text-sm font-semibold leading-snug
                    text-[var(--foreground)] transition-colors
                    group-hover:text-[var(--accent-red)] line-clamp-3">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Tanya AI (sticky mobile) ──────────────────────────────────── */}
        <div className="mt-6">
          <AskArticle articleTitle={art.title} articleSlug={art.slug} />
        </div>

        {/* ── Kembali ───────────────────────────────────────────────────── */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl
              border border-[var(--border)] px-5 py-2.5 text-sm font-medium
              text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
