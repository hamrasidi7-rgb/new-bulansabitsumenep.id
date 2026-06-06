/**
 * BannerSlot — placeholder iklan.
 * Ganti konten <div> ini dengan kode iklan asli (Google AdSense, dll.)
 * saat siap tayang.
 *
 * size:
 *   'leaderboard' → 728×90 desktop / 320×50 mobile  (atas halaman / atas artikel)
 *   'strip'       → lebar penuh, tinggi pendek        (antar paragraf)
 *   'rectangle'   → 300×250, di tengah artikel        (mid-content)
 */
export default function BannerSlot({ size = 'leaderboard', className = '' }) {
  const base =
    'flex items-center justify-center rounded-md ' +
    'border border-dashed border-[var(--border)] bg-[var(--surface)] ' +
    'text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--muted)] ' +
    'select-none overflow-hidden ' + className

  if (size === 'leaderboard') {
    return (
      <div className={`w-full h-[50px] sm:h-[90px] ${base}`}>
        Iklan · 728 × 90
      </div>
    )
  }

  if (size === 'strip') {
    return (
      <div className={`w-full h-[60px] ${base}`}>
        Iklan
      </div>
    )
  }

  // rectangle
  return (
    <div className={`w-full max-w-[320px] h-[100px] sm:max-w-[468px] sm:h-[60px] mx-auto ${base}`}>
      Iklan · 468 × 60
    </div>
  )
}
