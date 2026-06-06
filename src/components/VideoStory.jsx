'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import { SEED_VIDEOS } from '@/lib/seedData'
import { platformLabel, platformBadgeClass } from '@/lib/videoUtils'
import VideoEmbed from './VideoEmbed'

/**
 * Section "Cerita Pendonor" — Video Story multi-platform.
 * Props:
 *   limit    {number}  jumlah video ditampilkan (default 4, homepage)
 *   showAll  {boolean} tampilkan semua (halaman /video-story)
 */
// initialVideos: opsional — jika diisi dari server, skip fetch client-side
export default function VideoStory({ limit = 4, showAll = false, initialVideos }) {
  const [videos, setVideos] = useState(initialVideos ?? [])
  const [loading, setLoading] = useState(!initialVideos)
  const [playingId, setPlayingId] = useState(null)

  useEffect(() => {
    if (initialVideos) return  // data sudah dari server, tidak perlu fetch
    async function load() {
      const query = supabase
        .from('videos')
        .select('id,title,platform,video_id,thumbnail_url,description,sort_order,video_url')
        .eq('is_published', true)
        .order('sort_order')
        .order('created_at', { ascending: false })

      if (!showAll) query.limit(limit)

      const { data } = await query

      if (data && data.length > 0) {
        setVideos(data)
      } else {
        const seedSlice = showAll ? SEED_VIDEOS : SEED_VIDEOS.slice(0, limit)
        setVideos(seedSlice)
      }
      setLoading(false)
    }
    load()
  }, [limit, showAll, initialVideos])

  return (
    <section aria-labelledby="video-story-heading">
      {/* Judul section */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
            Video Story
          </p>
          <h2 id="video-story-heading"
            className="font-serif text-lg font-bold text-[var(--foreground)]">
            Cerita Pendonor
          </h2>
        </div>
        {!showAll && (
          <Link href="/video-story"
            className="flex min-h-[44px] items-center text-xs font-semibold
              text-[var(--accent-red)] hover:underline">
            Lihat semua →
          </Link>
        )}
      </div>

      {/* Skeleton loading */}
      {loading && (
        <div className={`flex gap-4 overflow-x-auto pb-2 no-scrollbar
          ${showAll ? 'sm:grid sm:grid-cols-3 sm:overflow-visible' : ''}`}>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="w-64 shrink-0 sm:w-auto animate-pulse">
              <div className="aspect-video rounded-xl bg-gray-200 dark:bg-gray-700" />
              <div className="mt-2 h-3 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="mt-1.5 h-3 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state (seharusnya tidak muncul karena ada seed fallback) */}
      {!loading && videos.length === 0 && (
        <div className="rounded-xl border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          Belum ada video diterbitkan.
        </div>
      )}

      {/* Daftar video */}
      {!loading && videos.length > 0 && (
        <div className={`
          ${showAll
            ? 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3'
            : 'flex gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible'
          }`}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              isPlaying={playingId === video.id}
              onPlay={() => setPlayingId(video.id)}
            />
          ))}
        </div>
      )}
    </section>
  )
}

// ── Kartu video individual ─────────────────────────────────────────────────

function VideoCard({ video, isPlaying, onPlay }) {
  const hasThumbnail = !!video.thumbnail_url

  return (
    <div className="w-64 shrink-0 sm:w-auto">
      {isPlaying ? (
        /* Render embed hanya saat diklik */
        <div>
          <VideoEmbed
            platform={video.platform}
            embedUrl={video.video_url ? buildEmbedUrl(video) : null}
            title={video.title}
          />
          <button
            onClick={onPlay}
            className="mt-2 text-xs text-[var(--muted)] hover:text-[var(--foreground)]">
            ✕ Tutup
          </button>
        </div>
      ) : (
        /* Thumbnail + overlay play */
        <button
          onClick={onPlay}
          aria-label={`Putar video: ${video.title}`}
          className="group w-full text-left"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
            {hasThumbnail ? (
              <Image
                src={video.thumbnail_url}
                alt={video.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width:640px) 256px, 360px"
              />
            ) : (
              /* Placeholder bertema jika tidak ada thumbnail */
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gray-100 dark:bg-gray-800">
                <PlatformIcon platform={video.platform} />
                <span className="text-xs text-[var(--muted)]">{platformLabel(video.platform)}</span>
              </div>
            )}

            {/* Overlay gelap */}
            <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/30" />

            {/* Tombol play */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full
                bg-white/90 text-[var(--accent-red)] shadow-lg
                transition duration-200 group-hover:scale-110">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                  <path d="M6 4l9 5-9 5V4z"/>
                </svg>
              </div>
            </div>

            {/* Badge platform */}
            <span className={`absolute right-2 top-2 rounded-md px-1.5 py-0.5
              text-[10px] font-bold ${platformBadgeClass(video.platform)}`}>
              {platformLabel(video.platform)}
            </span>
          </div>

          <p className="mt-2 text-sm font-semibold leading-snug text-[var(--foreground)]
            group-hover:text-[var(--accent-red)] transition-colors line-clamp-2">
            {video.title}
          </p>
          {video.description && (
            <p className="mt-0.5 text-xs text-[var(--muted)] line-clamp-2">{video.description}</p>
          )}
        </button>
      )}
    </div>
  )
}

/** Rebuild embed URL dari data video di DB */
function buildEmbedUrl(video) {
  switch (video.platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${video.video_id}?rel=0`
    case 'instagram':
      return video.video_url.split('?')[0].replace(/\/$/, '') + '/embed/'
    case 'tiktok':
      return `https://www.tiktok.com/embed/v2/${video.video_id}`
    case 'facebook':
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(video.video_url)}&show_text=0`
    default:
      return null
  }
}

function PlatformIcon({ platform }) {
  const icons = {
    youtube: (
      <svg className="h-8 w-8 text-red-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2s-.3-1.9-1.1-2.7c-1-1.1-2.2-1.1-2.7-1.2C16.8 2 12 2 12 2s-4.8 0-7.7.3c-.5.1-1.7.1-2.7 1.2C.8 4.3.5 6.2.5 6.2S.2 8.4.2 10.6v2c0 2.2.3 4.4.3 4.4s.3 1.9 1.1 2.7c1 1.1 2.4 1.1 3 1.2C6.9 21 12 21 12 21s4.8 0 7.7-.2c.5-.1 1.7-.1 2.7-1.2.8-.8 1.1-2.7 1.1-2.7s.3-2.2.3-4.4v-2c0-2.2-.3-4.4-.3-4.4zM9.7 14.8V8.6l7 3.1-7 3.1z"/>
      </svg>
    ),
    instagram: (
      <svg className="h-8 w-8 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.2.1 4.7 1.7 4.8 4.8.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.6 4.7-4.8 4.8-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.2-.1-4.7-1.6-4.8-4.8C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7.1.1 2.9.3.3 2.9.1 7.1.1 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.2 2.8 6.8 7 7C8.3 24 8.7 24 12 24s3.7 0 4.9-.1c4.2-.2 6.8-2.8 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.2-2.8-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
      </svg>
    ),
    tiktok: (
      <svg className="h-8 w-8 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.6 0h-3.2v15.4a2.6 2.6 0 1 1-2.6-2.6h.4v-3.2h-.4A5.8 5.8 0 1 0 19.6 15V8.5a9.1 9.1 0 0 0 5.4 1.7V7a5.4 5.4 0 0 1-5.4-5.4V0z"/>
      </svg>
    ),
    facebook: (
      <svg className="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4H7.1v-3.5h3v-2.7c0-3 1.8-4.6 4.5-4.6 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.9V24C19.6 23 24 18.1 24 12.1z"/>
      </svg>
    ),
  }
  return icons[platform] ?? (
    <svg className="h-8 w-8 text-gray-400" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7L8 5z"/>
    </svg>
  )
}
