'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'

// ── Konstanta ─────────────────────────────────────────────────────────────────

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis':   'Dokter Menulis',
  'video-story':      'Video Story',
  'galeri':           'Galeri',
}

const RED      = '#E11932'
const RED_DARK = '#A50E22'
const INTERVAL = 5000   // auto-slide setiap 5 detik

function fmt(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

function articleHref(a) {
  return a.channel === 'dokter-menulis'
    ? `/dokter-menulis/${a.slug}`
    : `/artikel/${a.slug}`
}

// ── HeroSection ───────────────────────────────────────────────────────────────

export default function HeroSection() {
  const [slides,  setSlides]  = useState([])
  const [sidebar, setSidebar] = useState([])
  const [latest,  setLatest]  = useState([])
  const [active,  setActive]  = useState(0)
  const [loading, setLoading] = useState(true)

  // Ambil data: 10 artikel terbaru, bagi ke slide/sidebar/latest
  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('id,title,slug,channel,excerpt,cover_url,published_at')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(10)

      const all = (data && data.length > 0) ? data : SEED_ARTICLES.slice(0, 10)
      setSlides(all.slice(0, 3))
      setSidebar(all.slice(3, 7))
      setLatest(all.slice(0, 4))
      setLoading(false)
    }
    load()
  }, [])

  // Auto-slide tiap INTERVAL ms
  const next = useCallback(() => {
    setActive(a => (slides.length > 0 ? (a + 1) % slides.length : 0))
  }, [slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [slides.length, next])

  // ── Skeleton ──────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] overflow-hidden rounded-2xl border border-[var(--border)]">
          <div className="h-[300px] sm:h-[380px] md:h-[460px] animate-pulse bg-gray-200 dark:bg-gray-700" />
          <div className="flex flex-col gap-4 p-4 bg-[var(--card)]">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-20 w-20 shrink-0 rounded-lg animate-pulse bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-2 w-1/3 rounded animate-pulse bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-full rounded animate-pulse bg-gray-200 dark:bg-gray-700" />
                  <div className="h-3 w-3/4 rounded animate-pulse bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-[var(--border)] animate-pulse">
              <div className="aspect-video bg-gray-200 dark:bg-gray-700" />
              <div className="p-3 space-y-2">
                <div className="h-2 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-3 w-full rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">

      {/* ── 1. HERO SPLIT ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] overflow-hidden rounded-2xl
        border border-[var(--border)]">

        {/* KIRI: Carousel ─────────────────────────────────────────────────── */}
        <div className="relative h-[300px] sm:h-[380px] md:h-[460px] overflow-hidden bg-gray-900">

          {slides.map((slide, i) => {
            const isActive = i === active
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-[800ms] ease-in-out
                  ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                {/* Gambar + Ken Burns (key berbeda → animasi restart tiap slide aktif) */}
                {slide.cover_url && (
                  <div
                    key={`${slide.id}-${isActive ? 'on' : 'off'}`}
                    className="absolute inset-0"
                    style={isActive
                      ? { animation: 'kenburns 6s ease-out forwards' }
                      : undefined}
                  >
                    <Image
                      src={slide.cover_url}
                      alt={slide.title}
                      fill
                      priority={i === 0}
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 62vw"
                    />
                  </div>
                )}

                {/* Gradient gelap dari bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                {/* Konten teks slide */}
                <Link
                  href={articleHref(slide)}
                  className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-5 sm:p-6 pb-10 sm:pb-12"
                  tabIndex={isActive ? 0 : -1}
                >
                  {/* Badge kategori */}
                  <span
                    className="mb-2 inline-block self-start rounded px-2.5 py-0.5
                      text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: RED }}
                  >
                    {CHANNEL_LABEL[slide.channel] ?? slide.channel}
                  </span>

                  {/* Judul */}
                  <h2 className="font-serif text-xl sm:text-2xl font-bold leading-snug
                    text-white line-clamp-3 hover:underline decoration-white/60">
                    {slide.title}
                  </h2>

                  {/* Excerpt */}
                  {slide.excerpt && (
                    <p className="mt-2 text-sm text-white/75 line-clamp-2">{slide.excerpt}</p>
                  )}

                  {/* Tanggal */}
                  <time className="mt-2 text-xs text-white/55" dateTime={slide.published_at}>
                    {fmt(slide.published_at)}
                  </time>
                </Link>
              </div>
            )
          })}

          {/* Dot indikator — pojok kanan bawah */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-2 rounded-full bg-white transition-all duration-300
                    ${i === active ? 'w-6 opacity-100' : 'w-2 opacity-40'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* KANAN: Sidebar 4 berita ─────────────────────────────────────────── */}
        <div className="flex flex-col divide-y divide-[var(--border)]
          border-t md:border-t-0 md:border-l border-[var(--border)] bg-[var(--card)]">
          {sidebar.map((a) => (
            <Link
              key={a.id}
              href={articleHref(a)}
              className="group flex items-start gap-3 p-4
                hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
            >
              {/* Thumbnail 80×80 */}
              <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
                {a.cover_url ? (
                  <Image
                    src={a.cover_url}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="80px"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 dark:bg-gray-700" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: RED }}
                >
                  {CHANNEL_LABEL[a.channel] ?? a.channel}
                </span>
                <h3 className="mt-0.5 font-serif text-sm font-semibold leading-snug
                  text-[var(--foreground)] group-hover:text-[#E11932]
                  transition-colors line-clamp-3">
                  {a.title}
                </h3>
                <time className="mt-1 block text-[11px] text-[var(--muted)]"
                  dateTime={a.published_at}>
                  {fmt(a.published_at)}
                </time>
              </div>
            </Link>
          ))}

          {sidebar.length === 0 && (
            <p className="flex flex-1 items-center justify-center p-8
              text-sm text-[var(--muted)]">
              Belum ada artikel.
            </p>
          )}
        </div>
      </div>

      {/* ── 2. BERITA TERBARU ─────────────────────────────────────────────── */}
      {latest.length > 0 && (
        <section aria-labelledby="terbaru-hero-heading">
          {/* Header dengan border-top merah 3px */}
          <div
            className="mb-5 flex items-center justify-between border-t-[3px] pt-3"
            style={{ borderColor: RED }}
          >
            <h2
              id="terbaru-hero-heading"
              className="font-serif text-lg font-bold text-[var(--foreground)]"
            >
              Berita Terbaru
            </h2>
            <Link
              href="/berita-kesehatan"
              className="flex min-h-[44px] items-center text-xs font-semibold
                transition-colors hover:underline"
              style={{ color: RED }}
            >
              Lihat semua →
            </Link>
          </div>

          {/* Grid 4 kolom (desktop), 2 kolom (tablet), 1 kolom (HP) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latest.map((a) => (
              <Link
                key={a.id}
                href={articleHref(a)}
                className="group flex flex-col overflow-hidden rounded-xl
                  border border-[var(--border)] bg-[var(--card)]"
              >
                {a.cover_url && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={a.cover_url}
                      alt={a.title}
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-3">
                  <span
                    className="text-[9px] font-bold uppercase tracking-wider"
                    style={{ color: RED }}
                  >
                    {CHANNEL_LABEL[a.channel] ?? a.channel}
                  </span>
                  <h3 className="mt-1 font-serif text-sm font-semibold leading-snug
                    text-[var(--foreground)] group-hover:text-[#E11932]
                    transition-colors line-clamp-3">
                    {a.title}
                  </h3>
                  <time className="mt-auto pt-2 text-[11px] text-[var(--muted)]"
                    dateTime={a.published_at}>
                    {fmt(a.published_at)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
