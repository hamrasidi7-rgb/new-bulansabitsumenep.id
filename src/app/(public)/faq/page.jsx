import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'FAQ — Bulan Sabit Sumenep',
  description: 'Pertanyaan yang sering diajukan tentang portal Bulan Sabit Sumenep.',
}

const DEFAULT_ITEMS = [
  {
    q: 'Apa itu Bulan Sabit Sumenep?',
    a: 'Bulan Sabit Sumenep adalah portal berita dan edukasi kesehatan resmi PMI Kabupaten Sumenep. Kami menyajikan informasi kesehatan, liputan aksi kemanusiaan, dan konten edukatif dari tenaga medis.',
  },
  {
    q: 'Apakah informasi kesehatan di sini bisa dipercaya?',
    a: 'Konten di bawah rubrik Dokter Menulis ditulis atau diverifikasi oleh tenaga medis berlisensi. Namun, informasi di sini tidak menggantikan konsultasi langsung dengan dokter.',
  },
  {
    q: 'Bagaimana cara menghubungi PMI Sumenep?',
    a: 'Anda dapat menghubungi PMI Kabupaten Sumenep melalui nomor darurat yang tercantum di halaman Kontak, atau datang langsung ke kantor kami di Jl. Dr. Cipto No. 35, Sumenep.',
  },
  {
    q: 'Bagaimana cara mengirim tulisan atau berita?',
    a: 'Kami menerima kiriman tulisan dari dokter, tenaga kesehatan, dan relawan PMI. Kirimkan naskah ke redaksi@bulansabitsumenep.id dengan menyertakan identitas dan nomor kontak.',
  },
  {
    q: 'Apakah saya bisa menjadi relawan PMI Sumenep?',
    a: 'Ya! PMI Sumenep membuka pendaftaran relawan. Hubungi kantor PMI Sumenep atau ikuti informasi rekrutmen yang kami publikasikan di portal ini.',
  },
  {
    q: 'Bagaimana cara melakukan donor darah?',
    a: 'Anda dapat datang langsung ke Unit Donor Darah (UDD) PMI Kabupaten Sumenep, atau hubungi kami untuk informasi jadwal donor darah massal yang rutin diadakan.',
  },
  {
    q: 'Menemukan berita yang tidak akurat. Apa yang harus dilakukan?',
    a: 'Kirimkan laporan ke redaksi@bulansabitsumenep.id dengan menyertakan judul artikel dan sumber referensi yang valid. Kami akan menindaklanjuti dalam 2×24 jam.',
  },
  {
    q: 'Apakah konten bisa dibagikan ke media sosial?',
    a: 'Ya, konten Bulan Sabit Sumenep boleh dibagikan dengan tetap mencantumkan sumber dan tautan asli. Penggunaan komersial tanpa izin tidak diperkenankan.',
  },
]

export default async function FaqPage() {
  const db = await getPageContent('faq')
  const items = db?.items?.length ? db.items : DEFAULT_ITEMS

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        FAQ
      </p>
      <h1 className="mb-8 font-serif text-3xl font-bold text-[var(--foreground)]">
        Pertanyaan yang Sering Diajukan
      </h1>

      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i}>
            <h2 className="mb-2 font-sans text-base font-bold text-[var(--foreground)]">
              {item.q}
            </h2>
            <p className="font-serif text-[17px] leading-[1.85] text-[var(--foreground)]">
              {item.a}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl bg-[var(--surface)] p-5">
        <p className="font-sans text-sm font-semibold text-[var(--foreground)]">Pertanyaan lain?</p>
        <p className="mt-1 font-sans text-sm text-[var(--muted)]">
          Hubungi kami di{' '}
          <a href="mailto:redaksi@bulansabitsumenep.id"
            className="text-[var(--accent-red)] underline">
            redaksi@bulansabitsumenep.id
          </a>
        </p>
      </div>
    </div>
  )
}
