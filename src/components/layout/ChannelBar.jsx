'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS, subchannelHref } from '@/lib/channels'

/**
 * Strip kanal permanen di bawah header.
 * Tampil di semua ukuran layar:
 *   - Mobile  : horizontal scroll, tap = navigasi langsung
 *   - Desktop : rata tengah, hover = dropdown sub-kanal
 */
export default function ChannelBar() {
  const pathname = usePathname()
  const [openSlug, setOpenSlug] = useState(null)
  const barRef = useRef(null)

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handler = (e) => {
      if (barRef.current && !barRef.current.contains(e.target)) {
        setOpenSlug(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Tutup saat navigasi
  useEffect(() => { setOpenSlug(null) }, [pathname])

  return (
    <div
      ref={barRef}
      className="w-full border-b-2 border-[var(--accent-red)]
        bg-white dark:bg-[#111110] shadow-sm z-20 relative"
    >
      {/* Strip kanal — horizontal scroll di mobile */}
      <nav
        aria-label="Kanal portal"
        className="mx-auto flex max-w-6xl items-stretch
          overflow-x-auto no-scrollbar px-2"
      >
        {CHANNELS.map((ch, idx) => {
          const isActive = pathname === ch.href || pathname.startsWith(ch.href + '/')
          const isOpen = openSlug === ch.slug

          return (
            <div key={ch.slug} className="relative flex items-stretch shrink-0">

              {/* Pemisah | antar kanal */}
              {idx > 0 && (
                <span
                  aria-hidden="true"
                  className="self-center text-[var(--border)] select-none px-0.5 text-base"
                >
                  |
                </span>
              )}

              {ch.hasSubchannels ? (
                /* Kanal dengan sub-kanal: klik/hover buka dropdown */
                <button
                  onMouseEnter={() => setOpenSlug(ch.slug)}
                  onMouseLeave={() => setOpenSlug(null)}
                  onFocus={() => setOpenSlug(ch.slug)}
                  onClick={() => setOpenSlug(isOpen ? null : ch.slug)}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 whitespace-nowrap px-3 py-2.5
                    text-[11px] font-bold uppercase tracking-widest transition-colors
                    ${isActive
                      ? 'text-[var(--accent-red)]'
                      : 'text-[var(--foreground)] hover:text-[var(--accent-red)]'}`}
                >
                  {ch.label}
                  <svg
                    width="10" height="10" viewBox="0 0 10 10" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  >
                    <polyline points="2 3 5 7 8 3" />
                  </svg>
                  {/* Garis merah bawah saat aktif */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-[var(--accent-red)] rounded-t" />
                  )}
                </button>
              ) : (
                /* Kanal daun: langsung link */
                <Link
                  href={ch.href}
                  className={`relative flex items-center whitespace-nowrap px-3 py-2.5
                    text-[11px] font-bold uppercase tracking-widest transition-colors
                    ${isActive
                      ? 'text-[var(--accent-red)]'
                      : 'text-[var(--foreground)] hover:text-[var(--accent-red)]'}`}
                >
                  {ch.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5
                      bg-[var(--accent-red)] rounded-t" />
                  )}
                </Link>
              )}

              {/* Dropdown sub-kanal */}
              {ch.hasSubchannels && isOpen && (
                <div
                  onMouseEnter={() => setOpenSlug(ch.slug)}
                  onMouseLeave={() => setOpenSlug(null)}
                  className="absolute left-0 top-full z-50 min-w-[200px]
                    overflow-hidden rounded-b-xl border border-t-0 border-[var(--border)]
                    bg-white dark:bg-[#1c1c1a] shadow-xl py-1"
                >
                  <Link
                    href={ch.href}
                    className="block px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider
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
    </div>
  )
}
