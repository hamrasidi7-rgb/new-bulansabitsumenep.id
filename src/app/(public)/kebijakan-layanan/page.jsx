import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Kebijakan Layanan — Bulan Sabit Sumenep',
  description: 'Syarat dan ketentuan penggunaan portal Bulan Sabit Sumenep.',
}

const DEFAULT_SECTIONS = [
  { heading: '1. Penerimaan Ketentuan', body: 'Dengan mengakses portal Bulan Sabit Sumenep, Anda menyetujui kebijakan layanan ini. Jika tidak setuju, mohon hentikan penggunaan portal.' },
  { heading: '2. Tujuan Portal', body: 'Portal ini ditujukan untuk penyebarluasan informasi kesehatan dan kemanusiaan yang bersifat edukatif. Konten yang tersedia bukan merupakan layanan medis dan tidak menggantikan diagnosa atau penanganan oleh tenaga medis profesional.' },
  { heading: '3. Hak Kekayaan Intelektual', body: 'Seluruh konten termasuk teks, foto, video, dan grafis adalah milik PMI Kabupaten Sumenep atau pihak yang telah memberikan lisensi. Penggunaan konten untuk kepentingan non-komersial diperbolehkan dengan mencantumkan sumber asli.' },
  { heading: '4. Larangan Penggunaan', body: 'Dilarang menggunakan konten untuk tujuan komersial tanpa izin, memanipulasi konten sehingga mengaburkan makna asli, atau menyebarkan informasi yang menyesatkan.' },
  { heading: '5. Tautan Pihak Ketiga', body: 'Portal ini mungkin memuat tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas konten atau kebijakan situs tersebut.' },
  { heading: '6. Perubahan Kebijakan', body: 'Kami berhak mengubah kebijakan ini sewaktu-waktu. Perubahan berlaku sejak dipublikasikan.' },
  { heading: '7. Hukum yang Berlaku', body: 'Kebijakan ini tunduk pada hukum Republik Indonesia, termasuk UU No. 40 Tahun 1999 tentang Pers dan UU No. 19 Tahun 2016 tentang ITE.' },
]

export default async function KebijakanLayananPage() {
  const db = await getPageContent('kebijakan-layanan')
  const sections = db?.sections?.length ? db.sections : DEFAULT_SECTIONS

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Legal
      </p>
      <h1 className="mb-2 font-serif text-3xl font-bold text-[var(--foreground)]">
        Kebijakan Layanan
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
