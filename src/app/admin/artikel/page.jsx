'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import ArticleAdminForm from '@/components/admin/ArticleAdminForm'

export default function AdminArtikelPage() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [editing, setEditing]   = useState(null)   // null = tutup, 'new' = form baru, object = edit
  const [deleting, setDeleting] = useState(null)

  const fetchArticles = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('articles')
      .select('id, title, slug, channel, subchannel, is_published, published_at')
      .order('published_at', { ascending: false })
    setArticles(data ?? [])
    setLoading(false)
  }

  useEffect(() => { fetchArticles() }, [])

  const handleDelete = async (id) => {
    if (!confirm('Hapus artikel ini?')) return
    setDeleting(id)
    await supabase.from('articles').delete().eq('id', id)
    setDeleting(null)
    fetchArticles()
  }

  const handleSaved = () => {
    setEditing(null)
    fetchArticles()
  }

  if (editing !== null) {
    return (
      <div>
        <button onClick={() => setEditing(null)}
          className="mb-6 flex items-center gap-1 text-sm text-[var(--muted)] hover:text-[var(--foreground)]">
          ← Kembali ke daftar
        </button>
        <h1 className="mb-6 text-xl font-bold text-[var(--foreground)]">
          {editing === 'new' ? 'Tambah Artikel' : 'Edit Artikel'}
        </h1>
        <ArticleAdminForm
          initial={editing === 'new' ? null : editing}
          onSaved={handleSaved}
        />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-bold text-[var(--foreground)]">Artikel</h1>
        <button onClick={() => setEditing('new')}
          className="rounded-lg bg-[var(--accent-red)] px-4 py-2 text-sm font-semibold
            text-white hover:opacity-90 transition">
          + Tambah Artikel
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-[var(--muted)]">Memuat...</p>
      ) : articles.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">Belum ada artikel. Tambahkan yang pertama.</p>
      ) : (
        <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
          {articles.map((a) => (
            <div key={a.id} className="flex items-start justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">{a.title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)]">
                  {a.channel}{a.subchannel ? ` / ${a.subchannel}` : ''}
                  {' · '}
                  <span className={a.is_published ? 'text-green-600' : 'text-amber-500'}>
                    {a.is_published ? 'Terbit' : 'Draft'}
                  </span>
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button onClick={() => setEditing(a)}
                  className="rounded-lg border border-[var(--border)] px-3 py-1.5
                    text-xs font-medium hover:bg-[var(--card-bg)] transition">
                  Edit
                </button>
                <button onClick={() => handleDelete(a.id)} disabled={deleting === a.id}
                  className="rounded-lg border border-red-200 px-3 py-1.5 text-xs
                    font-medium text-red-600 hover:bg-red-50 transition disabled:opacity-40">
                  {deleting === a.id ? '...' : 'Hapus'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
