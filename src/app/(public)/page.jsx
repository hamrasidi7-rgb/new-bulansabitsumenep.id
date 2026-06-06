import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import Link from 'next/link'
import Image from 'next/image'
import VideoStory from '@/components/VideoStory'
import GallerySection from '@/components/GallerySection'

export const metadata = {
  title: 'Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan',
  description:
    'Portal resmi Bulan Sabit Sumenep: berita kesehatan, aksi kemanusiaan, dokter menulis, galeri, dan video story dari PMI Sumenep.',
}

// ── Pengambilan data ──────────────────────────────────────────────────────────

async function fetchByChannel(channel, limit) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
    .eq('channel', channel)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  // Fallback ke seed jika Supabase belum dikonfigurasi atau tabel kosong
  if (data && data.length > 0) return data
  return SEED_ARTICLES.filter((a) => a.channel === channel).slice(0, limit)
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// ── Komponen artikel card kecil (list vertikal) ───────────────────────────────

function ArticleRow({ article, href }) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 border-b border-[var(--border)] py-3 last:border-0"
    >
      {article.cover_url && (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg">
          <Image
            src={article.cover_url}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="96px"
          />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif text-sm font-semibold leading-snug text-[var(--foreground)]
            group-hover:text-[var(--accent-red)] transition-colors line-clamp-3"
        >
          {article.title}
        </h3>
        <time className="mt-1 block text-[11px] text-[var(--muted)]" dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </div>
    </Link>
  )
}

// ── Komponen artikel card besar (grid) ───────────────────────────────────────

function ArticleCard({ article, href, priority = false }) {
  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
    >
      {article.cover_url && (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={article.cover_url}
            alt={article.title}
            fill
            priority={priority}
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, 360px"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3
          className="font-serif text-[15px] font-semibold leading-snug text-[var(--foreground)]
            group-hover:text-[var(--accent-red)] transition-colors line-clamp-3"
        >
          {article.title}
        </h3>
        {article.excerpt && (
          <p className="mt-1.5 text-sm text-[var(--muted)] line-clamp-2">{article.excerpt}</p>
        )}
        {article.author_name && (
          <p className="mt-1 text-xs font-medium text-[var(--accent-red)]">{article.author_name}</p>
        )}
        <time className="mt-auto pt-3 text-xs text-[var(--muted)]" dateTime={article.published_at}>
          {formatDate(article.published_at)}
        </time>
      </div>
    </Link>
  )
}

// ── Judul seksi ───────────────────────────────────────────────────────────────

function SectionHeader({ title, href }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div>
        <h2 className="font-serif text-lg font-bold text-[var(--foreground)]">{title}</h2>
      </div>
      <Link
        href={href}
        className="flex min-h-[44px] items-center text-xs font-semibold
          text-[var(--accent-red)] hover:underline"
      >
        Lihat semua →
      </Link>
    </div>
  )
}

// ── Halaman utama ─────────────────────────────────────────────────────────────

export default async function HomePage() {
  // Ambil data semua kanal secara paralel
  const [beritaArticles, aksiArticles, dokterArticles] = await Promise.all([
    fetchByChannel('berita-kesehatan', 5),
    fetchByChannel('aksi-kemanusiaan', 4),
    fetchByChannel('dokter-menulis', 3),
  ])

  const [beritaFeatured, ...beritaRest] = beritaArticles
  const [aksiFeatured, ...aksiRest] = aksiArticles

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 space-y-12">

      {/* ── Headline utama ─────────────────────────────────────── */}
      {beritaFeatured && (
        <section aria-labelledby="headline-label">
          <p
            id="headline-label"
            className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]"
          >
            Headline
          </p>
          <Link
            href={`/artikel/${beritaFeatured.slug}`}
            className="group grid sm:grid-cols-5 overflow-hidden rounded-2xl
              border border-[var(--border)] bg-[var(--card)]"
          >
            {beritaFeatured.cover_url && (
              <div className="relative aspect-[16/9] sm:aspect-auto sm:col-span-3 overflow-hidden">
                <Image
                  src={beritaFeatured.cover_url}
                  alt={beritaFeatured.title}
                  fill
                  priority
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 60vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}
            <div className="sm:col-span-2 flex flex-col justify-center p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-red)] mb-2">
                Berita Kesehatan
              </span>
              <h2
                className="font-serif text-xl font-bold leading-tight text-[var(--foreground)]
                  group-hover:text-[var(--accent-red)] transition-colors line-clamp-4"
              >
                {beritaFeatured.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">
                {beritaFeatured.excerpt}
              </p>
              <time
                className="mt-3 text-xs text-[var(--muted)]"
                dateTime={beritaFeatured.published_at}
              >
                {formatDate(beritaFeatured.published_at)}
              </time>
            </div>
          </Link>
        </section>
      )}

      {/* ── Berita Kesehatan ─────────────────────────────────── */}
      <section aria-labelledby="berita-heading">
        <SectionHeader
title="Berita Kesehatan"
          href="/berita-kesehatan"
        />
        {beritaRest.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beritaRest.map((a) => (
              <ArticleCard key={a.id} article={a} href={`/artikel/${a.slug}`} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">
            Belum ada artikel.
          </p>
        )}
      </section>

      {/* ── Aksi Kemanusiaan ─────────────────────────────────── */}
      <section aria-labelledby="aksi-heading">
        <SectionHeader
title="Aksi Kemanusiaan"
          href="/aksi-kemanusiaan"
        />
        {aksiArticles.length > 0 ? (
          <div className="grid gap-0 sm:grid-cols-3 lg:grid-cols-4">
            {/* Kartu besar — artikel pertama */}
            <div className="sm:col-span-2 lg:col-span-2">
              {aksiFeatured && (
                <ArticleCard
                  article={aksiFeatured}
                  href={`/artikel/${aksiFeatured.slug}`}
                  priority={false}
                />
              )}
            </div>
            {/* Daftar vertikal sisa */}
            <div className="sm:col-span-1 lg:col-span-2 flex flex-col justify-center
              border-t sm:border-t-0 sm:border-l border-[var(--border)] sm:pl-4 mt-4 sm:mt-0">
              {aksiRest.map((a) => (
                <ArticleRow key={a.id} article={a} href={`/artikel/${a.slug}`} />
              ))}
            </div>
          </div>
        ) : (
          <p className="rounded-xl border border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">
            Belum ada artikel.
          </p>
        )}
      </section>

      {/* ── Dokter Menulis ───────────────────────────────────── */}
      <section aria-labelledby="dokter-heading">
        <SectionHeader
title="Dokter Menulis"
          href="/dokter-menulis"
        />
        {dokterArticles.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-3">
            {dokterArticles.map((a) => (
              <ArticleCard key={a.id} article={a} href={`/dokter-menulis/${a.slug}`} />
            ))}
          </div>
        ) : (
          <p className="rounded-xl border border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">
            Belum ada artikel.
          </p>
        )}
      </section>

      {/* ── Video Story ──────────────────────────────────────── */}
      <section>
        <VideoStory limit={4} />
      </section>

      {/* ── Galeri Foto ──────────────────────────────────────── */}
      <section>
        <GallerySection limit={4} />
      </section>

    </div>
  )
}
