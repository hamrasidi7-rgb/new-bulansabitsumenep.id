"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: ({ isActive }: { isActive: boolean }) => React.JSX.Element;
}

const navItems: NavItem[] = [
  { href: "/berita-kesehatan", label: "Kesehatan",  icon: HealthIcon },
  { href: "/aksi-kemanusiaan", label: "Aksi",       icon: AksiIcon },
  { href: "/dokter-menulis",   label: "Dokter",     icon: DokterIcon },
  { href: "/video-story",      label: "Video",      icon: VideoIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm"
      aria-label="Navigasi utama"
    >
      <div className="mx-auto flex max-w-2xl">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname.startsWith(href);

          return (
            <Link
              key={label}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[10px] font-medium transition-colors ${
                isActive
                  ? "text-pmi-red dark:text-red-400"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Icon isActive={isActive} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

function HealthIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 19C11 19 3 13.5 3 8a4 4 0 017-2.65A4 4 0 0119 8c0 5.5-8 11-8 11z"/>
      <path d="M8 9h2l1-2 1 4 1-2h2"/>
    </svg>
  );
}

function AksiIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 13c0-1.5 1-2.5 2.5-2.5S9 12 9 12s1-3 2.5-3S14 10 14 10"/>
      <path d="M2 16.5C3.5 19 6 20 9 20c3.5 0 6.5-1.5 8.5-4L19 14a1.5 1.5 0 00-2.5-1.5L14 15"/>
      <path d="M2 11V7a2 2 0 114 0v5"/>
    </svg>
  );
}

function DokterIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="7" r="4"/>
      <path d="M4 20c0-3.3 3.1-6 7-6s7 2.7 7 6"/>
      <path d="M16 13v4M14 15h4"/>
    </svg>
  );
}

function VideoIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="13" height="12" rx="2"/>
      <path d="M15 9l5-3v10l-5-3V9z"/>
    </svg>
  );
}
