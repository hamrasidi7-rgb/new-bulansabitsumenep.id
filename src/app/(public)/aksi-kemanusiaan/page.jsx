import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import { getChannelBySlug, subchannelHref } from '@/lib/channels'

export const metadata = {
  title: 'Aksi Kemanusiaan',
  description: 'Kegiatan kemanusiaan PMI Sumenep: tanggap bencana, donor darah, bakti sosial, relawan, dan laporan donasi.',
}

async function fetchSubchannelCounts() {
  const { data } = await supabase
    .from('articles')
    .select('subchannel')
    .eq('channel', 'aksi-kemanusiaan')
    .eq('is_published', true)
  if (!data) return {}
  return data.reduce((acc, row) => {
    acc[row.subchannel] = (acc[row.subchannel] ?? 0) + 1
    return acc
  }, {})
}

export default async function AksiKemanusiaanPage() {
  const channel = getChannelBySlug('aksi-kemanusiaan')
  const counts = await fetchSubchannelCounts()

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <h1 className="mb-1 font-serif text-2xl font-bold text-[var(--foreground)]">
        Aksi Kemanusiaan
      </h1>
      <p className="mb-6 text-sm text-[var(--muted)]">
        Dokumentasi dan laporan kegiatan kemanusiaan PMI Sumenep di daratan dan kepulauan.
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {channel.subchannels.map((sub) => (
          <Link
            key={sub.slug}
            href={subchannelHref('aksi-kemanusiaan', sub.slug)}
            className="group flex flex-col rounded-xl border border-[var(--border)] bg-[var(--card)]
              p-4 hover:border-[var(--accent-red)] transition-colors"
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
    </div>
  )
}
