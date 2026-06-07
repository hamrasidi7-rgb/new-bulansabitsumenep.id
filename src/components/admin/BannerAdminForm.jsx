'use client'

import { useState } from 'react'
import Image from 'next/image'
import { supabase } from '@/lib/supabaseClient'

const POSITIONS = [
  { value: 'leaderboard', label: 'Leaderboard — atas halaman (728×90)' },
  { value: 'strip',       label: 'Strip — antar paragraf artikel' },
  { value: 'rectangle',  label: 'Rectangle — tengah artikel (468×60)' },
]

const BG_COLORS = [
  { value: '#dc2626', label: 'Merah (PMI)' },
  { value: '#16a34a', label: 'Hijau' },
  { value: '#1d4ed8', label: 'Biru' },
  { value: '#d97706', label: 'Kuning/Emas' },
  { value: '#0f172a', label: 'Hitam' },
]

export default function BannerAdminForm({ initial = null, onSaved }) {
  const [title, setTitle]       = useState(initial?.title ?? '')
  const [position, setPosition] = useState(initial?.position ?? 'leaderboard')
  const [type, setType]         = useState(initial?.type ?? 'image')
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? '')
  const [imagePreview, setImagePreview] = useState(initial?.image_url ?? '')
  const [linkUrl, setLinkUrl]   = useState(initial?.link_url ?? '')
  const [content, setContent]   = useState(initial?.content ?? '')
  const [bgColor, setBgColor]   = useState(initial?.bg_color ?? '#dc2626')
  const [isActive, setActive]   = useState(initial?.is_active ?? true)
  const [sortOrder, setSort]    = useState(initial?.sort_order ?? 0)
  const [startsAt, setStartsAt] = useState(initial?.starts_at?.slice(0, 16) ?? '')
  const [endsAt, setEndsAt]     = useState(initial?.ends_at?.slice(0, 16) ?? '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState('')

  const handleImageFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const path = `banners/${Date.now()}-${file.name.replace(/\s/g, '_')}`
    const { error: upErr } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (upErr) { setError(upErr.message); setUploading(false); return }
    const url = supabase.storage.from('media').getPublicUrl(path).data.publicUrl
    setImageUrl(url); setImagePreview(url)
    setUploading(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const payload = {
      title: title.trim(),
      position,
      type,
      image_url: type === 'image' ? (imageUrl || null) : null,
      link_url: linkUrl.trim() || null,
      content: type === 'ucapan' ? (content.trim() || null) : null,
      bg_color: bgColor,
      is_active: isActive,
      sort_order: Number(sortOrder),
      starts_at: startsAt ? new Date(startsAt).toISOString() : null,
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
    }

    let err
    if (initial?.id) {
      ;({ error: err } = await supabase.from('banners').update(payload).eq('id', initial.id))
    } else {
      ;({ error: err } = await supabase.from('banners').insert(payload))
    }

    setSaving(false)
    if (err) { setError(err.message); return }
    onSaved?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Label internal */}
      <div>
        <label className="label-field">Label Banner <span className="font-normal text-[var(--muted)]">(hanya terlihat di admin)</span></label>
        <input type="text" required value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Misal: Ucapan Idul Adha 2026"
          className="input-field" />
      </div>

      {/* Posisi + Jenis */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Posisi</label>
          <select value={position} onChange={(e) => setPosition(e.target.value)} className="input-field">
            {POSITIONS.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
          </select>
        </div>
        <div>
          <label className="label-field">Jenis</label>
          <select value={type} onChange={(e) => setType(e.target.value)} className="input-field">
            <option value="image">Gambar/Iklan</option>
            <option value="ucapan">Ucapan / Pengumuman Teks</option>
          </select>
        </div>
      </div>

      {/* Konten gambar */}
      {type === 'image' && (
        <div className="rounded-xl border border-[var(--border)] p-4 space-y-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">Gambar Banner</p>
          <input type="file" accept="image/*" onChange={handleImageFile}
            className="block text-sm text-[var(--muted)] file:mr-3 file:rounded-lg file:border-0
              file:bg-red-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold
              file:text-[var(--accent-red)] hover:file:bg-red-100" />
          {uploading && <p className="text-xs text-[var(--muted)]">Mengupload...</p>}
          {imagePreview && (
            <div className="relative mt-2 aspect-[728/90] w-full max-w-sm overflow-hidden rounded-lg border border-[var(--border)]">
              <Image src={imagePreview} alt="preview" fill className="object-cover" sizes="384px" />
            </div>
          )}
          <div>
            <label className="label-field">URL Tujuan Klik <span className="font-normal text-[var(--muted)]">(opsional)</span></label>
            <input type="url" value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://..."
              className="input-field" />
          </div>
        </div>
      )}

      {/* Konten ucapan */}
      {type === 'ucapan' && (
        <div className="rounded-xl border border-[var(--border)] p-4 space-y-3">
          <p className="text-sm font-semibold text-[var(--foreground)]">Ucapan / Pengumuman</p>
          <div>
            <label className="label-field">Teks</label>
            <textarea rows={3} value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Selamat Hari Raya Idul Adha 1447 H — PMI Sumenep"
              className="input-field resize-none" />
          </div>
          <div>
            <label className="label-field">Warna Latar</label>
            <div className="flex gap-2 mt-1">
              {BG_COLORS.map((c) => (
                <button key={c.value} type="button" title={c.label}
                  onClick={() => setBgColor(c.value)}
                  style={{ backgroundColor: c.value }}
                  className={`h-8 w-8 rounded-full border-2 transition
                    ${bgColor === c.value ? 'border-[var(--foreground)] scale-110' : 'border-transparent'}`} />
              ))}
            </div>
          </div>
          {/* Preview ucapan */}
          {content && (
            <div className="rounded-lg px-4 py-3 text-center text-sm font-semibold text-white"
              style={{ backgroundColor: bgColor }}>
              {content}
            </div>
          )}
        </div>
      )}

      {/* Jadwal tayang */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label-field">Mulai Tayang <span className="font-normal text-[var(--muted)]">(opsional)</span></label>
          <input type="datetime-local" value={startsAt}
            onChange={(e) => setStartsAt(e.target.value)} className="input-field" />
        </div>
        <div>
          <label className="label-field">Selesai Tayang <span className="font-normal text-[var(--muted)]">(opsional)</span></label>
          <input type="datetime-local" value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)} className="input-field" />
        </div>
      </div>

      {/* Urutan & Aktif */}
      <div className="flex items-center gap-6">
        <div className="w-24">
          <label className="label-field">Urutan</label>
          <input type="number" min={0} value={sortOrder}
            onChange={(e) => setSort(e.target.value)} className="input-field" />
        </div>
        <label className="flex cursor-pointer items-center gap-2 pt-5">
          <input type="checkbox" checked={isActive}
            onChange={(e) => setActive(e.target.checked)}
            className="h-4 w-4 rounded border-[var(--border)] accent-[var(--accent-red)]" />
          <span className="text-sm font-medium">Aktifkan</span>
        </label>
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button type="submit" disabled={saving}
        className="w-full rounded-xl bg-[var(--accent-red)] px-4 py-3
          text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50">
        {saving ? 'Menyimpan...' : initial?.id ? 'Perbarui Banner' : 'Simpan Banner'}
      </button>
    </form>
  )
}
