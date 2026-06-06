'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { GALLERY_CATEGORIES } from '@/lib/channels'
import PhotoUploader from './PhotoUploader'

/**
 * Form buat/edit album galeri + upload foto.
 * Props:
 *   initial  {object|null}  data album yang sedang diedit
 *   onSaved  {Function}     dipanggil setelah berhasil simpan
 */
export default function GalleryAdminForm({ initial = null, onSaved }) {
  const [title, setTitle]         = useState(initial?.title ?? '')
  const [slug, setSlug]           = useState(initial?.slug ?? '')
  const [description, setDesc]    = useState(initial?.description ?? '')
  const [category, setCategory]   = useState(initial?.category ?? 'lainnya')
  const [eventDate, setEventDate] = useState(initial?.event_date ?? '')
  const [published, setPublished] = useState(initial?.is_published ?? true)
  const [sortOrder, setSortOrder] = useState(initial?.sort_order ?? 0)
  const [coverUrl, setCoverUrl]   = useState(initial?.cover_url ?? '')
  const [coverPreview, setCoverPreview] = useState(initial?.cover_url ?? '')
  const [coverUploading, setCoverUploading] = useState(false)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')
  const [savedId, setSavedId]     = useState(initial?.id ?? null)

  // Auto-slug dari judul
  const handleTitle = (val) => {
    setTitle(val)
    if (!initial?.id) {
      setSlug(
        val.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 80)
      )
    }
  }

  // Upload cover ke bucket 'gallery'
  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCoverUploading(true)
    const path = `covers/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error: upErr } = await supabase.storage.from('gallery').upload(path, file, { upsert: true })
    if (upErr) { setError(upErr.message); setCoverUploading(false); return }
    const { data } = supabase.storage.from('gallery').getPublicUrl(path)
    setCoverUrl(data.publicUrl)
    setCoverPreview(data.publicUrl)
    setCoverUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim() || null,
      cover_url: coverUrl || null,
      event_date: eventDate || null,
      category,
      is_published: published,
      sort_order: Number(sortOrder),
    }

    let id = savedId
    if (id) {
      const { error: err } = await supabase.from('galleries').update(payload).eq('id', id)
      if (err) { setError(err.message); setSaving(false); return }
    } else {
      const { data, error: err } = await supabase.from('galleries').insert(payload).select().single()
      if (err) { setError(err.message); setSaving(false); return }
      id = data.id
      setSavedId(id)
    }

    setSaving(false)
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Judul */}
      <div>
        <label className="label-field">Judul Album</label>
        <input type="text" required value={title}
          onChange={(e) => handleTitle(e.target.value)}
          placeholder="Bakti Kesehatan Kangean 2026"
          className="input-field" />
      </div>

      {/* Slug */}
      <div>
        <label className="label-field">Slug URL</label>
        <input type="text" required value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="bakti-kesehatan-kangean-2026"
          className="input-field font-mono text-sm" />
      </div>

      {/* Deskripsi */}
      <div>
        <label className="label-field">Deskripsi <span className="text-[var(--muted)] font-normal">(opsional)</span></label>
        <textarea rows={3} value={description}
          onChange={(e) => setDesc(e.target.value)}
          className="input-field resize-none" />
      </div>

      {/* Kategori & Tanggal */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Kategori</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="input-field">
            {GALLERY_CATEGORIES.filter((c) => c.value).map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-field">Tanggal Event</label>
          <input type="date" value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="input-field" />
        </div>
      </div>

      {/* Cover */}
      <div>
        <label className="label-field">Foto Cover</label>
        <input type="file" accept="image/*" onChange={handleCoverFile}
          className="block text-sm text-[var(--muted)] file:mr-3 file:rounded-lg file:border-0
            file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-[var(--accent-red)]
            hover:file:bg-red-100" />
        {coverUploading && <p className="mt-1 text-xs text-[var(--muted)]">Mengupload...</p>}
        {coverPreview && (
          <div className="relative mt-2 aspect-video w-48 overflow-hidden rounded-lg border border-[var(--border)]">
            <Image src={coverPreview} alt="cover preview" fill className="object-cover" sizes="192px" />
          </div>
        )}
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
        <p className="rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}
        className="w-full rounded-xl bg-[var(--accent-red)] px-4 py-3
          text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
        {saving ? 'Menyimpan...' : savedId ? 'Perbarui Album' : 'Buat Album'}
      </button>

      {/* Upload foto hanya muncul setelah album tersimpan */}
      {savedId && (
        <div className="mt-8 rounded-xl border border-[var(--border)] p-4">
          <h3 className="mb-4 font-semibold text-[var(--foreground)]">Upload Foto ke Album</h3>
          <PhotoUploader galleryId={savedId} existing={[]} onUpdate={onSaved} />
        </div>
      )}
    </form>
  )
}
