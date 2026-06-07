import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Pedoman Media Siber — Bulan Sabit Sumenep',
  description: 'Pedoman pengelolaan media siber Bulan Sabit Sumenep sesuai ketentuan Dewan Pers.',
}

const DEFAULT_SECTIONS = [
  { heading: '1. Keberimbangan dan Akurasi', body: 'Seluruh berita yang diterbitkan telah melalui proses verifikasi fakta dan mengedepankan prinsip keberimbangan. Kami tidak menyebarkan informasi yang belum terverifikasi.' },
  { heading: '2. Berita Kesehatan', body: 'Konten edukasi dan berita kesehatan yang terbit di bawah label Dokter Menulis ditulis atau diverifikasi oleh tenaga medis berlisensi. Informasi kesehatan tidak menggantikan konsultasi dokter.' },
  { heading: '3. Ralat dan Koreksi', body: 'Apabila ditemukan kesalahan faktual, redaksi akan menerbitkan ralat secara transparan tanpa menghapus artikel asli, kecuali atas perintah pengadilan.' },
  { heading: '4. Hak Jawab', body: 'Setiap pihak yang merasa dirugikan oleh pemberitaan berhak mengajukan hak jawab kepada redaksi melalui email redaksi@bulansabitsumenep.id.' },
  { heading: '5. Konten Iklan', body: 'Konten iklan dan advertorial ditandai secara jelas dengan label "Iklan" atau "Advertorial" sehingga pembaca dapat membedakan dari konten editorial.' },
  { heading: '6. Komentar Pengguna', body: 'Redaksi berhak menghapus komentar yang mengandung ujaran kebencian, SARA, hoaks, atau melanggar ketentuan hukum yang berlaku di Indonesia.' },
]

export default async function PedomanMediaSiberPage() {
  const db = await getPageContent('pedoman-media-siber')
  const sections = db?.sections?.length ? db.sections : DEFAULT_SECTIONS

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Pedoman
      </p>
      <h1 className="mb-6 font-serif text-3xl font-bold text-[var(--foreground)]">
        Pedoman Media Siber
      </h1>
      <p className="mb-8 font-serif text-[17px] leading-[1.85] text-[var(--foreground)]">
        Bulan Sabit Sumenep beroperasi sesuai Pedoman Pemberitaan Media Siber yang ditetapkan
        oleh Dewan Pers Indonesia dan Kode Etik Jurnalistik PWI.
      </p>

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
          Pedoman ini mengacu pada Pedoman Pemberitaan Media Siber Dewan Pers.
          Berlaku sejak portal ini diluncurkan.
        </p>
      </div>
    </div>
  )
}
