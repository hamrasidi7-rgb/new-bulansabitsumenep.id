import { getPageContent } from '@/lib/sitePages'

export const revalidate = 3600

export const metadata = {
  title: 'Manajemen & Dewan Redaksi — Bulan Sabit Sumenep',
  description: 'Susunan manajemen dan dewan redaksi portal Bulan Sabit Sumenep.',
}

const DEFAULT_MEMBERS = [
  { jabatan: 'Pelindung',           nama: 'Ketua PMI Kabupaten Sumenep' },
  { jabatan: 'Penasehat',           nama: 'Pengurus PMI Kabupaten Sumenep' },
  { jabatan: 'Pemimpin Redaksi',    nama: 'Sekretaris PMI Sumenep' },
  { jabatan: 'Redaktur Pelaksana',  nama: 'Bidang Komunikasi & Humas PMI Sumenep' },
  { jabatan: 'Redaktur Kesehatan',  nama: 'Dokter PMI Sumenep' },
  { jabatan: 'Reporter & Editor',   nama: 'Tim Relawan Media PMI Sumenep' },
  { jabatan: 'Fotografer',          nama: 'Tim Dokumentasi PMI Sumenep' },
  { jabatan: 'Pengelola Digital',   nama: 'Tim IT PMI Sumenep' },
]

export default async function RedaksiPage() {
  const db = await getPageContent('redaksi')
  const members = db?.members?.length ? db.members : DEFAULT_MEMBERS
  const alamat  = db?.alamat  || 'Jl. Dr. Cipto No. 35, Sumenep, Jawa Timur 69411'
  const email   = db?.email   || 'redaksi@bulansabitsumenep.id'

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
        Redaksi
      </p>
      <h1 className="mb-2 font-serif text-3xl font-bold text-[var(--foreground)]">
        Manajemen & Dewan Redaksi
      </h1>
      <p className="mb-8 font-serif text-[17px] leading-[1.85] text-[var(--muted)]">
        Bulan Sabit Sumenep dikelola oleh tim redaksi yang terdiri dari pengurus, relawan,
        dan tenaga profesional PMI Kabupaten Sumenep.
      </p>

      <div className="divide-y divide-[var(--border)] rounded-xl border border-[var(--border)]">
        {members.map((r, i) => (
          <div key={i} className="px-5 py-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent-red)]">
              {r.jabatan}
            </p>
            <p className="mt-0.5 text-sm font-medium text-[var(--foreground)]">{r.nama}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-[var(--surface)] p-5 font-sans text-sm text-[var(--muted)]">
        <p className="font-semibold text-[var(--foreground)]">Alamat Redaksi</p>
        <p className="mt-1">PMI Kabupaten Sumenep</p>
        <p>{alamat}</p>
        <p className="mt-1">Email: {email}</p>
      </div>
    </div>
  )
}
