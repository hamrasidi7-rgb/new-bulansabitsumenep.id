import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { getChannelBySlug } from '@/lib/channels'
import { getArticleBySlug, getAuthorById, getRecentArticles } from '@/data/articles'
import { SEED_ARTICLES } from '@/lib/seedData'
import { fmtDate } from '@/lib/fmt'
import VerifiedBadge from '@/components/article/VerifiedBadge'
import ArticleImage from '@/components/article/ArticleImage'
import ShareButtons from '@/components/article/ShareButtons'
import AskArticle from '@/components/ai/AskArticle'
import WhatsAppCard from '@/components/ui/WhatsAppCard'
import BannerSlot from '@/components/ui/BannerSlot'
import SectionHeader from '@/components/ui/SectionHeader'

// Pemetaan category articles.ts → channel slug
const CATEGORY_TO_CHANNEL = {
  'Berita Kesehatan': 'berita-kesehatan',
  'Aksi Kemanusiaan': 'aksi-kemanusiaan',
  'Kemanusiaan': 'aksi-kemanusiaan',
  'Edukasi': 'berita-kesehatan',
  'Gizi': 'berita-kesehatan',
}

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis':   'Dokter Menulis',
}

async function fetchLatestAll(excludeSlug, limit = 5) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,cover_url,published_at')
    .eq('is_published', true)
    .neq('slug', excludeSlug)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data
  const local = (await import('@/data/articles')).articles
  const combined = [
    ...local.map((a) => ({
      id: a.slug, title: a.title, slug: a.slug,
      channel: CATEGORY_TO_CHANNEL[a.category] ?? 'berita-kesehatan',
      cover_url: a.thumbnailImage, published_at: a.publishedAt,
    })),
    ...SEED_ARTICLES.map((a) => ({ ...a, id: a.id ?? a.slug })),
  ]
    .filter((a) => a.slug !== excludeSlug)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit)
  return combined
}

function stripHtml(html = '') {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function estimateMinutes(html = '') {
  const words = stripHtml(html).split(' ').filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

const formatDate = (iso) => fmtDate(iso, true)

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

// Potong HTML setelah paragraf ke-N (0-indexed count of </p>)
function splitHtmlAfterParagraph(html, n) {
  let pos = 0
  for (let i = 0; i < n; i++) {
    const idx = html.indexOf('</p>', pos)
    if (idx === -1) return [html, '']
    pos = idx + 4
  }
  return [html.slice(0, pos), html.slice(pos)]
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
          {bodyImages
            ?.filter((img) => img.afterParagraph === i)
            .map((img, j) => (
              <ArticleImage key={j} src={img.src} alt={img.alt}
                caption={img.caption} credit={img.credit} />
            ))}
          {/* Banner setelah paragraf ke-2 */}
          {i === 1 && (
            <BannerSlot size="strip" className="my-6 [column-span:all]" />
          )}
          {/* Pull quote + banner di tengah artikel */}
          {pullQuote && i === pullAfter && (
            <>
              <blockquote className="pull-quote my-8 [column-span:all]">
                {pullQuote}
              </blockquote>
              <BannerSlot size="rectangle" className="mb-8 [column-span:all]" />
            </>
          )}
        </Fragment>
      ))}
    </div>
  )
}

// Badan artikel dari Supabase/SEED (HTML mentah) — banner disuntik antar segmen
function HtmlBody({ html }) {
  const totalParas = (html.match(/<\/p>/g) ?? []).length
  const [seg1, rest1] = splitHtmlAfterParagraph(html, 2)
  const [seg2, seg3] = splitHtmlAfterParagraph(rest1, Math.max(1, Math.floor(totalParas / 2) - 2))

  const proseClass =
    'article-body prose prose-lg max-w-none ' +
    'prose-headings:font-serif prose-headings:text-[var(--foreground)] ' +
    'prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.85] ' +
    'prose-p:text-[var(--foreground)] prose-a:text-[var(--accent-red)]'

  return (
    <>
      {/* Paragraf 1-2 */}
      <article className={`${proseClass} mt-8`}
        dangerouslySetInnerHTML={{ __html: seg1 }} aria-label="Isi artikel bagian awal" />
      {/* Banner setelah paragraf ke-2 */}
      <BannerSlot size="strip" className="my-6" />
      {/* Paragraf tengah */}
      <article className={proseClass}
        dangerouslySetInnerHTML={{ __html: seg2 }} aria-label="Isi artikel bagian tengah" />
      {/* Banner di tengah artikel */}
      <BannerSlot size="rectangle" className="my-6" />
      {/* Paragraf akhir */}
      {seg3 && (
        <article className={proseClass}
          dangerouslySetInnerHTML={{ __html: seg3 }} aria-label="Isi artikel bagian akhir" />
      )}
    </>
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
      .select('id,title,slug,channel,cover_url,published_at')
      .eq('channel', sbData.channel)
      .eq('is_published', true)
      .neq('slug', slug)
      .order('published_at', { ascending: false })
      .limit(4)
    related = relData ?? []
    bodyKind = 'html'
  } else {
    // ── 3. Fallback ke articles.ts ─────────────────────────────────────────
    const local = getArticleBySlug(slug)

    if (local) {
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
      related = getRecentArticles(4, slug).map((r) => ({
        id: r.slug,
        title: r.title,
        slug: r.slug,
        channel: CATEGORY_TO_CHANNEL[r.category] ?? 'berita-kesehatan',
        cover_url: r.thumbnailImage,
        published_at: r.publishedAt,
      }))
      bodyKind = 'local'
    } else {
      // ── 4. Fallback ke SEED_ARTICLES ──────────────────────────────────────
      const seed = SEED_ARTICLES.find(
        (a) => a.slug === slug && a.channel !== 'dokter-menulis'
      )
      if (!seed) notFound()

      const ch = getChannelBySlug(seed.channel)
      art = {
        title: seed.title,
        slug: seed.slug,
        channelSlug: seed.channel,
        channelLabel: ch?.label ?? seed.channel,
        channelHref: ch?.href ?? `/${seed.channel}`,
        subchannel: seed.subchannel ?? null,
        category: null,
        heroUrl: seed.cover_url ?? null,
        heroCaption: null,
        heroCredit: null,
        authorName: seed.author_name ?? 'Redaksi BSS',
        authorRole: null,
        publishedAt: seed.published_at,
        readingMinutes: estimateMinutes(seed.content ?? ''),
        isVerified: false,
        tags: seed.tags ?? [],
        contentHtml: seed.content ?? '',
        body: null,
        pullQuote: null,
        bodyImages: null,
      }
      related = []
      bodyKind = 'html'
    }
  }

  const latest = await fetchLatestAll(slug, 5)

  return (
    <div className="mx-auto w-full max-w-2xl pb-24 pt-0">
      <div className="px-4 pt-5">

        {/* ── Banner di atas judul ──────────────────────────────────────── */}
        <BannerSlot size="leaderboard" className="mb-5" />

        {/* ── Label kategori — small caps, wide tracking ────────────────── */}
        <div className="mb-3">
          <Link
            href={art.channelHref}
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]"
          >
            {art.category ?? art.channelLabel}
          </Link>
        </div>

        {/* ── Judul ─────────────────────────────────────────────────────── */}
        <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
          {art.title}
        </h1>

        {/* ── Badge verifikasi medis ────────────────────────────────────── */}
        {art.isVerified && (
          <div className="mt-2">
            <VerifiedBadge size="sm" />
          </div>
        )}

        {/* ── Byline: avatar + nama + tanggal + waktu baca ─────────────── */}
        <div className="mt-4 flex items-center gap-3 border-b border-[var(--border)] pb-4">
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

        {/* ── Foto utama — di bawah judul & byline ─────────────────────── */}
        {art.heroUrl && (
          <div className="mt-5 overflow-hidden rounded-xl">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={art.heroUrl}
                alt={art.title}
                fill
                className="object-cover"
                sizes="(max-width:640px) 100vw, 640px"
                priority
              />
            </div>
          </div>
        )}
        {(art.heroCaption || art.heroCredit) && (
          <p className="mt-1.5 text-[11px] italic text-[var(--muted)]">
            {art.heroCaption}
            {art.heroCaption && art.heroCredit && ' '}
            {art.heroCredit && `(Foto: ${art.heroCredit})`}
          </p>
        )}

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

        {/* ── Banner setelah artikel ────────────────────────────────────── */}
        <BannerSlot size="leaderboard" className="mt-8" />

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

        {/* ── Berita Terkait ────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-10" aria-labelledby="related-heading">
            <SectionHeader prefix="Berita " highlight="TERKAIT" id="related-heading" />
            <div className="divide-y divide-[var(--border)]">
              {related.map((r) => (
                <Link
                  key={r.id ?? r.slug}
                  href={`/artikel/${r.slug}`}
                  className="group flex items-start gap-3 py-3"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
                    {r.cover_url && (
                      <Image src={r.cover_url} alt="" fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="80px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-red)]">
                        {CHANNEL_LABEL[r.channel] ?? art.channelLabel}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">·</span>
                      <time className="text-[10px] text-[var(--muted)]" dateTime={r.published_at}>
                        {formatDate(r.published_at)}
                      </time>
                    </div>
                    <p className="font-serif text-[13px] font-semibold leading-snug
                      text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                      transition-colors line-clamp-3">
                      {r.title}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── Berita Terbaru ────────────────────────────────────────────── */}
        {latest.length > 0 && (
          <section className="mt-10" aria-labelledby="latest-heading">
            <SectionHeader prefix="Berita " highlight="TERBARU" href="/terbaru" id="latest-heading" />
            <div className="divide-y divide-[var(--border)]">
              {latest.map((r) => (
                <Link
                  key={r.id ?? r.slug}
                  href={r.channel === 'dokter-menulis' ? `/dokter-menulis/${r.slug}` : `/artikel/${r.slug}`}
                  className="group flex items-start gap-3 py-3"
                >
                  <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
                    {r.cover_url && (
                      <Image src={r.cover_url} alt="" fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="80px" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--accent-red)]">
                        {CHANNEL_LABEL[r.channel] ?? r.channel}
                      </span>
                      <span className="text-[10px] text-[var(--muted)]">·</span>
                      <time className="text-[10px] text-[var(--muted)]" dateTime={r.published_at}>
                        {formatDate(r.published_at)}
                      </time>
                    </div>
                    <p className="font-serif text-[13px] font-semibold leading-snug
                      text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                      transition-colors line-clamp-3">
                      {r.title}
                    </p>
                  </div>
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
