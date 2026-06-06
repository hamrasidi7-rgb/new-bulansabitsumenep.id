import { supabase } from '@/lib/supabaseClient'
import { getSeedArticles, getSeedSubchannelCounts } from '@/lib/seedData'
import Link from 'next/link'
import Image from 'next/image'
import { getChannelBySlug, subchannelHref } from '@/lib/channels'

export const metadata = {
  title: 'Aksi Kemanusiaan',
  description:
    'Kegiatan kemanusiaan PMI Sumenep: tanggap bencana, donor darah, bakti sosial, relawan, dan laporan donasi.',
}

async function fetchSubchannelCounts() {
  const { data } = await supabase
    .from('articles')
    .select('subchannel')
    .eq('channel', 'aksi-kemanusiaan')
    .eq('is_published', true)
  if (data && data.length > 0) {
    return data.reduce((acc, row) => {
      acc[row.subchannel] = (acc[row.subchannel] ?? 0) + 1
      return acc
    }, {})
  }
  return getSeedSubchannelCounts('aksi-kemanusiaan')
}

async function fetchRecent() {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,subchannel,excerpt,cover_url,published_at')
    .eq('channel', 'aksi-kemanusiaan')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(6)
  if (data && data.length > 0) return data
  return getSeedArticles('aksi-kemanusiaan').slice(0, 6)
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// Warna latar per sub-kanal agar kartu lebih informatif
const SUBCHANNEL_ACCENT = {
  'tanggap-bencana':     'bg-orange-50 dark:bg-orange-950/20',
  'donor-darah':         'bg-red-50 dark:bg-red-950/20',
  'bakti-sosial':        'bg-rose-50 dark:bg-rose-950/20',
  'bantuan-dhuafa-yatim':'bg-pink-50 dark:bg-pink-950/20',
  'relawan':             'bg-purple-50 dark:bg-purple-950/20',
  'kisah-kemanusiaan':   'bg-amber-50 dark:bg-amber-950/20',
  'program-kemanusiaan': 'bg-blue-50 dark:bg-blue-950/20',
  'laporan-donasi':      'bg-green-50 dark:bg-green-950/20',
}

export default async function AksiKemanusiaanPage() {
  const channel = getChannelBySlug('aksi-kemanusiaan')
  const [counts, recentArticles] = await Promise.all([
    fetchSubchannelCounts(),
    fetchRecent(),
  ])

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 space-y-10">

      {/* Judul kanal */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-red)]">
          Kanal
        </p>
        <h1 className="font-serif text-2xl font-bold text-[var(--foreground)]">
          Aksi Kemanusiaan
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Dokumentasi dan laporan kegiatan kemanusiaan PMI Sumenep di daratan dan kepulauan.
        </p>
      </div>

      {/* Grid sub-kanal */}
      <section aria-labelledby="subkanal-ak-label">
        <p id="subkanal-ak-label"
          className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
          Sub-kanal
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {channel.subchannels.map((sub) => (
            <Link
              key={sub.slug}
              href={subchannelHref('aksi-kemanusiaan', sub.slug)}
              className={`group flex flex-col rounded-xl border border-[var(--border)]
                p-4 hover:border-[var(--accent-red)] transition-colors
                ${SUBCHANNEL_ACCENT[sub.slug] ?? 'bg-[var(--card)]'}`}
            >
              <span className="text-sm font-semibold text-[var(--foreground)]
                group-hover:text-[var(--accent-red)] transition-colors">
                {sub.label}
              </span>
              <span className="mt-1 text-xs text-[var(--muted)]">
                {counts[sub.slug] ?? 0} artikel
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Artikel terbaru */}
      <section aria-labelledby="terbaru-ak-label">
        <p id="terbaru-ak-label"
          className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]">
          Terbaru
        </p>

        {recentArticles.length === 0 ? (
          <p className="rounded-xl border border-[var(--border)] p-8 text-center
            text-sm text-[var(--muted)]">
            Belum ada artikel diterbitkan.
          </p>
        ) : (
          <div className="space-y-0">
            {recentArticles.map((a) => (
              <Link
                key={a.id}
                href={`/artikel/${a.slug}`}
                className="group flex items-start gap-4 border-b border-[var(--border)] py-4 last:border-0"
              >
                {a.cover_url && (
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={a.cover_url}
                      alt=""
                      fill
                      className="object-cover transition duration-300 group-hover:scale-105"
                      sizes="112px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  {a.subchannel && (
                    <span className="text-[10px] font-bold uppercase tracking-wide
                      text-[var(--accent-red)]">
                      {a.subchannel.replace(/-/g, ' ')}
                    </span>
                  )}
                  <h2 className="mt-0.5 font-serif text-[15px] font-semibold leading-snug
                    text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                    transition-colors line-clamp-3">
                    {a.title}
                  </h2>
                  {a.excerpt && (
                    <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{a.excerpt}</p>
                  )}
                  <time className="mt-2 block text-xs text-[var(--muted)]"
                    dateTime={a.published_at}>
                    {formatDate(a.published_at)}
                  </time>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </div>
  )
}
