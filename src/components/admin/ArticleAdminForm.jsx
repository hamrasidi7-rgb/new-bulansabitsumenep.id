'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { CHANNELS } from '@/lib/channels'

/**
 * Form tambah/edit artikel (Berita Kesehatan, Aksi Kemanusiaan, Dokter Menulis).
 * Props:
 *   initial  {object|null}  data artikel yang sedang diedit
 *   onSaved  {Function}     dipanggil setelah berhasil simpan
 */
export default function ArticleAdminForm({ initial = null, onSaved }) {
  const [title, setTitle]         = useState(initial?.title ?? '')
  const [slug, setSlug]           = useState(initial?.slug ?? '')
  const [channel, setChannel]     = useState(initial?.channel ?? 'berita-kesehatan')
  const [subchannel, setSubchan]  = useState(initial?.subchannel ?? '')
  const [excerpt, setExcerpt]     = useState(initial?.excerpt ?? '')
  const [content, setContent]     = useState(initial?.content ?? '')
  const [authorName, setAuthor]   = useState(initial?.author_name ?? '')
  const [tags, setTags]           = useState((initial?.tags ?? []).join(', '))
  const [published, setPublished] = useState(initial?.is_published ?? false)
  const [publishedAt, setPublAt]  = useState(
    initial?.published_at ? initial.published_at.slice(0, 16) : ''
  )
  const [coverUrl, setCoverUrl]   = useState(initial?.cover_url ?? '')
  const [coverPreview, setCoverP] = useState(initial?.cover_url ?? '')
  const [coverUploading, setCovU] = useState(false)
  const [saving, setSaving]       = useState(false)
  const [error, setError]         = useState('')

  // Kanal yang dipilih (untuk dropdown sub-kanal)
  const channelConfig = CHANNELS.find((c) => c.slug === channel)
  const isDokterMenulis = channel === 'dokter-menulis'

  // Auto-slug dari judul
  const handleTitle = (val) => {
    setTitle(val)
    if (!initial?.id) {
      setSlug(
        val.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .slice(0, 100)
      )
    }
  }

  // Saat kanal berubah, reset sub-kanal
  const handleChannel = (val) => {
    setChannel(val)
    setSubchan('')
  }

  // Upload cover ke bucket 'media'
  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCovU(true)
    const path = `article-covers/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error: upErr } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (upErr) { setError(upErr.message); setCovU(false); return }
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    setCoverUrl(data.publicUrl)
    setCoverP(data.publicUrl)
    setCovU(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const tagsArray = tags.split(',').map((t) => t.trim()).filter(Boolean)

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      channel,
      subchannel: isDokterMenulis ? null : (subchannel || null),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_url: coverUrl || null,
      author_name: authorName.trim() || null,
      tags: tagsArray,
      is_published: published,
      published_at: published
        ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString())
        : null,
    }

    let err
    if (initial?.id) {
      ;({ error: err } = await supabase.from('articles').update(payload).eq('id', initial.id))
    } else {
      ;({ error: err } = await supabase.from('articles').insert(payload))
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Judul */}
      <div>
        <label className="label-field">Judul Artikel</label>
        <input type="text" required value={title}
          onChange={(e) => handleTitle(e.target.value)}
          className="input-field" />
      </div>

      {/* Slug */}
      <div>
        <label className="label-field">Slug URL</label>
        <input type="text" required value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="input-field font-mono text-sm" />
      </div>

      {/* Kanal + sub-kanal */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Kanal</label>
          <select value={channel} onChange={(e) => handleChannel(e.target.value)}
            className="input-field">
            {CHANNELS.filter((c) => ['berita-kesehatan','aksi-kemanusiaan','dokter-menulis'].includes(c.slug))
              .map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
          </select>
        </div>

        {/* Sub-kanal (hanya untuk kanal dengan hierarki) */}
        {channelConfig?.hasSubchannels && (
          <div>
            <label className="label-field">Sub-kanal</label>
            <select value={subchannel} onChange={(e) => setSubchan(e.target.value)}
              className="input-field">
              <option value="">— Pilih sub-kanal —</option>
              {channelConfig.subchannels.map((s) => (
                <option key={s.slug} value={s.slug}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Author — khusus Dokter Menulis */}
      {isDokterMenulis && (
        <div>
          <label className="label-field">Nama Penulis (Dokter)</label>
          <input type="text" value={authorName}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="dr. Nama Penulis, Sp.X"
            className="input-field" />
        </div>
      )}

      {/* Excerpt */}
      <div>
        <label className="label-field">Ringkasan <span className="text-[var(--muted)] font-normal">(tampil di kartu artikel)</span></label>
        <textarea rows={3} value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="input-field resize-none" />
      </div>

      {/* Konten */}
      <div>
        <label className="label-field">Konten Artikel <span className="text-[var(--muted)] font-normal">(HTML atau Markdown)</span></label>
        <textarea rows={12} required value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field resize-y font-mono text-sm" />
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
            <Image src={coverPreview} alt="cover" fill className="object-cover" sizes="192px" />
          </div>
        )}
      </div>

      {/* Tags */}
      <div>
        <label className="label-field">Tag <span className="text-[var(--muted)] font-normal">(pisahkan dengan koma)</span></label>
        <input type="text" value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="kesehatan, pmi, donor-darah"
          className="input-field" />
      </div>

      {/* Publish + tanggal */}
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent-red)]" />
          <span className="text-sm font-medium">Terbitkan</span>
        </label>
        {published && (
          <div>
            <label className="label-field">Tanggal Terbit</label>
            <input type="datetime-local" value={publishedAt}
              onChange={(e) => setPublAt(e.target.value)}
              className="input-field" />
          </div>
        )}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 dark:bg-red-950/20 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={saving}
        className="w-full rounded-xl bg-[var(--accent-red)] px-4 py-3
          text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
        {saving ? 'Menyimpan...' : initial?.id ? 'Perbarui Artikel' : 'Terbitkan Artikel'}
      </button>
    </form>
  )
}
