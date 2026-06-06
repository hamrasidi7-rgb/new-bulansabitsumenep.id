'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

/**
 * Section galeri untuk homepage — tampilkan album terbaru.
 * Props: limit {number}
 */
export default function GallerySection({ limit = 4 }) {
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('galleries')
        .select('id,title,slug,cover_url,event_date,category')
        .eq('is_published', true)
        .order('sort_order')
        .order('created_at', { ascending: false })
        .limit(limit)
      setAlbums(data ?? [])
      setLoading(false)
    }
    load()
  }, [limit])

  // Hitung jumlah foto per album
  const [counts, setCounts] = useState({})
  useEffect(() => {
    if (albums.length === 0) return
    const ids = albums.map((a) => a.id)
    supabase
      .from('gallery_photos')
      .select('gallery_id')
      .in('gallery_id', ids)
      .then(({ data }) => {
        if (!data) return
        setCounts(data.reduce((acc, row) => {
          acc[row.gallery_id] = (acc[row.gallery_id] ?? 0) + 1
          return acc
        }, {}))
      })
  }, [albums])

  return (
    <section aria-labelledby="gallery-section-heading">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
            Galeri
          </p>
          <h2 id="gallery-section-heading"
            className="font-serif text-lg font-bold text-[var(--foreground)]">
            Galeri Foto
          </h2>
        </div>
        <Link href="/galeri"
          className="flex min-h-[44px] items-center text-xs font-semibold
            text-[var(--accent-red)] hover:underline">
          Lihat semua →
        </Link>
      </div>

      {/* Skeleton */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square rounded-xl bg-gray-200 dark:bg-gray-700" />
              <div className="mt-2 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && albums.length === 0 && (
        <p className="rounded-xl border border-[var(--border)] p-6 text-center text-sm text-[var(--muted)]">
          Belum ada album diterbitkan.
        </p>
      )}

      {/* Grid album */}
      {!loading && albums.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {albums.map((album) => (
            <Link key={album.id} href={`/galeri/${album.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <div className="relative aspect-square overflow-hidden">
                {album.cover_url ? (
                  <Image src={album.cover_url} alt={album.title} fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width:640px) 50vw, 200px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <svg className="h-8 w-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5"/>
                      <path d="M3 16l5-5 4 4 3-3 6 6" strokeWidth="1.5"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold leading-snug text-[var(--foreground)]
                  group-hover:text-[var(--accent-red)] transition-colors line-clamp-2">
                  {album.title}
                </p>
                <p className="mt-0.5 text-[11px] text-[var(--muted)]">
                  {counts[album.id] ?? 0} foto
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
