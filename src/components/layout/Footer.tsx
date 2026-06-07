import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { getSiteSettings } from "@/lib/sitePages";

const NAV_LINKS = [
  { label: "Tentang Kami", href: "/tentang-kami" },
  { label: "Manajemen & Dewan Redaksi", href: "/redaksi" },
  { label: "Pedoman Media Siber", href: "/pedoman-media-siber" },
  { label: "Periklanan & Kerjasama", href: "/periklanan" },
  { label: "FAQ", href: "/faq" },
  { label: "Kebijakan Layanan", href: "/kebijakan-layanan" },
  { label: "Privasi Pengguna", href: "/privasi" },
];

export default async function Footer() {
  const year = new Date().getFullYear();
  const settings = await getSiteSettings().catch(() => ({} as Record<string, string>));

  const socialLinks = [
    { label: "Facebook Bulan Sabit Sumenep",    href: settings.facebook_url  || "#", icon: <FacebookIcon /> },
    { label: "Instagram Bulan Sabit Sumenep",   href: settings.instagram_url || "#", icon: <InstagramIcon /> },
    { label: "X (Twitter) Bulan Sabit Sumenep", href: settings.twitter_url   || "#", icon: <XIcon /> },
    { label: "YouTube Bulan Sabit Sumenep",     href: settings.youtube_url   || "#", icon: <YouTubeIcon /> },
    { label: "TikTok Bulan Sabit Sumenep",      href: settings.tiktok_url    || "#", icon: <TikTokIcon /> },
  ];

  return (
    <footer
      className="pb-[4.5rem] sm:pb-0 bg-[#e8ecf2]"
      aria-label="Footer Bulan Sabit Sumenep"
    >
      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">

        {/* ── Logo + tagline ─────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-4" role="img" aria-label="Logo Bulan Sabit Sumenep dan Palang Merah Indonesia">
            <div className="relative h-10 w-[136px] overflow-hidden rounded-md bg-white px-2 py-1">
              <Image
                src="/logo-bulansabitsumenep.jpg"
                alt="Bulan Sabit Merah Sumenep"
                fill
                className="object-contain"
                sizes="136px"
              />
            </div>
            <span className="h-10 w-px bg-gray-300" aria-hidden="true" />
            <div className="relative h-10 w-[160px] overflow-hidden rounded-md bg-white px-2 py-1">
              <Image
                src="/logo-pmi-sumenep.jpg"
                alt="Palang Merah Indonesia Kabupaten Sumenep"
                fill
                className="object-contain"
                sizes="160px"
              />
            </div>
          </div>
          <p className="text-center text-sm italic text-gray-500 sm:text-right">
            {siteConfig.tagline}
          </p>
        </div>

        {/* ── Media sosial ───────────────────────────────────────────── */}
        <div className="flex justify-center gap-3" role="list" aria-label="Media sosial">
          {socialLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              role="listitem"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition duration-150 hover:border-[#1a2235] hover:text-[#1a2235] hover:bg-white/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a2235]"
            >
              {icon}
            </a>
          ))}
        </div>

        {/* ── Tautan legal ───────────────────────────────────────────── */}
        <nav aria-label="Tautan footer">
          <ul className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {NAV_LINKS.map(({ label, href }, i) => (
              <li key={label} className="flex items-center gap-3">
                <a
                  href={href}
                  className="text-xs text-gray-500 transition hover:text-[#1a2235] focus-visible:text-[#1a2235]"
                >
                  {label}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-gray-300 select-none" aria-hidden="true">•</span>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Copyright ──────────────────────────────────────────────── */}
        <hr className="border-gray-300" />
        <p className="text-center text-xs text-gray-400 leading-relaxed">
          Copyright &copy; {year} Bulan Sabit Sumenep &bull; PMI Kabupaten Sumenep.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

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
