import Image from "next/image";
import { siteConfig } from "@/lib/site";

// ── Konstanta ──────────────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  { label: "Facebook Bulan Sabit Sumenep", href: "#", icon: <FacebookIcon /> },
  { label: "Instagram Bulan Sabit Sumenep", href: "#", icon: <InstagramIcon /> },
  { label: "X (Twitter) Bulan Sabit Sumenep", href: "#", icon: <XIcon /> },
  { label: "YouTube Bulan Sabit Sumenep", href: "#", icon: <YouTubeIcon /> },
  { label: "TikTok Bulan Sabit Sumenep", href: "#", icon: <TikTokIcon /> },
];

const NAV_LINKS = [
  { label: "Tentang Kami", href: "#" },
  { label: "Manajemen & Dewan Redaksi", href: "#" },
  { label: "Pedoman Media Siber", href: "#" },
  { label: "Periklanan & Kerjasama", href: "#" },
  { label: "FAQ", href: "#" },
  { label: "Kebijakan Layanan", href: "#" },
  { label: "Privasi Pengguna", href: "#" },
];

// ── Komponen utama ─────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="pb-[4.5rem] sm:pb-0"   // pb-[4.5rem] = ruang untuk BottomNav fixed di mobile
      style={{ backgroundColor: "#1a2235" }}
      aria-label="Footer Bulan Sabit Sumenep"
    >
      <div className="mx-auto max-w-2xl px-6 py-10 flex flex-col items-center gap-8">

        {/* ── 1. Baris logo ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-5" role="img" aria-label="Logo Bulan Sabit Sumenep dan Palang Merah Indonesia">

          {/* Logo BSM
              TODO: ganti /logo-bulansabitsumenep.jpg dengan file logo final Anda di folder /public */}
          <div className="relative h-10 w-[136px] overflow-hidden rounded-md bg-white px-2 py-1">
            <Image
              src="/logo-bulansabitsumenep.jpg"
              alt="Bulan Sabit Merah Sumenep"
              fill
              className="object-contain"
              sizes="136px"
            />
          </div>

          {/* Pemisah vertikal */}
          <span className="h-10 w-px bg-white/20" aria-hidden="true" />

          {/* Logo PMI
              TODO: ganti /logo-pmi.jpg dengan file logo final Anda di folder /public */}
          <div className="relative h-10 w-[116px] overflow-hidden rounded-md bg-white px-2 py-1">
            <Image
              src="/logo-pmi.jpg"
              alt="Palang Merah Indonesia"
              fill
              className="object-contain"
              sizes="116px"
            />
          </div>
        </div>

        {/* ── 1b. Tagline ───────────────────────────────────────────────── */}
        <p className="text-center text-sm italic text-white/55 -mt-4">
          {siteConfig.tagline}
        </p>

        {/* ── 2. Ikon media sosial ───────────────────────────────────────── */}
        <div className="flex items-center gap-3" role="list" aria-label="Media sosial">
          {SOCIAL_LINKS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              role="listitem"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/70 transition duration-150 hover:border-white hover:text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* ── 3. Menu tautan ────────────────────────────────────────────── */}
        <nav aria-label="Tautan footer">
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label} className="flex items-center gap-3">
                <a
                  href={href}
                  className="text-xs text-white/60 transition hover:text-white focus-visible:text-white"
                >
                  {label}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-white/25 select-none" aria-hidden="true">•</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── 4. Garis pemisah ──────────────────────────────────────────── */}
        <hr className="w-full border-white/10" />

        {/* ── 5. Copyright ──────────────────────────────────────────────── */}
        <p className="text-center text-xs text-white/40 leading-relaxed">
          Copyright &copy; {year} Bulan Sabit Sumenep &bull; PMI Kabupaten Sumenep.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ── Ikon media sosial (SVG inline) ─────────────────────────────────────────

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M9.5 3H11V1h-1.5C7.57 1 6.5 2.07 6.5 3.5V5H5v2h1.5v8h2V7H10l.5-2H8.5V3.5c0-.28.22-.5.5-.5H9.5z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="3.5" />
      <circle cx="8" cy="8" r="3" />
      <circle cx="11.5" cy="4.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <path d="M11.9 1h2.3L9.1 6.6 15 14h-4.3l-3.5-4.6L3 14H.7l5.5-6L0 1h4.4l3.2 4.2L11.9 1zM11 12.7h1.3L4 2.3H2.6L11 12.7z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="currentColor" aria-hidden="true">
      <path d="M15.8 4.6s-.2-1.2-.7-1.7c-.7-.7-1.4-.7-1.8-.8C11.1 2 8.5 2 8.5 2s-2.6 0-4.8.1c-.4.1-1.1.1-1.8.8-.5.5-.7 1.7-.7 1.7S1 5.9 1 7.2v1.2c0 1.3.2 2.6.2 2.6s.2 1.2.7 1.7c.7.7 1.6.7 2 .7 1.4.1 6.1.2 6.1.2s2.6 0 4.8-.2c.4-.1 1.1-.1 1.8-.8.5-.5.7-1.7.7-1.7S17 9.7 17 8.4V7.2c0-1.3-.2-2.6-.2-2.6zM6.8 10.5V6l4.6 2.3-4.6 2.2z" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
      <path d="M10.5 0h-2v10a2 2 0 1 1-2-2v-2a4 4 0 1 0 4 4V5.4A6.5 6.5 0 0 0 14 6V4a4.5 4.5 0 0 1-3.5-4z" />
    </svg>
  );
}
