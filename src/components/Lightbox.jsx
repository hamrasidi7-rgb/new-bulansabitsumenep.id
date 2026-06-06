'use client'

import { useEffect, useCallback } from 'react'
import Image from 'next/image'

/**
 * Lightbox foto: tampilan penuh dengan navigasi prev/next.
 * Mendukung keyboard (←/→/Escape) dan swipe touch.
 *
 * Props:
 *   photos   {Array<{id,image_url,caption}>}
 *   index    {number}  indeks foto yang sedang ditampilkan
 *   onClose  {Function}
 *   onChange {Function(newIndex)}
 */
export default function Lightbox({ photos, index, onClose, onChange }) {
  const total = photos.length
  const photo = photos[index]

  const prev = useCallback(() => onChange((index - 1 + total) % total), [index, total, onChange])
  const next = useCallback(() => onChange((index + 1) % total), [index, total, onChange])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [prev, next, onClose])

  // Swipe touch
  useEffect(() => {
    let startX = null
    const touchStart = (e) => { startX = e.touches[0].clientX }
    const touchEnd   = (e) => {
      if (startX === null) return
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev()
      startX = null
    }
    document.addEventListener('touchstart', touchStart, { passive: true })
    document.addEventListener('touchend', touchEnd, { passive: true })
    return () => {
      document.removeEventListener('touchstart', touchStart)
      document.removeEventListener('touchend', touchEnd)
    }
  }, [prev, next])

  if (!photo) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} dari ${total}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
    >
      {/* Overlay — klik untuk tutup */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Tombol tutup */}
      <button
        onClick={onClose}
        aria-label="Tutup lightbox"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center
          rounded-full bg-white/10 text-white hover:bg-white/20"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <line x1="2" y1="2" x2="16" y2="16"/><line x1="16" y1="2" x2="2" y2="16"/>
        </svg>
      </button>

      {/* Tombol prev */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2
            flex h-11 w-11 items-center justify-center rounded-full
            bg-white/10 text-white hover:bg-white/25"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="13 4 7 10 13 16"/>
          </svg>
        </button>
      )}

      {/* Gambar utama */}
      <div className="relative z-10 flex max-h-[85vh] max-w-[90vw] flex-col items-center">
        <div className="relative max-h-[75vh] max-w-[90vw]">
          <Image
            src={photo.image_url}
            alt={photo.caption ?? `Foto ${index + 1}`}
            width={1200}
            height={900}
            className="max-h-[75vh] max-w-[90vw] rounded-lg object-contain"
            sizes="90vw"
            priority
          />
        </div>

        {/* Caption */}
        {photo.caption && (
          <p className="mt-3 max-w-xl text-center text-sm text-white/80 px-4">
            {photo.caption}
          </p>
        )}

        {/* Counter */}
        <p className="mt-2 text-xs text-white/50" aria-live="polite">
          {index + 1} / {total}
        </p>
      </div>

      {/* Tombol next */}
      {total > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Foto berikutnya"
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2
            flex h-11 w-11 items-center justify-center rounded-full
            bg-white/10 text-white hover:bg-white/25"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="7 4 13 10 7 16"/>
          </svg>
        </button>
      )}
    </div>
  )
}
