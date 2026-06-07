import { supabase } from '@/lib/supabaseClient'
import Image from 'next/image'
import Link from 'next/link'

async function fetchBanner(position) {
  const now = new Date().toISOString()
  const { data } = await supabase
    .from('banners')
    .select('*')
    .eq('position', position)
    .eq('is_active', true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order('sort_order', { ascending: true })
    .limit(1)
    .single()
  return data ?? null
}

function Placeholder({ size, className }) {
  const base =
    'flex items-center justify-center rounded-md ' +
    'border border-dashed border-[var(--border)] bg-[var(--surface)] ' +
    'text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] ' +
    'select-none overflow-hidden ' + className

  if (size === 'leaderboard')
    return <div className={`w-full h-[50px] sm:h-[90px] ${base}`}>Iklan · 728 × 90</div>
  if (size === 'strip')
    return <div className={`w-full h-[60px] ${base}`}>Iklan</div>
  return (
    <div className={`w-full max-w-[320px] h-[100px] sm:max-w-[468px] sm:h-[60px] mx-auto ${base}`}>
      Iklan · 468 × 60
    </div>
  )
}

export default async function BannerSlot({ size = 'leaderboard', className = '' }) {
  const banner = await fetchBanner(size)

  // Tidak ada banner aktif — tampilkan placeholder
  if (!banner) return <Placeholder size={size} className={className} />

  // Ucapan / pengumuman teks
  if (banner.type === 'ucapan') {
    return (
      <div
        className={`w-full rounded-lg px-4 py-3 text-center text-sm font-semibold text-white ${className}`}
        style={{ backgroundColor: banner.bg_color ?? '#dc2626' }}
      >
        {banner.content}
      </div>
    )
  }

  // Banner gambar
  if (banner.image_url) {
    const img = (
      <div className={`relative w-full overflow-hidden rounded-lg ${className} ${
        size === 'leaderboard' ? 'h-[50px] sm:h-[90px]' :
        size === 'strip'       ? 'h-[60px]' :
        'max-w-[320px] h-[100px] sm:max-w-[468px] sm:h-[60px] mx-auto'
      }`}>
        <Image
          src={banner.image_url}
          alt={banner.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 320px, 728px"
        />
      </div>
    )
    if (banner.link_url) {
      return <Link href={banner.link_url} target="_blank" rel="noopener">{img}</Link>
    }
    return img
  }

  return <Placeholder size={size} className={className} />
}
