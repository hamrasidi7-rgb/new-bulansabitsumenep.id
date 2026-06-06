import Image from 'next/image'
import Link from 'next/link'
import { CHANNELS, subchannelHref } from '@/lib/channels'
import { siteConfig } from '@/lib/site'

/** Footer portal — tema dark navy #1a2235, baca kanal dari channels.js */
export default function Footer() {
  const year = new Date().getFullYear()

  const SOCIAL = [
    { label: 'Facebook', href: '#', Icon: FacebookIcon },
    { label: 'Instagram', href: '#', Icon: InstagramIcon },
    { label: 'X (Twitter)', href: '#', Icon: XIcon },
    { label: 'YouTube', href: '#', Icon: YouTubeIcon },
    { label: 'TikTok', href: '#', Icon: TikTokIcon },
  ]

  return (
    <footer
      className="pb-[4.5rem] sm:pb-0"
      style={{ backgroundColor: '#1a2235' }}
      aria-label="Footer Bulan Sabit Sumenep"
    >
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* ── Baris logo ────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-[130px] overflow-hidden rounded-md bg-white px-2 py-1">
              <Image src="/logo-bulansabitsumenep.jpg" alt="Bulan Sabit Merah Sumenep"
                fill className="object-contain" sizes="130px" />
            </div>
            <span className="h-10 w-px bg-white/20" aria-hidden="true" />
            <div className="relative h-10 w-[100px] overflow-hidden rounded-md bg-white px-2 py-1">
              <Image src="/logo-pmi.jpg" alt="Palang Merah Indonesia"
                fill className="object-contain" sizes="100px" />
            </div>
          </div>

          {/* Tagline */}
          <p className="text-center text-sm italic text-white/55 sm:text-right">
            {siteConfig.tagline}
          </p>
        </div>

        {/* ── Kanal + sub-kanal ─────────────────────────────────── */}
        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {CHANNELS.map((ch) => (
            <div key={ch.slug}>
              <Link
                href={ch.href}
                className="block text-xs font-bold uppercase tracking-[0.15em] text-white/80
                  hover:text-white mb-2"
              >
                {ch.label}
              </Link>
              {ch.subchannels.slice(0, 4).map((sub) => (
                <Link
                  key={sub.slug}
                  href={subchannelHref(ch.slug, sub.slug)}
                  className="block py-0.5 text-xs text-white/45 hover:text-white/80 transition-colors"
                >
                  {sub.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ── Media sosial ──────────────────────────────────────── */}
        <div className="mt-8 flex justify-center gap-3" role="list" aria-label="Media sosial">
          {SOCIAL.map(({ label, href, Icon }) => (
            <a key={label} href={href} aria-label={label} role="listitem"
              className="flex h-10 w-10 items-center justify-center rounded-full
                border border-white/25 text-white/70
                hover:border-white hover:text-white hover:bg-white/10 transition-colors">
              <Icon />
            </a>
          ))}
        </div>

        {/* ── Tautan legal ──────────────────────────────────────── */}
        <nav aria-label="Tautan legal" className="mt-6">
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {['Tentang Kami','Kebijakan Privasi','Pedoman Media Siber','FAQ'].map((item, i, arr) => (
              <li key={item} className="flex items-center gap-3">
                <a href="#" className="text-xs text-white/50 hover:text-white transition-colors">
                  {item}
                </a>
                {i < arr.length - 1 && (
                  <span className="text-white/25 select-none" aria-hidden="true">•</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Copyright ─────────────────────────────────────────── */}
        <hr className="my-6 border-white/10" />
        <p className="text-center text-xs text-white/35 leading-relaxed">
          Copyright &copy; {year} Bulan Sabit Sumenep &bull; PMI Kabupaten Sumenep.
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}

// ── Ikon sosial ────────────────────────────────────────────────────────────

function FacebookIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M9.5 3H11V1h-1.5C7.57 1 6.5 2.07 6.5 3.5V5H5v2h1.5v8h2V7H10l.5-2H8.5V3.5c0-.28.22-.5.5-.5H9.5z"/>
  </svg>
}
function InstagramIcon() {
  return <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" rx="3.5"/>
    <circle cx="8" cy="8" r="3"/>
    <circle cx="11.5" cy="4.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
}
function XIcon() {
  return <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
    <path d="M11.9 1h2.3L9.1 6.6 15 14h-4.3l-3.5-4.6L3 14H.7l5.5-6L0 1h4.4l3.2 4.2L11.9 1zM11 12.7h1.3L4 2.3H2.6L11 12.7z"/>
  </svg>
}
function YouTubeIcon() {
  return <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" aria-hidden="true">
    <path d="M15.8 4.6s-.2-1.2-.7-1.7c-.7-.7-1.4-.7-1.8-.8C11.1 2 8.5 2 8.5 2s-2.6 0-4.8.1c-.4.1-1.1.1-1.8.8-.5.5-.7 1.7-.7 1.7S1 5.9 1 7.2v1.2c0 1.3.2 2.6.2 2.6s.2 1.2.7 1.7c.7.7 1.6.7 2 .7 1.4.1 6.1.2 6.1.2s2.6 0 4.8-.2c.4-.1 1.1-.1 1.8-.8.5-.5.7-1.7.7-1.7S17 9.7 17 8.4V7.2c0-1.3-.2-2.6-.2-2.6zM6.8 10.5V6l4.6 2.3-4.6 2.2z"/>
  </svg>
}
function TikTokIcon() {
  return <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M10.5 0h-2v10a2 2 0 1 1-2-2v-2a4 4 0 1 0 4 4V5.4A6.5 6.5 0 0 0 14 6V4a4.5 4.5 0 0 1-3.5-4z"/>
  </svg>
}
