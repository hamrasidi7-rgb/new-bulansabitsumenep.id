'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS } from '@/lib/channels'

/**
 * Drawer navigasi mobile.
 * Dibuka oleh Header via prop onClose / dikontrol state isOpen dari Header.
 */
export default function MobileNav({ isOpen, onClose }) {
  const pathname = usePathname()
  const drawerRef = useRef(null)

  // Tutup drawer saat pathname berubah (berpindah halaman)
  useEffect(() => {
    if (isOpen) onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  // Tangkap tombol Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    // Cegah scroll body saat drawer terbuka
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Fokus ke tombol pertama drawer saat dibuka
  useEffect(() => {
    if (isOpen) drawerRef.current?.querySelector('button, a')?.focus()
  }, [isOpen])

  return (
    <>
      {/* Overlay gelap di belakang drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[190] bg-black/50 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed inset-y-0 left-0 z-[200] flex w-80 max-w-[85vw] flex-col
          bg-white dark:bg-[#1a1a1a] shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header drawer */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
          <span className="text-sm font-bold uppercase tracking-widest text-[var(--accent-red)]">
            Menu
          </span>
          <button
            onClick={onClose}
            aria-label="Tutup menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--muted)]
              hover:bg-gray-100 dark:hover:bg-white/10"
          >
            {/* Ikon X */}
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="2" y1="2" x2="16" y2="16" />
              <line x1="16" y1="2" x2="2" y2="16" />
            </svg>
          </button>
        </div>

        {/* Isi drawer — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Kanal utama ─────────────────────────────────────────── */}
          <div className="py-2">
            {CHANNELS.map((ch) => {
              const active = pathname.startsWith(ch.href)
              return (
                <Link
                  key={ch.slug}
                  href={ch.href}
                  className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold border-b border-[var(--border)]
                    hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
                    ${active ? 'text-[var(--accent-red)]' : 'text-[var(--foreground)]'}`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                  )}
                  {ch.label}
                </Link>
              )
            })}
            <Link
              href="/peta"
              className={`flex items-center gap-3 px-4 py-3.5 text-sm font-semibold border-b border-[var(--border)]
                hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
                ${pathname === '/peta' ? 'text-[var(--accent-red)]' : 'text-[var(--foreground)]'}`}
            >
              {pathname === '/peta' && <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] shrink-0" />}
              Peta Layanan Kesehatan
            </Link>
          </div>

          {/* ── Informasi ────────────────────────────────────────────── */}
          <div className="py-2">
            <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
              Informasi
            </p>
            {[
              { label: 'Tentang Kami',   href: '/tentang-kami' },
              { label: 'Redaksi',        href: '/redaksi' },
              { label: 'FAQ',            href: '/faq' },
            ].map(({ label, href }) => {
              const active = pathname === href
              return (
                <Link key={href} href={href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm
                    hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
                    ${active ? 'font-semibold text-[var(--accent-red)]' : 'font-medium text-[var(--muted)]'}`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
