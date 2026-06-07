'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import GalleryAdminForm from '@/components/admin/GalleryAdminForm'

export default function AdminGaleriPage() {
  const [galleries, setGalleries] = useState([])
  const [loading, setLoading]     = useState(true)
  const [editing, setEditing]     = useState(null)
  const [deleting, setDeleting]   = useState(null)

  const fetchGalleries = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('galleries')
      .select('id, title, slug, category, event_date, is_published, sort_order')
      .order('sort_order', { ascending: true })
    setGalleries(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchGalleries() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Hapus album ini beserta semua fotonya?')) return
    setDeleting(id)
    await supabase.from('galleries').delete().eq('id', id)
    setDeleting(null)
    fetchGalleries()
  }

  const handleSaved = () => {
    setEditing(null)
    fetchGalleries()
  }

  if (editing !== null) {
    return (
      <div>
        <button onClick={() => setEditing(null)}
          className="mb-6 flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          ← Kembali ke daftar
        </button>
        <h1 className="mb-6 text-xl font-bold text-[var(--foreground)]">
          {editing === 'new' ? 'Buat Album Baru' : 'Edit Album'}
        </h1>
        <GalleryAdminForm
          initial={editing === 'new' ? null : editing}
          onSaved={handleSaved}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--foreground)]">Galeri Foto</h1>
        <button onClick={() => setEditing('new')}
          className="rounded-lg bg-[var(--accent-red)] px-4 py-2 text-sm font-semibold
            text-white hover:opacity-90 transition">
          + Buat Album
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Memuat...</p>
      ) : galleries.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Belum ada album.</p>
      ) : (
        <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
          {galleries.map((g) => (
            <div key={g.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">{g.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {g.category} · {g.event_date ?? '—'}
                  {' · '}
                  <span className={g.is_published ? 'text-green-600' : 'text-amber-500'}>
                    {g.is_published ? 'Terbit' : 'Draft'}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(g)}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5
                    text-xs font-medium hover:bg-[var(--card-bg)] transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(g.id)} disabled={deleting === g.id}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs
                    font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-40">
                  {deleting === g.id ? '...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
