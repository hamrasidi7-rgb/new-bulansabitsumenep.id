import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'
import VideoStory from '@/components/VideoStory'
import GallerySection from '@/components/GallerySection'

export const metadata = {
  title: 'Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan',
  description: 'Portal resmi Bulan Sabit Sumenep: berita kesehatan, aksi kemanusiaan, galeri, dan video story dari PMI Sumenep.',
}

/** Ambil artikel headline (featured atau terbaru per kanal) */
async function fetchHeadlines() {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(6)
  return data ?? []
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default async function HomePage() {
  const articles = await fetchHeadlines()
  const [featured, ...rest] = articles

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6">

      {/* ── Headline utama ──────────────────────────────────────── */}
      <section aria-labelledby="headline-label" className="mb-8">
        <p id="headline-label"
          className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
          Headline
        </p>

        {featured ? (
          <Link href={`/artikel/${featured.slug}`}
            className="group grid sm:grid-cols-5 gap-0 overflow-hidden rounded-2xl
              border border-[var(--border)] bg-[var(--card)]">
            {/* Gambar */}
            {featured.cover_url && (
              <div className="relative aspect-[16/9] sm:aspect-auto sm:col-span-3 overflow-hidden">
                <Image src={featured.cover_url} alt={featured.title} fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw, 60vw" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            )}
            {/* Teks */}
            <div className="sm:col-span-2 flex flex-col justify-center p-5">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-red)] mb-2">
                {featured.channel?.replace(/-/g, ' ')}
              </span>
              <h2 className="font-serif text-xl font-bold leading-tight text-[var(--foreground)]
                group-hover:text-[var(--accent-red)] transition-colors line-clamp-4">
                {featured.title}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)] line-clamp-2">{featured.excerpt}</p>
              <time className="mt-3 text-xs text-[var(--muted)]"
                dateTime={featured.published_at}>
                {formatDate(featured.published_at)}
              </time>
            </div>
          </Link>
        ) : (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 text-center text-sm text-[var(--muted)]">
            Belum ada artikel diterbitkan.
          </div>
        )}
      </section>

      {/* ── Artikel terbaru ─────────────────────────────────────── */}
      {rest.length > 0 && (
        <section aria-labelledby="terbaru-label" className="mb-10">
          <p id="terbaru-label"
            className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
            Terbaru
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <Link key={a.id} href={`/artikel/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
                {a.cover_url && (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={a.cover_url} alt={a.title} fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, 350px" />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-red)] mb-1">
                    {a.channel?.replace(/-/g, ' ')}
                  </span>
                  <h3 className="font-serif text-[15px] font-semibold leading-snug
                    text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
                    {a.title}
                  </h3>
                  <time className="mt-auto pt-3 text-xs text-[var(--muted)]" dateTime={a.published_at}>
                    {formatDate(a.published_at)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ── Video Story ─────────────────────────────────────────── */}
      <section className="mb-10">
        <VideoStory limit={6} />
      </section>

      {/* ── Galeri Foto ─────────────────────────────────────────── */}
      <section className="mb-10">
        <GallerySection limit={4} />
      </section>
    </div>
  )
}
