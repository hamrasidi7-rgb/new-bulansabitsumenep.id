'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

function StatCard({ label, value, color = '' }) {
  return (
    <div className={`rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4 ${color}`}>
      <p className="text-2xl font-bold text-[var(--foreground)]">{value ?? '—'}</p>
      <p className="text-sm font-medium text-[var(--foreground)]">{label}</p>
    </div>
  )
}

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis': 'Dokter Menulis',
}

export default function AdminSeoPage() {
  const [stats, setStats]           = useState(null)
  const [topArticles, setTop]       = useState([])
  const [auditIssues, setAudit]     = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    async function load() {
      const [
        { count: published },
        { count: draft },
        { count: videos },
        { count: galleries },
        { count: banners },
        { data: top },
        { data: issues },
      ] = await Promise.all([
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_published', true),
        supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_published', false),
        supabase.from('videos').select('id', { count: 'exact', head: true }),
        supabase.from('galleries').select('id', { count: 'exact', head: true }),
        supabase.from('banners').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('articles')
          .select('title,slug,channel,view_count,published_at')
          .eq('is_published', true)
          .order('view_count', { ascending: false })
          .limit(10),
        supabase.from('articles')
          .select('title,slug,channel,excerpt,cover_url')
          .eq('is_published', true)
          .or('excerpt.is.null,cover_url.is.null'),
      ])
      setStats({ published, draft, videos, galleries, banners })
      setTop(top ?? [])
      setAudit(issues ?? [])
      setLoading(false)
    }
    load()
  }, [])

  if (loading) return <p className="text-sm text-[var(--muted)]">Memuat data...</p>

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-[var(--foreground)]">SEO & Traffic</h1>
      <p className="mb-6 text-sm text-[var(--muted)]">Ringkasan konten dan audit SEO</p>

      {/* Ringkasan */}
      <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard label="Artikel Terbit" value={stats?.published} />
        <StatCard label="Draft" value={stats?.draft} />
        <StatCard label="Video" value={stats?.videos} />
        <StatCard label="Galeri" value={stats?.galleries} />
        <StatCard label="Banner Aktif" value={stats?.banners} />
      </div>

      {/* Artikel Terpopuler */}
      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">Artikel Terpopuler</h2>
        {topArticles.length === 0 ? (
          <p className="text-sm text-[var(--muted)]">Belum ada data kunjungan.</p>
        ) : (
          <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
            {topArticles.map((a, i) => (
              <div key={a.slug} className="flex items-center gap-3 px-4 py-3">
                <span className="w-5 shrink-0 text-center text-xs font-bold text-[var(--muted)]">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--foreground)]">{a.title}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {CHANNEL_LABEL[a.channel] ?? a.channel}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-[var(--accent-red)]">
                  {(a.view_count ?? 0).toLocaleString('id-ID')} tayangan
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Audit SEO */}
      <section className="mb-8">
        <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">
          Audit SEO
          {auditIssues.length > 0 && (
            <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              {auditIssues.length} masalah
            </span>
          )}
        </h2>
        {auditIssues.length === 0 ? (
          <p className="text-sm font-medium text-green-600">Semua artikel sudah lengkap.</p>
        ) : (
          <div className="divide-y divide-[var(--border)] rounded-xl border border-amber-200">
            {auditIssues.map((a) => (
              <div key={a.slug} className="flex items-center gap-3 px-4 py-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-[var(--foreground)]">{a.title}</p>
                  <div className="mt-0.5 flex flex-wrap gap-1.5">
                    {!a.excerpt && (
                      <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-600">
                        Tanpa ringkasan
                      </span>
                    )}
                    {!a.cover_url && (
                      <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-600">
                        Tanpa foto utama
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Alat eksternal */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-[var(--foreground)]">Alat Eksternal</h2>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://search.google.com/search-console"
            target="_blank" rel="noopener"
            className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm
              font-medium hover:bg-[var(--card-bg)] transition"
          >
            Google Search Console →
          </a>
          <a
            href="https://analytics.google.com"
            target="_blank" rel="noopener"
            className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm
              font-medium hover:bg-[var(--card-bg)] transition"
          >
            Google Analytics →
          </a>
          <a
            href="https://pagespeed.web.dev"
            target="_blank" rel="noopener"
            className="rounded-lg border border-[var(--border)] px-4 py-2.5 text-sm
              font-medium hover:bg-[var(--card-bg)] transition"
          >
            PageSpeed Insights →
          </a>
        </div>
      </section>
    </div>
  )
}
