import Link from 'next/link'

const WA_HREF =
  'https://wa.me/6285234567890?text=Halo%20Tanya%20AI%20BulanSabitSumenep%2C%20saya%20ingin%20bertanya%20tentang%20faskes%2C%20stok%20darah%2C%20obat%2C%20atau%20ambulans.'

const STATS = [
  { emoji: '🏥', count: '4',  label: 'RS' },
  { emoji: '🩺', count: '31', label: 'Puskesmas' },
  { emoji: '💊', count: '20', label: 'Apotek' },
  { emoji: '🩸', count: '',   label: 'PMI Aktif' },
]

export default function HeroSection() {
  return (
    <div className="w-full bg-white">

      {/* ── Banner Tanya AI ──────────────────────────────────────────── */}
      <div className="px-3 pt-3 pb-2">
        <a
          href={WA_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow active:scale-[0.98]"
        >
          {/* Robot icon */}
          <div className="relative flex h-[58px] w-[58px] shrink-0 items-center justify-center bg-red-50">
            <span className="text-[26px] leading-none">🤖</span>
            <span className="absolute top-2 right-1.5 text-[10px] text-red-400 font-black">✦</span>
          </div>
          {/* Divider */}
          <div className="w-px self-stretch bg-gray-200 shrink-0" />
          {/* Teks */}
          <div className="flex-1 px-3 py-2 min-w-0">
            <p className="font-black text-[12.5px] leading-tight tracking-tight">
              <span className="text-[#1a2235]">TANYA AI </span>
              <span className="text-red-600">BULANSABITSUMENEP</span>
            </p>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5">
              CARI FASKES&nbsp;•&nbsp;STOK DARAH&nbsp;•&nbsp;OBAT&nbsp;•&nbsp;AMBULANS
            </p>
          </div>
          {/* Tombol kirim */}
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500 text-white mr-2.5 shadow-sm">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </div>
        </a>
      </div>

      {/* ── Kartu Peta — klik buka /peta fullscreen ──────────────────── */}
      <div className="px-3 pb-0">
        <Link
          href="/peta"
          className="group relative flex h-[190px] sm:h-[240px] w-full items-end overflow-hidden rounded-2xl shadow-md border border-gray-100 active:scale-[0.99] transition-transform"
          aria-label="Buka Peta Layanan Kesehatan Sumenep"
        >
          {/* Background map-style */}
          <div className="absolute inset-0 bg-[#e8f0eb]">
            {/* Grid garis jalan tiruan */}
            <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="road-h" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="30" x2="60" y2="30" stroke="#8aab8e" strokeWidth="1.5"/>
                </pattern>
                <pattern id="road-v" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <line x1="30" y1="0" x2="30" y2="60" stroke="#8aab8e" strokeWidth="1.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#road-h)"/>
              <rect width="100%" height="100%" fill="url(#road-v)"/>
            </svg>
            {/* Jalan utama */}
            <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="45%" x2="100%" y2="55%" stroke="#5a8a5e" strokeWidth="4"/>
              <line x1="30%" y1="0" x2="40%" y2="100%" stroke="#5a8a5e" strokeWidth="3"/>
              <line x1="60%" y1="0" x2="55%" y2="100%" stroke="#5a8a5e" strokeWidth="2.5"/>
            </svg>
            {/* Spot air/sungai */}
            <div className="absolute top-4 right-8 h-10 w-16 rounded-full bg-[#aad3df]/50 blur-sm"/>
            <div className="absolute bottom-14 left-6 h-6 w-20 rounded-full bg-[#aad3df]/40 blur-sm"/>
          </div>

          {/* Pin marker dekoratif */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 flex flex-col items-center drop-shadow-lg">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white text-xl shadow-lg border-2 border-white">
              📍
            </div>
            <div className="h-3 w-0.5 bg-red-500/70"/>
            <div className="h-1.5 w-3 rounded-full bg-red-500/30 blur-sm"/>
          </div>

          {/* Label kota */}
          <div className="absolute top-5 right-6 rounded-lg bg-white/80 backdrop-blur-sm px-2 py-1 shadow-sm border border-white/60">
            <span className="text-[10px] font-bold text-gray-700 uppercase tracking-wide">Kab. Sumenep</span>
          </div>

          {/* Panel bawah: stats + CTA */}
          <div className="relative z-10 w-full bg-white/90 backdrop-blur-sm px-4 py-2.5 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                {STATS.map(({ emoji, count, label }) => (
                  <span key={label} className="text-[11px] font-bold text-gray-700">
                    {emoji} {count && `${count} `}{label}
                  </span>
                ))}
              </div>
              <span className="flex items-center gap-1 rounded-lg bg-[#1a2235] px-2.5 py-1.5 text-[11px] font-bold text-white shadow-sm group-hover:bg-[#243050] transition-colors">
                Buka Peta
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 6h8M7 3l3 3-3 3"/>
                </svg>
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Judul seksi peta */}
      <div className="flex items-center justify-between px-4 py-2">
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">📍 Peta Faskes Kabupaten Sumenep</span>
        <Link href="/peta" className="text-[11px] font-bold text-red-600 hover:underline">Fullscreen →</Link>
      </div>

    </div>
  )
}
