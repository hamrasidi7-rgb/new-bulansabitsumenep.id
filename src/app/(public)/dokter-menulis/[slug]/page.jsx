import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { SEED_ARTICLES } from '@/lib/seedData'
import { fmtDate } from '@/lib/fmt'
import ShareButtons from '@/components/article/ShareButtons'
import AskArticle from '@/components/ai/AskArticle'
import WhatsAppCard from '@/components/ui/WhatsAppCard'

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

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await supabase
    .from('articles')
    .select('title,excerpt,cover_url,author_name,published_at')
    .eq('slug', slug)
    .eq('channel', 'dokter-menulis')
    .eq('is_published', true)
    .single()
  if (data) {
    return {
      title: data.title,
      description: data.excerpt ?? undefined,
      openGraph: {
        title: data.title,
        type: 'article',
        authors: data.author_name ? [data.author_name] : undefined,
        images: data.cover_url ? [{ url: data.cover_url }] : [],
      },
    }
  }
  const seed = SEED_ARTICLES.find(
    (a) => a.channel === 'dokter-menulis' && a.slug === slug,
  )
  if (!seed) return {}
  return {
    title: seed.title,
    description: seed.excerpt ?? undefined,
    openGraph: {
      title: seed.title,
      type: 'article',
      authors: seed.author_name ? [seed.author_name] : undefined,
    },
  }
}

export default async function DokterMenulisDetailPage({ params }) {
  const { slug } = await params

  // ── 1. Coba Supabase ─────────────────────────────────────────────────────
  const { data: sbData } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('channel', 'dokter-menulis')
    .eq('is_published', true)
    .single()

  // ── 2. Fallback ke seed ───────────────────────────────────────────────────
  const raw =
    sbData ??
    SEED_ARTICLES.find((a) => a.channel === 'dokter-menulis' && a.slug === slug)

  if (!raw) notFound()

  const readingMinutes = estimateMinutes(raw.content)

  return (
    <div className="mx-auto w-full max-w-2xl pb-24 pt-0">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      {raw.cover_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-b-2xl">
          <Image
            src={raw.cover_url}
            alt={raw.title}
            fill
            className="object-cover"
            sizes="(max-width:640px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="px-4 pt-5">

        {/* ── Label kanal ───────────────────────────────────────────────── */}
        <div className="mb-3">
          <Link
            href="/dokter-menulis"
            className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]"
          >
            Dokter Menulis
          </Link>
        </div>

        {/* ── Judul ─────────────────────────────────────────────────────── */}
        <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
          {raw.title}
        </h1>

        {/* ── Byline ────────────────────────────────────────────────────── */}
        <div className="mt-4 flex items-center gap-3 border-b border-[var(--border)] pb-4">
          <div
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center
              rounded-full bg-[var(--accent-red)] text-[12px] font-bold text-white"
          >
            {authorInitials(raw.author_name ?? 'Dokter')}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-tight text-[var(--foreground)]">
              {raw.author_name ?? 'Dokter BSS'}
            </p>
            <p className="text-[11px] leading-tight text-[var(--muted)]">Dokter Menulis</p>
          </div>
          <div className="shrink-0 text-right text-[11px] text-[var(--muted)]">
            <time dateTime={raw.published_at} className="block">
              {formatDate(raw.published_at)}
            </time>
            <span>{readingMinutes} mnt baca</span>
          </div>
        </div>

        {/* ── Badan artikel ─────────────────────────────────────────────── */}
        <article
          className="article-body prose prose-lg mt-8 max-w-none
            prose-headings:font-serif prose-headings:text-[var(--foreground)]
            prose-p:font-serif prose-p:text-[17px] prose-p:leading-[1.85]
            prose-p:text-[var(--foreground)] prose-a:text-[var(--accent-red)]"
          dangerouslySetInnerHTML={{ __html: raw.content }}
        />

        {/* ── Tags ──────────────────────────────────────────────────────── */}
        {raw.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {raw.tags.map((tag) => (
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
          <ShareButtons title={raw.title} slug={raw.slug} />
        </div>

        {/* ── WhatsApp card ─────────────────────────────────────────────── */}
        <div className="mt-6">
          <WhatsAppCard />
        </div>

        {/* ── Tanya AI ─────────────────────────────────────────────────── */}
        <div className="mt-6">
          <AskArticle articleTitle={raw.title} articleSlug={raw.slug} />
        </div>

        {/* ── Kembali ───────────────────────────────────────────────────── */}
        <div className="mt-6 text-center">
          <Link
            href="/dokter-menulis"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl
              border border-[var(--border)] px-5 py-2.5 text-sm font-medium
              text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            ← Kembali ke Dokter Menulis
          </Link>
        </div>
      </div>
    </div>
  )
}
