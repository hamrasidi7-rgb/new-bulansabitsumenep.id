'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import BannerAdminForm from '@/components/admin/BannerAdminForm'

const POSITION_LABEL = {
  leaderboard: 'Leaderboard',
  strip: 'Strip',
  rectangle: 'Rectangle',
}

export default function AdminBannerPage() {
  const [banners, setBanners]   = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)
  const [deleting, setDeleting] = useState(null)

  const fetchBanners = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('banners')
      .select('*')
      .order('sort_order', { ascending: true })
    setBanners(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchBanners() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Hapus banner ini?')) return
    setDeleting(id)
    await supabase.from('banners').delete().eq('id', id)
    setDeleting(null)
    fetchBanners()
  }

  const handleToggle = async (id, current) => {
    await supabase.from('banners').update({ is_active: !current }).eq('id', id)
    fetchBanners()
  }

  const handleSaved = () => {
    setEditing(null)
    fetchBanners()
  }

  if (editing !== null) {
    return (
      <div>
        <button onClick={() => setEditing(null)}
          className="mb-6 flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          ← Kembali ke daftar
        </button>
        <h1 className="mb-6 text-xl font-bold text-[var(--foreground)]">
          {editing === 'new' ? 'Tambah Banner' : 'Edit Banner'}
        </h1>
        <BannerAdminForm
          initial={editing === 'new' ? null : editing}
          onSaved={handleSaved}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[var(--foreground)]">Banner & Ucapan</h1>
          <p className="text-sm text-[var(--muted)]">Iklan, pengumuman, & ucapan yang tampil di website</p>
        </div>
        <button onClick={() => setEditing('new')}
          className="rounded-lg bg-[var(--accent-red)] px-4 py-2 text-sm font-semibold
            text-white hover:opacity-90 transition">
          + Tambah Banner
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Memuat...</p>
      ) : banners.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Belum ada banner.</p>
      ) : (
        <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
          {banners.map((b) => (
            <div key={b.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">{b.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {POSITION_LABEL[b.position] ?? b.position}
                  {' · '}
                  {b.type === 'ucapan' ? 'Ucapan' : 'Gambar'}
                  {' · '}
                  <span className={b.is_active ? 'text-green-600' : 'text-amber-500'}>
                    {b.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => handleToggle(b.id, b.is_active)}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5
                    text-xs font-medium hover:bg-[var(--card-bg)] transition">
                  {b.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                </button>
                <button onClick={() => setEditing(b)}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5
                    text-xs font-medium hover:bg-[var(--card-bg)] transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(b.id)} disabled={deleting === b.id}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs
                    font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-40">
                  {deleting === b.id ? '...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
