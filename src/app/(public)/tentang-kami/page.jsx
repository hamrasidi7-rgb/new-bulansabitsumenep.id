import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Tentang Kami — Bulan Sabit Sumenep',
  description: 'Portal berita kesehatan dan kemanusiaan PMI Kabupaten Sumenep.',
}

const DEFAULT = {
  intro: [
    'Bulan Sabit Sumenep adalah portal berita dan edukasi kesehatan resmi yang dikelola oleh Palang Merah Indonesia (PMI) Kabupaten Sumenep. Portal ini hadir sebagai jembatan informasi antara PMI Sumenep dan masyarakat luas, khususnya warga Kabupaten Sumenep dan Kepulauan Madura.',
    'Kami menyajikan berita kesehatan, liputan aksi kemanusiaan, edukasi medis dari para dokter, video inspiratif, dan galeri foto kegiatan. Setiap konten melalui proses verifikasi dan editorial sebelum dipublikasikan.',
  ],
  visi: 'Menjadi portal referensi utama informasi kesehatan dan kemanusiaan yang terpercaya bagi masyarakat Sumenep dan Madura.',
  misi: [
    'Menyebarkan informasi kesehatan yang akurat dan mudah dipahami',
    'Meliput dan mendokumentasikan aksi kemanusiaan PMI Sumenep',
    'Menjadi ruang edukasi bagi tenaga kesehatan dan relawan',
    'Mendekatkan layanan PMI kepada masyarakat melalui teknologi digital',
  ],
  alamat: 'Jl. Dr. Cipto No. 35, Sumenep, Jawa Timur 69411',
  email: 'redaksi@bulansabitsumenep.id',
}

export default async function TentangKamiPage() {
  const db = await getPageContent('tentang-kami')
  const d = {
    intro:  db?.intro?.length  ? db.intro  : DEFAULT.intro,
    visi:   db?.visi            ? db.visi   : DEFAULT.visi,
    misi:   db?.misi?.length   ? db.misi   : DEFAULT.misi,
    alamat: db?.alamat          ? db.alamat : DEFAULT.alamat,
    email:  db?.email           ? db.email  : DEFAULT.email,
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Tentang Kami
      </p>
      <h1 className="mb-6 font-serif text-3xl font-bold text-[var(--foreground)]">
        Bulan Sabit Sumenep
      </h1>

      <div className="space-y-5 font-serif text-[17px] leading-[1.85] text-[var(--foreground)]">
        {d.intro.map((para, i) => <p key={i}>{para}</p>)}

        <hr className="border-[var(--border)]" />

        <div>
          <h2 className="mb-2 font-sans text-base font-bold">Visi</h2>
          <p>{d.visi}</p>
        </div>

        <div>
          <h2 className="mb-2 font-sans text-base font-bold">Misi</h2>
          <ul className="list-disc pl-5 space-y-1.5">
            {d.misi.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        </div>

        <hr className="border-[var(--border)]" />

        <div>
          <h2 className="mb-2 font-sans text-base font-bold">Tentang PMI Sumenep</h2>
          <p>
            Palang Merah Indonesia Kabupaten Sumenep adalah organisasi kemanusiaan yang berdiri
            berdasarkan Undang-Undang No. 1 Tahun 2018. PMI Sumenep bergerak dalam bidang
            pelayanan darah, tanggap bencana, pelatihan pertolongan pertama, dan pemberdayaan
            masyarakat di wilayah Kabupaten Sumenep beserta kepulauan.
          </p>
        </div>

        <div className="rounded-xl bg-[var(--surface)] p-5">
          <p className="font-sans text-sm font-semibold text-[var(--foreground)]">Kontak Redaksi</p>
          <p className="mt-1 font-sans text-sm text-[var(--muted)]">{d.alamat}</p>
          <p className="font-sans text-sm text-[var(--muted)]">Email: {d.email}</p>
        </div>
      </div>
    </div>
  )
}
