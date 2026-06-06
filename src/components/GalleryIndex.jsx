'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { SEED_GALLERIES } from '@/lib/seedData'
import { GALLERY_CATEGORIES } from '@/lib/channels'

/**
 * Indeks semua album galeri dengan filter kategori.
 * Dipakai oleh halaman /galeri.
 */
export default function GalleryIndex() {
  const [albums, setAlbums] = useState([])
  const [counts, setCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState(null) // null = Semua

  useEffect(() => {
    async function load() {
      setLoading(true)
      let q = supabase
        .from('galleries')
        .select('id,title,slug,cover_url,event_date,category,description')
        .eq('is_published', true)
        .order('sort_order')
        .order('created_at', { ascending: false })

      if (activeCategory) q = q.eq('category', activeCategory)

      const { data } = await q

      if (data && data.length > 0) {
        setAlbums(data)
        const ids = data.map((a) => a.id)
        const { data: photoData } = await supabase
          .from('gallery_photos')
          .select('gallery_id')
          .in('gallery_id', ids)
        if (photoData) {
          setCounts(photoData.reduce((acc, row) => {
            acc[row.gallery_id] = (acc[row.gallery_id] ?? 0) + 1
            return acc
          }, {}))
        }
      } else {
        // Fallback ke seed — filter per kategori jika dipilih
        const seed = activeCategory
          ? SEED_GALLERIES.filter((g) => g.category === activeCategory)
          : SEED_GALLERIES
        setAlbums(seed)
        setCounts(seed.reduce((acc, g) => { acc[g.id] = g.photos?.length ?? 0; return acc }, {}))
      }
      setLoading(false)
    }
    load()
  }, [activeCategory])

  const formatDate = (d) => d
    ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div>
      <h1 className="mb-6 font-serif text-2xl font-bold text-[var(--foreground)]">Galeri Foto</h1>

      {/* Filter kategori */}
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Filter kategori galeri">
        {GALLERY_CATEGORIES.map((cat) => (
          <button
            key={String(cat.value)}
            onClick={() => setActiveCategory(cat.value)}
            aria-pressed={activeCategory === cat.value}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors
              ${activeCategory === cat.value
                ? 'bg-[var(--accent-red)] text-white'
                : 'border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-red)] hover:text-[var(--accent-red)]'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
              <div className="mt-2 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && albums.length === 0 && (
        <p className="rounded-xl border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          Belum ada album di kategori ini.
        </p>
      )}

      {/* Grid album */}
      {!loading && albums.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {albums.map((album) => (
            <Link key={album.id} href={`/galeri/${album.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="relative aspect-square overflow-hidden">
                {album.cover_url ? (
                  <Image src={album.cover_url} alt={album.title} fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw, 25vw" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <svg className="h-10 w-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                      <path d="M3 16l5-5 4 4 3-3 6 6" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold leading-snug text-[var(--foreground)]
                  group-hover:text-[var(--accent-red)] transition-colors line-clamp-2">
                  {album.title}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-[var(--muted)]">
                  <span>{counts[album.id] ?? 0} foto</span>
                  {album.event_date && <><span>·</span><span>{formatDate(album.event_date)}</span></>}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
