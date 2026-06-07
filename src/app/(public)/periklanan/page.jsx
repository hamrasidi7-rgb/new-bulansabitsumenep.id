import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Periklanan & Kerjasama — Bulan Sabit Sumenep',
  description: 'Informasi pemasangan iklan dan kerjasama dengan portal Bulan Sabit Sumenep.',
}

const DEFAULT_PAKET = [
  { nama: 'Leaderboard', ukuran: '728 × 90 px', posisi: 'Atas halaman utama & halaman artikel', cocok: 'Brand awareness, instansi pemerintah, rumah sakit' },
  { nama: 'Strip',       ukuran: 'Full-width × 60 px', posisi: 'Di antara paragraf artikel', cocok: 'Produk kesehatan, apotek, klinik' },
  { nama: 'Rectangle',   ukuran: '468 × 60 px', posisi: 'Tengah artikel', cocok: 'Promosi event, pelatihan, donor darah' },
  { nama: 'Ucapan / Pengumuman', ukuran: 'Full-width (teks)', posisi: 'Seluruh halaman', cocok: 'Hari besar, pengumuman instansi' },
]

export default async function PeriklananPage() {
  const db = await getPageContent('periklanan')
  const email    = db?.email    || 'iklan@bulansabitsumenep.id'
  const whatsapp = db?.whatsapp || '#'
  const paket    = db?.paket?.length ? db.paket : DEFAULT_PAKET

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Iklan & Kerjasama
      </p>
      <h1 className="mb-4 font-serif text-3xl font-bold text-[var(--foreground)]">
        Periklanan & Kerjasama
      </h1>
      <p className="mb-8 font-serif text-[17px] leading-[1.85] text-[var(--muted)]">
        Bulan Sabit Sumenep membuka kesempatan kerjasama periklanan dan kemitraan dengan
        instansi pemerintah, fasilitas kesehatan, dan organisasi sosial.
      </p>

      <h2 className="mb-4 font-sans text-base font-bold text-[var(--foreground)]">Paket Iklan Digital</h2>
      <div className="mb-8 space-y-3">
        {paket.map((p, i) => (
          <div key={i}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)] p-4">
            <div className="flex items-start justify-between gap-4">
              <p className="font-sans text-sm font-bold text-[var(--foreground)]">{p.nama}</p>
              <span className="shrink-0 rounded-full border border-[var(--border)]
                px-2 py-0.5 font-mono text-[11px] text-[var(--muted)]">
                {p.ukuran}
              </span>
            </div>
            <p className="mt-1 text-sm text-[var(--muted)]">{p.posisi}</p>
            {p.cocok && <p className="mt-0.5 text-xs text-[var(--muted)]">Cocok untuk: {p.cocok}</p>}
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--accent-red)]/20 bg-[var(--accent-red)]/5 p-5">
        <p className="font-sans text-sm font-bold text-[var(--foreground)]">Hubungi Kami</p>
        <p className="mt-2 font-sans text-sm text-[var(--muted)]">
          Untuk informasi tarif dan ketersediaan slot iklan:
        </p>
        <p className="mt-2 font-sans text-sm font-medium text-[var(--foreground)]">
          Email:{' '}
          <a href={`mailto:${email}`} className="text-[var(--accent-red)] underline">{email}</a>
        </p>
        {whatsapp && whatsapp !== '#' && (
          <p className="font-sans text-sm font-medium text-[var(--foreground)]">
            WhatsApp:{' '}
            <a href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
              target="_blank" rel="noopener"
              className="text-[var(--accent-red)] underline">
              {whatsapp}
            </a>
          </p>
        )}
      </div>
    </div>
  )
}
