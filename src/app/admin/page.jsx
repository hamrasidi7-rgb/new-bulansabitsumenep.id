import Link from 'next/link'

const sections = [
  { href: '/admin/artikel',        label: 'Artikel',        desc: 'Berita Kesehatan & Aksi Kemanusiaan' },
  { href: '/admin/dokter-menulis', label: 'Dokter Menulis', desc: 'Opini & edukasi dari dokter' },
  { href: '/admin/video',          label: 'Video Story',    desc: 'YouTube, Instagram, TikTok' },
  { href: '/admin/galeri',         label: 'Galeri Foto',    desc: 'Album & foto kegiatan' },
  { href: '/admin/banner',         label: 'Banner & Ucapan', desc: 'Iklan, pengumuman & ucapan di website' },
  { href: '/admin/seo',            label: 'SEO & Traffic',   desc: 'Tayangan artikel & audit konten' },
  { href: '/admin/halaman',        label: 'Halaman Footer',  desc: 'Tentang Kami, Redaksi, FAQ, dll' },
  { href: '/admin/pengaturan',     label: 'Pengaturan',      desc: 'Kontak & tautan media sosial' },
]

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="mb-1 text-2xl font-bold text-[var(--foreground)]">Dashboard Admin</h1>
      <p className="mb-8 text-sm text-[var(--muted)]">Bulan Sabit Sumenep — Panel Konten</p>

      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}
            className="rounded-xl border border-[var(--border)] bg-[var(--card-bg)]
              p-5 hover:border-[var(--accent-red)] transition-colors">
            <p className="font-semibold text-[var(--foreground)]">{s.label}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
