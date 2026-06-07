'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import VideoAdminForm from '@/components/admin/VideoAdminForm'

export default function AdminVideoPage() {
  const [videos, setVideos]     = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)
  const [deleting, setDeleting] = useState(null)

  const fetchVideos = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('videos')
      .select('id, title, platform, video_url, is_published, sort_order')
      .order('sort_order', { ascending: true })
    setVideos(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchVideos() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Hapus video ini?')) return
    setDeleting(id)
    await supabase.from('videos').delete().eq('id', id)
    setDeleting(null)
    fetchVideos()
  }

  const handleSaved = () => {
    setEditing(null)
    fetchVideos()
  }

  if (editing !== null) {
    return (
      <div>
        <button onClick={() => setEditing(null)}
          className="mb-6 flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          ← Kembali ke daftar
        </button>
        <h1 className="mb-6 text-xl font-bold text-[var(--foreground)]">
          {editing === 'new' ? 'Tambah Video' : 'Edit Video'}
        </h1>
        <VideoAdminForm
          initial={editing === 'new' ? null : editing}
          onSaved={handleSaved}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--foreground)]">Video Story</h1>
        <button onClick={() => setEditing('new')}
          className="rounded-lg bg-[var(--accent-red)] px-4 py-2 text-sm font-semibold
            text-white hover:opacity-90 transition">
          + Tambah Video
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Memuat...</p>
      ) : videos.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Belum ada video.</p>
      ) : (
        <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
          {videos.map((v) => (
            <div key={v.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">{v.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {v.platform} · Urutan #{v.sort_order}
                  {' · '}
                  <span className={v.is_published ? 'text-green-600' : 'text-amber-500'}>
                    {v.is_published ? 'Terbit' : 'Draft'}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(v)}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5
                    text-xs font-medium hover:bg-[var(--card-bg)] transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(v.id)} disabled={deleting === v.id}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs
                    font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-40">
                  {deleting === v.id ? '...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
