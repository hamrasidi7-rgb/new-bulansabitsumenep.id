'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS, subchannelHref } from '@/lib/channels'
import MobileNav from './MobileNav'

/**
 * Header 5-kanal portal Bulan Sabit Sumenep.
 * Desktop: nav horizontal + dropdown sub-kanal saat hover/fokus.
 * Mobile: tombol hamburger → MobileNav drawer.
 */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()
  const dropdownRef = useRef(null)

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Tutup dropdown saat navigasi
  useEffect(() => { setActiveDropdown(null) }, [pathname])

  return (
    <header className="sticky top-0 z-30 w-full border-b border-[var(--border)] bg-white/95 dark:bg-[#111110]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">

        {/* ── Logo ────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="Beranda Bulan Sabit Sumenep">
          <div className="relative h-9 w-9 overflow-hidden rounded-lg border border-[var(--border)]">
            <Image
              src="/logo-bulansabitsumenep.jpg"
              alt=""
              fill
              className="object-cover object-left"
              sizes="36px"
              priority
            />
          </div>
          <div className="leading-none">
            <span className="block text-[11px] font-bold uppercase tracking-widest text-[var(--foreground)]">
              bulansabit
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-widest text-[var(--accent-red)]">
              sumenep
            </span>
          </div>
        </Link>

        {/* ── Nav desktop ─────────────────────────────────────────── */}
        <nav
          ref={dropdownRef}
          aria-label="Kanal utama"
          className="hidden lg:flex items-center gap-0.5"
        >
          {CHANNELS.map((ch) => {
            const isActive = pathname.startsWith(ch.href)
            const isOpen = activeDropdown === ch.slug

            return (
              <div key={ch.slug} className="relative">
                {ch.hasSubchannels ? (
                  /* Kanal dengan dropdown */
                  <button
                    onMouseEnter={() => setActiveDropdown(ch.slug)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onFocus={() => setActiveDropdown(ch.slug)}
                    onClick={() => setActiveDropdown(isOpen ? null : ch.slug)}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    className={`flex items-center gap-1 rounded-md px-3 py-2 text-[13px] font-semibold transition-colors
                      ${isActive
                        ? 'text-[var(--accent-red)]'
                        : 'text-[var(--foreground)] hover:text-[var(--accent-red)]'}`}
                  >
                    {ch.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                      className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}>
                      <polyline points="2 4 6 8 10 4" />
                    </svg>
                  </button>
                ) : (
                  /* Kanal daun (tanpa dropdown) */
                  <Link
                    href={ch.href}
                    className={`flex items-center rounded-md px-3 py-2 text-[13px] font-semibold transition-colors
                      ${isActive
                        ? 'text-[var(--accent-red)]'
                        : 'text-[var(--foreground)] hover:text-[var(--accent-red)]'}`}
                  >
                    {ch.label}
                  </Link>
                )}

                {/* Dropdown sub-kanal */}
                {ch.hasSubchannels && isOpen && (
                  <div
                    onMouseEnter={() => setActiveDropdown(ch.slug)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className="absolute left-0 top-full z-50 min-w-[220px] overflow-hidden rounded-xl
                      border border-[var(--border)] bg-white dark:bg-[#1c1c1a] shadow-xl py-1"
                  >
                    {/* Tautan ke indeks kanal */}
                    <Link
                      href={ch.href}
                      className="block px-4 py-2.5 text-xs font-bold uppercase tracking-wider
                        text-[var(--accent-red)] hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      Semua {ch.label}
                    </Link>
                    <hr className="border-[var(--border)] mx-3 my-1" />
                    {ch.subchannels.map((sub) => {
                      const subHref = subchannelHref(ch.slug, sub.slug)
                      const subActive = pathname === subHref
                      return (
                        <Link
                          key={sub.slug}
                          href={subHref}
                          className={`flex items-center gap-2 px-4 py-2 text-sm
                            hover:bg-gray-50 dark:hover:bg-white/5 transition-colors
                            ${subActive
                              ? 'font-semibold text-[var(--accent-red)]'
                              : 'text-[var(--foreground)]'}`}
                        >
                          {subActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                          )}
                          {sub.label}
                        </Link>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* ── Sisi kanan: logo PMI + hamburger ──────────────────── */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block h-8 w-[80px]">
            <Image
              src="/logo-pmi.jpg"
              alt="Palang Merah Indonesia"
              fill
              className="object-contain object-right"
              sizes="80px"
            />
          </div>

          {/* Tombol hamburger (hanya mobile) */}
          <button
            onClick={() => setMobileOpen(true)}
            aria-label="Buka menu navigasi"
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg lg:hidden
              text-[var(--foreground)] hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── MobileNav drawer ─────────────────────────────────────── */}
      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
