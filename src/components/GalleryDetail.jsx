'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Lightbox from './Lightbox'

/**
 * Detail album galeri: grid foto masonry + lightbox.
 * Props:
 *   gallery {object}
 *   photos  {Array<{id,image_url,caption,sort_order}>}
 */
export default function GalleryDetail({ gallery, photos }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const formatDate = (d) => d
    ? new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Link href="/galeri" className="hover:text-[var(--accent-red)]">Galeri Foto</Link>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--foreground)]">{gallery.title}</span>
      </nav>

      {/* Judul album */}
      <h1 className="font-serif text-2xl font-bold text-[var(--foreground)]">
        {gallery.title}
      </h1>
      <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[var(--muted)]">
        <span>{photos.length} foto</span>
        {gallery.event_date && (
          <><span>·</span><span>{formatDate(gallery.event_date)}</span></>
        )}
        {gallery.category && (
          <><span>·</span>
          <span className="rounded-full bg-red-50 dark:bg-red-950/20 px-2 py-0.5 text-xs
            font-medium text-[var(--accent-red)]">
            {gallery.category.replace(/-/g, ' ')}
          </span></>
        )}
      </div>
      {gallery.description && (
        <p className="mt-2 text-sm text-[var(--muted)]">{gallery.description}</p>
      )}

      {/* Grid foto masonry (CSS columns) */}
      {photos.length === 0 ? (
        <p className="mt-8 rounded-xl border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          Album ini belum memiliki foto.
        </p>
      ) : (
        <div className="mt-6 columns-2 gap-3 sm:columns-3 lg:columns-4">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setLightboxIndex(i)}
              aria-label={`Buka foto ${i + 1}: ${photo.caption ?? ''}`}
              className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg
                border border-[var(--border)] focus-visible:outline-2 focus-visible:outline-[var(--accent-red)]"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={photo.image_url}
                  alt={photo.caption ?? `Foto ${i + 1}`}
                  width={400}
                  height={300}
                  className="w-full object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
                  loading="lazy"
                />
                {/* Overlay caption saat hover */}
                {photo.caption && (
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent
                    p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <p className="text-left text-xs text-white line-clamp-2">{photo.caption}</p>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={photos}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChange={setLightboxIndex}
        />
      )}
    </div>
  )
}
