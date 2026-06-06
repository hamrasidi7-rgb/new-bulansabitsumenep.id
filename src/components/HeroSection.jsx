'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import { articles as localArticles } from '@/data/articles'
import VerifiedBadge from '@/components/article/VerifiedBadge'

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis':   'Dokter Menulis',
  'video-story':      'Video Story',
  'galeri':           'Galeri',
}

const CATEGORY_TO_CHANNEL = {
  'Berita Kesehatan': 'berita-kesehatan',
  'Aksi Kemanusiaan': 'aksi-kemanusiaan',
  'Kemanusiaan':      'aksi-kemanusiaan',
  'Edukasi':          'berita-kesehatan',
  'Gizi':             'berita-kesehatan',
}

const RED       = '#c0392b'
const TITLE_BG  = '#1c1814'   // coklat gelap hangat — panel judul kartu mobile
const INTERVAL  = 5500

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

function buildLocalArticles() {
  return [...localArticles]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .map((a) => ({
      id:           a.slug,
      title:        a.title,
      slug:         a.slug,
      channel:      CATEGORY_TO_CHANNEL[a.category] ?? 'berita-kesehatan',
      excerpt:      a.excerpt,
      cover_url:    a.heroImage,
      thumb_url:    a.thumbnailImage,
      published_at: a.publishedAt,
      is_verified:  a.isVerified,
    }))
}

export default function HeroSection() {
  const [slides,  setSlides]  = useState([])
  const [grid,    setGrid]    = useState([])
  const [active,  setActive]  = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('articles')
        .select('id,title,slug,channel,excerpt,cover_url,published_at,is_verified')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(10)

      let all
      if (data && data.length > 0) {
        all = data
      } else {
        const local = buildLocalArticles()
        const combined = [...local, ...SEED_ARTICLES]
          .sort((a, b) =>
            new Date(b.published_at ?? b.publishedAt ?? 0).getTime() -
            new Date(a.published_at ?? a.publishedAt ?? 0).getTime()
          )
          .slice(0, 10)
        all = combined
      }

      setSlides(all.slice(0, 3))
      setGrid(all.slice(3, 7))
      setLoading(false)
    }
    load()
  }, [])

  const next = useCallback(() => {
    setActive((a) => (slides.length > 0 ? (a + 1) % slides.length : 0))
  }, [slides.length])

  useEffect(() => {
    if (slides.length === 0) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [slides.length, next])

  // ── Skeleton ────────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="space-y-4">
        {/* Mobile skeleton */}
        <div className="md:hidden overflow-hidden rounded-2xl border border-[var(--border)]">
          <div className="aspect-[16/10] animate-pulse bg-[var(--surface)]" />
          <div className="bg-[#1c1814] px-5 py-5 space-y-2">
            <div className="h-4 w-3/4 rounded animate-pulse bg-white/10" />
            <div className="h-4 w-full rounded animate-pulse bg-white/10" />
          </div>
        </div>
        {/* Desktop skeleton */}
        <div className="hidden md:flex gap-3 h-[480px]">
          <div className="flex-[1.6] animate-pulse rounded-2xl bg-[var(--surface)]" />
          <div className="flex-1 grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl bg-[var(--border)]" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-10">

      {/* ════════════════════════════════════════════════════════════════════
          MOBILE: Kartu besar foto atas + panel judul gelap bawah
          ════════════════════════════════════════════════════════════════════ */}
      <div className="md:hidden space-y-4">

        {/* Kartu hero utama */}
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)]">
          {slides.map((slide, i) => {
            const isActive = i === active
            return (
              <div
                key={slide.id}
                className={isActive ? 'block' : 'hidden'}
              >
                <Link href={articleHref(slide)} className="block">

                  {/* Foto */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-[var(--surface)]">
                    {slide.cover_url && (
                      <Image
                        src={slide.cover_url}
                        alt={slide.title}
                        fill
                        priority={i === 0}
                        className="object-cover"
                        sizes="100vw"
                      />
                    )}
                    {/* Badge kategori di atas foto */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className="inline-block rounded px-2.5 py-0.5
                          text-[10px] font-bold uppercase tracking-wider text-white"
                        style={{ background: RED }}
                      >
                        {CHANNEL_LABEL[slide.channel] ?? slide.channel}
                      </span>
                      {slide.is_verified && <VerifiedBadge size="sm" />}
                    </div>
                  </div>

                  {/* Panel judul gelap */}
                  <div className="px-5 py-5" style={{ background: TITLE_BG }}>
                    <h2 className="font-serif text-[1.25rem] font-bold leading-snug text-white">
                      {slide.title}
                    </h2>
                    {slide.excerpt && (
                      <p className="mt-1.5 text-sm text-white/55 line-clamp-2">
                        {slide.excerpt}
                      </p>
                    )}
                    <time
                      className="mt-3 block text-xs text-white/40"
                      dateTime={slide.published_at}
                    >
                      {fmt(slide.published_at)}
                    </time>
                  </div>
                </Link>
              </div>
            )
          })}

          {/* Dot indikator carousel */}
          {slides.length > 1 && (
            <div
              className="absolute bottom-[72px] right-4 z-10 flex items-center gap-1.5"
            >
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full bg-white transition-all duration-300
                    ${i === active ? 'w-5 opacity-80' : 'w-1.5 opacity-30'}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>

      {/* ════════════════════════════════════════════════════════════════════
          DESKTOP: Carousel kiri + Grid 2×2 kanan
          ════════════════════════════════════════════════════════════════════ */}
      <div className="hidden md:flex gap-3 items-start">

        {/* Carousel foto besar */}
        <div className="relative flex-[1.6] h-[480px] overflow-hidden rounded-2xl bg-[var(--foreground)]">
          {slides.map((slide, i) => {
            const isActive = i === active
            return (
              <div
                key={slide.id}
                aria-hidden={!isActive}
                className={`absolute inset-0 transition-opacity duration-[900ms]
                  ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              >
                {slide.cover_url && (
                  <div
                    key={`${slide.id}-${isActive}`}
                    className="absolute inset-0"
                    style={isActive ? { animation: 'kenburns 6s ease-out forwards' } : undefined}
                  >
                    <Image
                      src={slide.cover_url}
                      alt={slide.title}
                      fill priority={i === 0}
                      className="object-cover"
                      sizes="62vw"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t
                  from-black/90 via-black/35 to-transparent" />
                <Link
                  href={articleHref(slide)}
                  className="absolute inset-x-0 bottom-0 z-10 flex flex-col p-7 pb-12"
                  tabIndex={isActive ? 0 : -1}
                >
                  <div className="mb-2 flex flex-wrap items-center gap-2 self-start">
                    <span
                      className="inline-block rounded px-2.5 py-0.5
                        text-[10px] font-bold uppercase tracking-wider text-white"
                      style={{ background: RED }}
                    >
                      {CHANNEL_LABEL[slide.channel] ?? slide.channel}
                    </span>
                    {slide.is_verified && <VerifiedBadge size="sm" />}
                  </div>
                  <h2 className="font-serif text-2xl md:text-[1.6rem] font-bold
                    leading-snug text-white line-clamp-3 hover:underline
                    decoration-white/60 underline-offset-4">
                    {slide.title}
                  </h2>
                  {slide.excerpt && (
                    <p className="mt-2 text-sm text-white/70 line-clamp-2 max-w-xl">
                      {slide.excerpt}
                    </p>
                  )}
                  <time className="mt-3 text-xs text-white/50" dateTime={slide.published_at}>
                    {fmt(slide.published_at)}
                  </time>
                </Link>
              </div>
            )
          })}
          {slides.length > 1 && (
            <div className="absolute bottom-4 right-5 z-20 flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`}
                  className={`h-1.5 rounded-full bg-white transition-all duration-300
                    ${i === active ? 'w-6 opacity-100' : 'w-1.5 opacity-35'}`} />
              ))}
            </div>
          )}
        </div>

        {/* Grid 2×2 foto — kartu individual rounded seperti ngopibareng */}
        <div className="grid grid-cols-2 gap-2 p-2 bg-[var(--background)]
          border-l border-[var(--border)]">
          {grid.slice(0, 4).map((a) => {
            const img = a.thumb_url ?? a.cover_url
            return (
              <Link
                key={a.id}
                href={articleHref(a)}
                className="group relative overflow-hidden rounded-xl bg-[var(--foreground)]"
              >
                {img && (
                  <Image src={img} alt={a.title} fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="20vw" />
                )}
                {/* Gradient kuat agar konsisten di semua foto terang/gelap */}
                <div className="absolute inset-0 bg-gradient-to-t
                  from-black/90 via-black/50 to-black/15" />
                <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                  <h3 className="font-serif text-[13px] font-semibold
                    leading-snug text-white line-clamp-3
                    group-hover:underline decoration-white/60 underline-offset-2">
                    {a.title}
                  </h3>
                  <time className="mt-1 block text-[10px] text-white/50"
                    dateTime={a.published_at}>
                    {fmt(a.published_at)}
                  </time>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── BERITA TERBARU ─────────────────────────────────────────────────── */}
      {slides.length > 0 && (
        <section aria-labelledby="terbaru-hero-heading">
          <div
            className="mb-5 flex items-center justify-between border-t-[3px] pt-3"
            style={{ borderColor: RED }}
          >
            <h2 id="terbaru-hero-heading"
              className="font-serif text-lg font-bold text-[var(--foreground)]">
              Berita Terbaru
            </h2>
            <Link href="/berita-kesehatan"
              className="flex min-h-[44px] items-center text-xs font-semibold
                text-[var(--accent-red)] transition-colors hover:underline">
              Lihat semua →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {slides.concat(grid).slice(0, 4).map((a) => {
              const thumb = a.thumb_url ?? a.cover_url
              return (
                <Link key={a.id} href={articleHref(a)}
                  className="group flex flex-col overflow-hidden rounded-xl
                    border border-[var(--border)] bg-[var(--surface)]
                    hover:shadow-md transition-shadow duration-200">
                  <div className="relative aspect-video overflow-hidden bg-[var(--border)]">
                    {thumb && (
                      <Image src={thumb} alt={a.title} fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-3">
                    <span className="text-[9px] font-bold uppercase tracking-wider"
                      style={{ color: RED }}>
                      {CHANNEL_LABEL[a.channel] ?? a.channel}
                    </span>
                    <h3 className="mt-1 font-serif text-sm font-semibold leading-snug
                      text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                      transition-colors line-clamp-3">
                      {a.title}
                    </h3>
                    <time className="mt-auto pt-2 text-[11px] text-[var(--muted)]"
                      dateTime={a.published_at}>
                      {fmt(a.published_at)}
                    </time>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

    </div>
  )
}
