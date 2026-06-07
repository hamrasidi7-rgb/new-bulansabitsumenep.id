import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Privasi Pengguna — Bulan Sabit Sumenep',
  description: 'Kebijakan privasi pengguna portal Bulan Sabit Sumenep.',
}

const DEFAULT_SECTIONS = [
  { heading: '1. Data yang Kami Kumpulkan', body: 'Portal ini mengumpulkan data penggunaan secara anonim: halaman yang dikunjungi, jenis perangkat, dan wilayah asal pengunjung. Kami tidak mengumpulkan nama, email, atau informasi pribadi tanpa persetujuan eksplisit Anda.' },
  { heading: '2. Penggunaan Data', body: 'Data penggunaan digunakan untuk memahami minat pembaca dan meningkatkan kualitas konten. Data tidak dijual atau dibagikan kepada pihak ketiga untuk kepentingan komersial.' },
  { heading: '3. Cookie', body: 'Portal ini menggunakan cookie teknis yang diperlukan untuk fungsi dasar situs. Tidak ada cookie pelacakan pihak ketiga yang digunakan tanpa persetujuan Anda.' },
  { heading: '4. Iklan', body: 'Iklan yang tampil di portal ini dikelola langsung oleh tim kami. Kami tidak menggunakan jaringan iklan pihak ketiga yang melacak aktivitas lintas situs.' },
  { heading: '5. Tautan Eksternal', body: 'Portal kami mungkin memuat tautan ke YouTube, Instagram, Facebook, dan platform lain. Setelah Anda mengklik tautan tersebut, kebijakan privasi platform yang bersangkutan berlaku.' },
  { heading: '6. Hak Pengguna', body: 'Anda berhak meminta penghapusan data pribadi yang mungkin telah Anda berikan. Ajukan permintaan ke email redaksi.' },
]

export default async function PrivasiPage() {
  const db = await getPageContent('privasi')
  const sections = db?.sections?.length ? db.sections : DEFAULT_SECTIONS

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Legal
      </p>
      <h1 className="mb-2 font-serif text-3xl font-bold text-[var(--foreground)]">
        Privasi Pengguna
      </h1>
      <p className="mb-8 font-sans text-sm text-[var(--muted)]">Terakhir diperbarui: Juni 2026</p>

      <div className="space-y-6 font-serif text-[17px] leading-[1.85] text-[var(--foreground)]">
        {sections.map((sec, i) => (
          <div key={i}>
            {sec.heading && (
              <h2 className="mb-2 font-sans text-base font-bold">{sec.heading}</h2>
            )}
            <p>{sec.body}</p>
          </div>
        ))}

        <hr className="border-[var(--border)]" />
        <p className="font-sans text-sm text-[var(--muted)]">
          Pertanyaan:{' '}
          <a href="mailto:redaksi@bulansabitsumenep.id"
            className="text-[var(--accent-red)] underline">
            redaksi@bulansabitsumenep.id
          </a>
        </p>
      </div>
    </div>
  )
}
