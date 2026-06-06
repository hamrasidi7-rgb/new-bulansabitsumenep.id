'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'
import { supabase } from '@/lib/supabaseClient'

/**
 * Multi-upload foto ke Supabase Storage bucket 'gallery'.
 * Fitur: kompres sebelum upload, drag-to-reorder, edit caption, hapus foto.
 *
 * Props:
 *   galleryId {string}  UUID album yang sudah ada
 *   existing  {Array}   foto yang sudah ada (dari DB)
 *   onUpdate  {Function} dipanggil setelah perubahan tersimpan
 */
export default function PhotoUploader({ galleryId, existing = [], onUpdate }) {
  const [photos, setPhotos] = useState(existing)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState({}) // key: namaFile, value: 0-100
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const dragItem = useRef(null)
  const fileInputRef = useRef(null)

  // ── Upload file baru ─────────────────────────────────────────────────
  const handleFiles = async (files) => {
    const fileList = Array.from(files)
    setUploading(true)

    for (const file of fileList) {
      const key = file.name + Date.now()
      setProgress((p) => ({ ...p, [key]: 5 }))

      try {
        // Kompres gambar sebelum upload (maks 1 MB, maks 1920px)
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          onProgress: (pct) => setProgress((p) => ({ ...p, [key]: Math.round(pct * 0.8) })),
        })
        setProgress((p) => ({ ...p, [key]: 85 }))

        const ext = file.name.split('.').pop()
        const path = `${galleryId}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

        const { error: upErr } = await supabase.storage
          .from('gallery')
          .upload(path, compressed, { contentType: file.type, upsert: false })

        if (upErr) throw upErr

        const { data: urlData } = supabase.storage.from('gallery').getPublicUrl(path)
        setProgress((p) => ({ ...p, [key]: 95 }))

        const maxOrder = photos.reduce((m, p) => Math.max(m, p.sort_order ?? 0), 0)

        const { data: dbRow, error: dbErr } = await supabase
          .from('gallery_photos')
          .insert({ gallery_id: galleryId, image_url: urlData.publicUrl, sort_order: maxOrder + 1 })
          .select()
          .single()

        if (dbErr) throw dbErr

        setPhotos((prev) => [...prev, dbRow])
        setProgress((p) => ({ ...p, [key]: 100 }))
      } catch (err) {
        console.error('Upload gagal:', err)
        setProgress((p) => ({ ...p, [key]: -1 })) // -1 = error
      }
    }

    setUploading(false)
    onUpdate?.()
  }

  // ── Drag-drop upload ─────────────────────────────────────────────────
  const handleDrop = (e) => {
    e.preventDefault()
    if (e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files)
  }

  // ── Drag-to-reorder ──────────────────────────────────────────────────
  const handleDragStart = (index) => { dragItem.current = index }
  const handleDragEnter = (index) => { setDragOverIndex(index) }

  const handleDragEnd = async () => {
    if (dragItem.current === null || dragOverIndex === null || dragItem.current === dragOverIndex) {
      dragItem.current = null
      setDragOverIndex(null)
      return
    }
    const reordered = [...photos]
    const [moved] = reordered.splice(dragItem.current, 1)
    reordered.splice(dragOverIndex, 0, moved)

    // Update sort_order
    const updated = reordered.map((p, i) => ({ ...p, sort_order: i }))
    setPhotos(updated)
    dragItem.current = null
    setDragOverIndex(null)

    // Simpan ke DB
    await Promise.all(
      updated.map((p) =>
        supabase.from('gallery_photos').update({ sort_order: p.sort_order }).eq('id', p.id)
      )
    )
    onUpdate?.()
  }

  // ── Edit caption ─────────────────────────────────────────────────────
  const handleCaptionChange = (id, value) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, caption: value } : p)))
  }

  const saveCaption = async (id, caption) => {
    await supabase.from('gallery_photos').update({ caption: caption || null }).eq('id', id)
    onUpdate?.()
  }

  // ── Hapus foto ───────────────────────────────────────────────────────
  const deletePhoto = async (photo) => {
    if (!confirm(`Hapus foto ini?`)) return
    await supabase.from('gallery_photos').delete().eq('id', photo.id)
    // Hapus dari storage juga jika URL mengandung path storage
    const path = photo.image_url.split('/gallery/')[1]
    if (path) await supabase.storage.from('gallery').remove([path])
    setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
    onUpdate?.()
  }

  return (
    <div>
      {/* Area drop upload */}
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current?.click()}
        className="mb-4 flex cursor-pointer flex-col items-center justify-center gap-2
          rounded-xl border-2 border-dashed border-[var(--border)] p-8 text-center
          hover:border-[var(--accent-red)] transition-colors"
      >
        <svg className="h-8 w-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p className="text-sm text-[var(--muted)]">
          Klik atau seret foto ke sini
        </p>
        <p className="text-xs text-[var(--muted)]">JPG, PNG, WebP — dikompres otomatis sebelum upload</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files && handleFiles(e.target.files)}
        />
      </div>

      {/* Progress upload */}
      {Object.keys(progress).length > 0 && (
        <div className="mb-4 space-y-2">
          {Object.entries(progress).map(([key, pct]) => (
            <div key={key}>
              <div className="flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{pct === -1 ? '✕ Gagal upload' : pct === 100 ? '✓ Selesai' : `${pct}%`}</span>
              </div>
              <div className="mt-0.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className={`h-full rounded-full transition-all duration-300
                    ${pct === -1 ? 'bg-red-500' : 'bg-[var(--accent-red)]'}`}
                  style={{ width: `${pct === -1 ? 100 : pct}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grid foto — draggable untuk reorder */}
      {photos.length > 0 && (
        <div>
          <p className="mb-2 text-xs text-[var(--muted)]">
            Seret kartu untuk mengubah urutan tampil.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                draggable
                onDragStart={() => handleDragStart(i)}
                onDragEnter={() => handleDragEnter(i)}
                onDragEnd={handleDragEnd}
                className={`group flex flex-col rounded-xl border bg-[var(--card)]
                  cursor-grab active:cursor-grabbing transition-all duration-150
                  ${dragOverIndex === i ? 'border-[var(--accent-red)] scale-105' : 'border-[var(--border)]'}`}
              >
                {/* Gambar */}
                <div className="relative aspect-square overflow-hidden rounded-t-xl">
                  <Image src={photo.image_url} alt={photo.caption ?? `Foto ${i + 1}`} fill
                    className="object-cover" sizes="180px" />
                  {/* Tombol hapus */}
                  <button
                    onClick={() => deletePhoto(photo)}
                    aria-label="Hapus foto"
                    className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center
                      rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/>
                    </svg>
                  </button>
                </div>

                {/* Caption */}
                <div className="p-2">
                  <input
                    type="text"
                    value={photo.caption ?? ''}
                    onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                    onBlur={(e) => saveCaption(photo.id, e.target.value)}
                    placeholder="Caption foto..."
                    className="w-full rounded-md border border-[var(--border)] bg-transparent
                      px-2 py-1 text-xs text-[var(--foreground)] placeholder:text-[var(--muted)]
                      focus:border-[var(--accent-red)] focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
