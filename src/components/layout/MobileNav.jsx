'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS, subchannelHref } from '@/lib/channels'

/**
 * Drawer navigasi mobile.
 * Dibuka oleh Header via prop onClose / dikontrol state isOpen dari Header.
 */
export default function MobileNav({ isOpen, onClose }) {
  // Accordion: simpan slug kanal yang sedang terbuka
  const [openAccordion, setOpenAccordion] = useState(null)
  const pathname = usePathname()
  const drawerRef = useRef(null)

  // Tutup accordion saat pathname berubah (berpindah halaman)
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

  const toggleAccordion = (slug) =>
    setOpenAccordion((prev) => (prev === slug ? null : slug))

  // Kanal dengan sub-kanal (Berita Kesehatan & Aksi Kemanusiaan)
  const parentChannels = CHANNELS.filter((c) => c.hasSubchannels)
  // Kanal pendukung (tanpa sub-kanal)
  const leafChannels = CHANNELS.filter((c) => !c.hasSubchannels)

  return (
    <>
      {/* Overlay gelap di belakang drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <nav
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className={`fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col
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
        <div className="flex-1 overflow-y-auto py-2">

          {/* ── Grup kanal dengan sub-kanal (accordion) ─────────────── */}
          {parentChannels.map((ch) => {
            const expanded = openAccordion === ch.slug
            return (
              <div key={ch.slug} className="border-b border-[var(--border)]">
                {/* Tombol accordion */}
                <button
                  onClick={() => toggleAccordion(ch.slug)}
                  aria-expanded={expanded}
                  aria-controls={`accordion-${ch.slug}`}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-left
                    text-sm font-semibold text-[var(--foreground)]
                    hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  <span className={pathname.startsWith(`/${ch.slug}`) ? 'text-[var(--accent-red)]' : ''}>
                    {ch.label}
                  </span>
                  {/* Chevron */}
                  <svg
                    width="16" height="16" viewBox="0 0 16 16" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                    className={`shrink-0 text-[var(--muted)] transition-transform duration-200
                      ${expanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="4 6 8 10 12 6" />
                  </svg>
                </button>

                {/* Sub-kanal list */}
                <ul
                  id={`accordion-${ch.slug}`}
                  role="list"
                  className={`overflow-hidden transition-all duration-200
                    ${expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {/* Tautan ke indeks kanal (semua sub-kanal) */}
                  <li>
                    <Link
                      href={ch.href}
                      className="flex items-center gap-2 py-2.5 pl-8 pr-4 text-xs
                        font-semibold uppercase tracking-wider text-[var(--accent-red)]
                        hover:bg-red-50 dark:hover:bg-red-950/20"
                    >
                      Semua {ch.label}
                    </Link>
                  </li>
                  {ch.subchannels.map((sub) => {
                    const href = subchannelHref(ch.slug, sub.slug)
                    const active = pathname === href
                    return (
                      <li key={sub.slug}>
                        <Link
                          href={href}
                          className={`flex items-center gap-2 py-2.5 pl-8 pr-4 text-sm
                            hover:bg-gray-50 dark:hover:bg-white/5
                            ${active
                              ? 'font-semibold text-[var(--accent-red)]'
                              : 'text-[var(--muted)]'}`}
                        >
                          {active && (
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                          )}
                          {sub.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}

          {/* ── Kanal pendukung (leaf — tanpa sub-kanal) ─────────────── */}
          <div className="py-2">
            <p className="px-4 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
              Kanal Pendukung
            </p>
            {leafChannels.map((ch) => {
              const active = pathname.startsWith(ch.href)
              return (
                <Link
                  key={ch.slug}
                  href={ch.href}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium
                    hover:bg-gray-50 dark:hover:bg-white/5
                    ${active ? 'text-[var(--accent-red)]' : 'text-[var(--foreground)]'}`}
                >
                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-red)] shrink-0" />
                  )}
                  {ch.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}
