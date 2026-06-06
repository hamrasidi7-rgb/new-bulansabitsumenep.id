'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { parseVideoUrl, platformLabel, platformBadgeClass } from '@/lib/videoUtils'
import Image from 'next/image'

/**
 * Form tambah/edit Video Story di admin.
 * Props:
 *   initial  {object|null}  data video yang sedang diedit (null untuk tambah baru)
 *   onSaved  {Function}     dipanggil setelah berhasil simpan
 */
export default function VideoAdminForm({ initial = null, onSaved }) {
  const [title, setTitle]           = useState(initial?.title ?? '')
  const [videoUrl, setVideoUrl]     = useState(initial?.video_url ?? '')
  const [thumbnail, setThumbnail]   = useState(initial?.thumbnail_url ?? '')
  const [description, setDesc]      = useState(initial?.description ?? '')
  const [sortOrder, setSortOrder]   = useState(initial?.sort_order ?? 0)
  const [published, setPublished]   = useState(initial?.is_published ?? true)
  const [saving, setSaving]         = useState(false)
  const [error, setError]           = useState('')

  // Parsing URL secara real-time saat user mengetik
  const parsed = parseVideoUrl(videoUrl)
  const isValid = parsed.platform !== 'unknown' && videoUrl.trim() !== ''
  const isYoutube = parsed.platform === 'youtube'

  // Thumbnail aktif: YouTube otomatis, lainnya manual
  const activeThumbnail = isYoutube ? parsed.thumbnailUrl : thumbnail

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isValid) {
      setError('URL video tidak dikenali. Pastikan URL berasal dari YouTube, Instagram, TikTok, atau Facebook.')
      return
    }

    setSaving(true)
    const payload = {
      title: title.trim(),
      video_url: videoUrl.trim(),
      platform: parsed.platform,
      video_id: parsed.videoId,
      thumbnail_url: activeThumbnail || null,
      description: description.trim() || null,
      sort_order: Number(sortOrder),
      is_published: published,
    }

    let err
    if (initial?.id) {
      ;({ error: err } = await supabase.from('videos').update(payload).eq('id', initial.id))
    } else {
      ;({ error: err } = await supabase.from('videos').insert(payload))
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Judul */}
      <div>
        <label className="label-field">Judul Video</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Nama cerita / judul video"
          className="input-field"
        />
      </div>

      {/* URL Video */}
      <div>
        <label className="label-field">URL Video</label>
        <input
          type="url"
          required
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="input-field"
        />
        {/* Badge platform terdeteksi */}
        {videoUrl && (
          <div className="mt-1.5 flex items-center gap-2">
            <span className={`rounded-md px-2 py-0.5 text-xs font-bold
              ${isValid ? platformBadgeClass(parsed.platform) : 'bg-red-100 text-red-700'}`}>
              {isValid ? platformLabel(parsed.platform) : '✕ URL tidak dikenal'}
            </span>
            {parsed.videoId && (
              <span className="text-xs text-[var(--muted)]">ID: {parsed.videoId}</span>
            )}
          </div>
        )}
      </div>

      {/* Preview thumbnail YouTube / field manual untuk lainnya */}
      {isValid && (
        <div>
          {isYoutube ? (
            <div>
              <p className="label-field">Preview Thumbnail (otomatis)</p>
              <div className="relative aspect-video w-48 overflow-hidden rounded-lg border border-[var(--border)]">
                <Image src={parsed.thumbnailUrl} alt="thumbnail" fill className="object-cover" sizes="192px" />
              </div>
            </div>
          ) : (
            <div>
              <label className="label-field">
                URL Thumbnail Manual
                <span className="ml-1 text-[var(--muted)] font-normal">(opsional)</span>
              </label>
              <input
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://..."
                className="input-field"
              />
              <p className="mt-1 text-xs text-[var(--muted)]">
                Platform ini tidak menyediakan thumbnail otomatis. Isi URL gambar secara manual,
                atau kosongkan untuk tampilkan placeholder.
              </p>
              {thumbnail && (
                <div className="relative mt-2 aspect-video w-48 overflow-hidden rounded-lg border border-[var(--border)]">
                  <Image src={thumbnail} alt="thumbnail preview" fill className="object-cover" sizes="192px" />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Deskripsi */}
      <div>
        <label className="label-field">Deskripsi <span className="text-[var(--muted)] font-normal">(opsional)</span></label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="input-field resize-none"
        />
      </div>

      {/* Urutan & Publish */}
      <div className="flex items-center gap-4">
        <div className="w-24">
          <label className="label-field">Urutan</label>
          <input type="number" min={0} value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="input-field" />
        </div>
        <label className="flex cursor-pointer items-center gap-2 pt-5">
          <input type="checkbox" checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent-red)]" />
          <span className="text-sm font-medium">Terbitkan</span>
        </label>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}
        className="w-full rounded-xl bg-[var(--accent-red)] px-4 py-3
          text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
        {saving ? 'Menyimpan...' : initial?.id ? 'Perbarui Video' : 'Tambah Video'}
      </button>
    </form>
  )
}
