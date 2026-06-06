'use client'

import { useEffect, useRef } from 'react'

/**
 * Render embed video sesuai platform.
 * Dirender HANYA saat pengguna mengklik kartu (lazy embed).
 * Script pihak ketiga (TikTok/Facebook) dimuat secara dinamis, bukan di global head.
 */
export default function VideoEmbed({ platform, embedUrl, title }) {
  const containerRef = useRef(null)

  // Muat script pihak ketiga setelah mount (hanya untuk platform yang memerlukannya)
  useEffect(() => {
    if (platform === 'tiktok') {
      loadScript('https://www.tiktok.com/embed.js')
    }
    if (platform === 'facebook') {
      loadScript('https://connect.facebook.net/id_ID/sdk.js#xfbml=1&version=v19.0')
    }
  }, [platform])

  if (!embedUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center
        rounded-xl bg-gray-100 dark:bg-gray-800 text-sm text-[var(--muted)]">
        Embed tidak tersedia untuk platform ini.
      </div>
    )
  }

  // ── YouTube & Instagram & Facebook: iframe ──────────────────────────
  if (platform === 'youtube' || platform === 'facebook') {
    return (
      <div className="aspect-video w-full overflow-hidden rounded-xl">
        <iframe
          src={embedUrl}
          title={title ?? 'Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
    )
  }

  // ── Instagram: rasio 9/16 karena biasanya Reels ──────────────────────
  if (platform === 'instagram') {
    return (
      <div className="w-full overflow-hidden rounded-xl" style={{ aspectRatio: '9/16', maxHeight: '600px' }}>
        <iframe
          src={embedUrl}
          title={title ?? 'Instagram Video'}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="h-full w-full border-0"
          scrolling="no"
          frameBorder="0"
        />
      </div>
    )
  }

  // ── TikTok ───────────────────────────────────────────────────────────
  if (platform === 'tiktok') {
    return (
      <div ref={containerRef} className="w-full overflow-hidden rounded-xl">
        <blockquote
          className="tiktok-embed"
          cite={embedUrl}
          data-video-id={embedUrl.split('/').pop()}
          style={{ maxWidth: '605px', minWidth: '325px' }}
        >
          <section />
        </blockquote>
      </div>
    )
  }

  return null
}

/** Tambahkan script eksternal sekali saja (idempoten) */
function loadScript(src) {
  if (document.querySelector(`script[src="${src}"]`)) return
  const s = document.createElement('script')
  s.src = src
  s.async = true
  document.body.appendChild(s)
}
