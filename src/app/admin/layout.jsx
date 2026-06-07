import Link from 'next/link'
import { logoutAction } from './login/actions'

const navItems = [
  { href: '/admin',                label: 'Dashboard' },
  { href: '/admin/artikel',        label: 'Artikel' },
  { href: '/admin/dokter-menulis', label: 'Dokter Menulis' },
  { href: '/admin/video',          label: 'Video' },
  { href: '/admin/galeri',         label: 'Galeri' },
  { href: '/admin/banner',         label: 'Banner' },
  { href: '/admin/seo',            label: 'SEO & Traffic' },
  { href: '/admin/halaman',        label: 'Halaman' },
  { href: '/admin/pengaturan',     label: 'Pengaturan' },
]

export const metadata = { title: 'Admin — Bulan Sabit Sumenep' }

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-[var(--background)]">
      {/* Sidebar */}
      <aside className="hidden w-52 shrink-0 border-r border-[var(--border)] md:flex flex-col gap-1 p-4">
        <p className="mb-3 px-2 text-xs font-bold uppercase tracking-widest text-[var(--muted)]">
          Admin BSS
        </p>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--foreground)]
              hover:bg-[var(--card-bg)] transition-colors"
          >
            {item.label}
          </Link>
        ))}

        <form action={logoutAction} className="mt-auto pt-4 border-t border-[var(--border)]">
          <button type="submit"
            className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium
              text-[var(--muted)] hover:text-red-600 hover:bg-red-50 transition-colors">
            Keluar
          </button>
        </form>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex gap-3 border-b border-[var(--border)]
        bg-[var(--background)] px-4 py-2 md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-xs font-semibold text-[var(--foreground)] hover:text-[var(--accent-red)]"
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Konten utama */}
      <main className="flex-1 p-4 pt-14 md:p-8 md:pt-8 max-w-4xl">
        {children}
      </main>
    </div>
  )
}
