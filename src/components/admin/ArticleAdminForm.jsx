'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'
import { CHANNELS } from '@/lib/channels'

export default function ArticleAdminForm({ initial = null, onSaved }) {
  const [title, setTitle]           = useState(initial?.title ?? '')
  const [slug, setSlug]             = useState(initial?.slug ?? '')
  const [channel, setChannel]       = useState(initial?.channel ?? 'berita-kesehatan')
  const [subchannel, setSubchan]    = useState(initial?.subchannel ?? '')
  const [excerpt, setExcerpt]       = useState(initial?.excerpt ?? '')
  const [content, setContent]       = useState(initial?.content ?? '')
  const [authorName, setAuthor]     = useState(initial?.author_name ?? '')
  const [authorRole, setAuthorRole] = useState(initial?.author_role ?? '')
  const [authorPhoto, setAuthorPhoto]     = useState(initial?.author_photo ?? '')
  const [authorPhotoPreview, setAuthorPhotoPreview] = useState(initial?.author_photo ?? '')
  const [authorPhotoUploading, setAuthorPhotoU]     = useState(false)
  const [tags, setTags]             = useState((initial?.tags ?? []).join(', '))
  const [published, setPublished]   = useState(initial?.is_published ?? false)
  const [isVerified, setVerified]   = useState(initial?.is_verified ?? false)
  const [publishedAt, setPublAt]    = useState(
    initial?.published_at ? initial.published_at.slice(0, 16) : ''
  )

  // Foto utama
  const [coverUrl, setCoverUrl]         = useState(initial?.cover_url ?? '')
  const [coverPreview, setCoverPreview] = useState(initial?.cover_url ?? '')
  const [heroCaption, setHeroCaption]   = useState(initial?.hero_caption ?? '')
  const [heroCredit, setHeroCredit]     = useState(initial?.hero_credit ?? '')
  const [coverUploading, setCovU]       = useState(false)

  // Foto kedua (inline)
  const initImg = initial?.body_images?.[0] ?? null
  const [img2Url, setImg2Url]           = useState(initImg?.src ?? '')
  const [img2Preview, setImg2Preview]   = useState(initImg?.src ?? '')
  const [img2Alt, setImg2Alt]           = useState(initImg?.alt ?? '')
  const [img2Caption, setImg2Caption]   = useState(initImg?.caption ?? '')
  const [img2Credit, setImg2Credit]     = useState(initImg?.credit ?? '')
  const [img2After, setImg2After]       = useState(initImg?.afterParagraph ?? 1)
  const [img2Uploading, setImg2U]       = useState(false)

  const [saving, setSaving]   = useState(false)
  const [error, setError]     = useState('')

  const channelConfig = CHANNELS.find((c) => c.slug === channel)
  const isDokterMenulis = channel === 'dokter-menulis'

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

  const handleChannel = (val) => { setChannel(val); setSubchan('') }

  const uploadImage = async (file, folder) => {
    const path = `${folder}/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error: upErr } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (upErr) throw upErr
    return supabase.storage.from('media').getPublicUrl(path).data.publicUrl
  }

  const handleAuthorPhotoFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setAuthorPhotoU(true)
    try {
      const url = await uploadImage(file, 'author-photos')
      setAuthorPhoto(url); setAuthorPhotoPreview(url)
    } catch (err) { setError(err.message) }
    setAuthorPhotoU(false)
  }

  const handleCoverFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setCovU(true)
    try {
      const url = await uploadImage(file, 'article-covers')
      setCoverUrl(url); setCoverPreview(url)
    } catch (err) { setError(err.message) }
    setCovU(false)
  }

  const handleImg2File = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImg2U(true)
    try {
      const url = await uploadImage(file, 'article-body')
      setImg2Url(url); setImg2Preview(url)
    } catch (err) { setError(err.message) }
    setImg2U(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const bodyImages = img2Url
      ? [{ src: img2Url, alt: img2Alt, caption: img2Caption, credit: img2Credit, afterParagraph: Number(img2After) }]
      : []

    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      channel,
      subchannel: isDokterMenulis ? null : (subchannel || null),
      excerpt: excerpt.trim() || null,
      content: content.trim(),
      cover_url: coverUrl || null,
      hero_caption: heroCaption.trim() || null,
      hero_credit: heroCredit.trim() || null,
      author_name: authorName.trim() || null,
      author_role: authorRole.trim() || null,
      author_photo: authorPhoto || null,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      is_published: published,
      is_verified: isVerified,
      published_at: published
        ? (publishedAt ? new Date(publishedAt).toISOString() : new Date().toISOString())
        : null,
      body_images: bodyImages,
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
          onChange={(e) => handleTitle(e.target.value)} className="input-field" />
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
          <select value={channel} onChange={(e) => handleChannel(e.target.value)} className="input-field">
            {CHANNELS.filter((c) => ['berita-kesehatan','aksi-kemanusiaan','dokter-menulis'].includes(c.slug))
              .map((c) => <option key={c.slug} value={c.slug}>{c.label}</option>)}
          </select>
        </div>
        {channelConfig?.hasSubchannels && (
          <div>
            <label className="label-field">Sub-kanal</label>
            <select value={subchannel} onChange={(e) => setSubchan(e.target.value)} className="input-field">
              <option value="">— Pilih sub-kanal —</option>
              {channelConfig.subchannels.map((s) => (
                <option key={s.slug} value={s.slug}>{s.label}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* ── IDENTITAS PENULIS ──────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border)] p-4 space-y-4">
        <p className="font-semibold text-sm text-[var(--foreground)]">Identitas Penulis</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-field">Nama Penulis</label>
            <input type="text" value={authorName}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={isDokterMenulis ? 'dr. Nama Penulis, Sp.X' : 'Redaksi BSS'}
              className="input-field" />
          </div>
          <div>
            <label className="label-field">Jabatan / Peran</label>
            <input type="text" value={authorRole}
              onChange={(e) => setAuthorRole(e.target.value)}
              placeholder={isDokterMenulis ? 'Dokter Spesialis Jantung, RSUD Sumenep' : 'Jurnalis Kesehatan, BSS'}
              className="input-field" />
          </div>
        </div>

        <div>
          <label className="label-field">Foto Penulis <span className="font-normal text-[var(--muted)]">(opsional, rasio 1:1)</span></label>
          <input type="file" accept="image/*" onChange={handleAuthorPhotoFile}
            className="block text-sm text-[var(--muted)] file:mr-3 file:rounded-lg file:border-0
              file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold
              file:text-[var(--accent-red)] hover:file:bg-red-100" />
          {authorPhotoUploading && <p className="mt-1 text-xs text-[var(--muted)]">Mengupload...</p>}
          {authorPhotoPreview && (
            <div className="relative mt-2 h-16 w-16 overflow-hidden rounded-full border border-[var(--border)]">
              <Image src={authorPhotoPreview} alt="foto penulis" fill className="object-cover" sizes="64px" />
            </div>
          )}
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="label-field">Ringkasan <span className="text-[var(--muted)] font-normal">(tampil di kartu artikel)</span></label>
        <textarea rows={3} value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)} className="input-field resize-none" />
      </div>

      {/* Konten */}
      <div>
        <label className="label-field">Konten Artikel <span className="text-[var(--muted)] font-normal">(HTML)</span></label>
        <textarea rows={12} required value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field resize-y font-mono text-sm" />
      </div>

      {/* ── FOTO UTAMA ─────────────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border)] p-4 space-y-4">
        <p className="font-semibold text-sm text-[var(--foreground)]">Foto Utama (Hero)</p>

        <div>
          <label className="label-field">Upload Foto</label>
          <input type="file" accept="image/*" onChange={handleCoverFile}
            className="block text-sm text-[var(--muted)] file:mr-3 file:rounded-lg file:border-0
              file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold
              file:text-[var(--accent-red)] hover:file:bg-red-100" />
          {coverUploading && <p className="mt-1 text-xs text-[var(--muted)]">Mengupload...</p>}
          {coverPreview && (
            <div className="relative mt-2 aspect-video w-48 overflow-hidden rounded-lg border border-[var(--border)]">
              <Image src={coverPreview} alt="cover" fill className="object-cover" sizes="192px" />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-field">Caption Foto</label>
            <input type="text" value={heroCaption}
              onChange={(e) => setHeroCaption(e.target.value)}
              placeholder="Keterangan foto hero..."
              className="input-field" />
          </div>
          <div>
            <label className="label-field">Sumber/Credit</label>
            <input type="text" value={heroCredit}
              onChange={(e) => setHeroCredit(e.target.value)}
              placeholder="Nama fotografer / instansi"
              className="input-field" />
          </div>
        </div>
      </div>

      {/* ── FOTO KEDUA (inline) ────────────────────────────────── */}
      <div className="rounded-xl border border-[var(--border)] p-4 space-y-4">
        <p className="font-semibold text-sm text-[var(--foreground)]">Foto Kedua <span className="font-normal text-[var(--muted)]">(opsional, disisipkan di badan artikel)</span></p>

        <div>
          <label className="label-field">Upload Foto</label>
          <input type="file" accept="image/*" onChange={handleImg2File}
            className="block text-sm text-[var(--muted)] file:mr-3 file:rounded-lg file:border-0
              file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold
              file:text-[var(--accent-red)] hover:file:bg-red-100" />
          {img2Uploading && <p className="mt-1 text-xs text-[var(--muted)]">Mengupload...</p>}
          {img2Preview && (
            <div className="relative mt-2 aspect-video w-48 overflow-hidden rounded-lg border border-[var(--border)]">
              <Image src={img2Preview} alt="foto kedua" fill className="object-cover" sizes="192px" />
            </div>
          )}
        </div>

        {img2Url && (
          <>
            <div>
              <label className="label-field">Alt Text <span className="font-normal text-[var(--muted)]">(deskripsi gambar untuk aksesibilitas)</span></label>
              <input type="text" value={img2Alt}
                onChange={(e) => setImg2Alt(e.target.value)}
                placeholder="Deskripsi singkat gambar"
                className="input-field" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-field">Caption Foto</label>
                <input type="text" value={img2Caption}
                  onChange={(e) => setImg2Caption(e.target.value)}
                  placeholder="Keterangan foto..."
                  className="input-field" />
              </div>
              <div>
                <label className="label-field">Sumber/Credit</label>
                <input type="text" value={img2Credit}
                  onChange={(e) => setImg2Credit(e.target.value)}
                  placeholder="Nama fotografer / instansi"
                  className="input-field" />
              </div>
            </div>
            <div className="w-32">
              <label className="label-field">Setelah paragraf ke-</label>
              <input type="number" min={1} value={img2After}
                onChange={(e) => setImg2After(e.target.value)}
                className="input-field" />
            </div>
          </>
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

      {/* Publish + tanggal + verified */}
      <div className="flex flex-wrap items-end gap-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={published}
            onChange={(e) => setPublished(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent-red)]" />
          <span className="text-sm font-medium">Terbitkan</span>
        </label>
        <label className="flex cursor-pointer items-center gap-2">
          <input type="checkbox" checked={isVerified}
            onChange={(e) => setVerified(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent-red)]" />
          <span className="text-sm font-medium">Terverifikasi</span>
        </label>
        {published && (
          <div>
            <label className="label-field">Tanggal Terbit</label>
            <input type="datetime-local" value={publishedAt}
              onChange={(e) => setPublAt(e.target.value)} className="input-field" />
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
