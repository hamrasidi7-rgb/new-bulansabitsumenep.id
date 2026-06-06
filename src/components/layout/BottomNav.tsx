"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const WA_NUMBER = "6285234567890"; // ganti dengan nomor PMI Sumenep yang sebenarnya

interface NavItem {
  href: string;
  label: string;
  icon: ({ isActive, isGreen }: { isActive: boolean; isGreen?: boolean }) => React.JSX.Element;
  exact: boolean;
  external?: boolean;
  isGreen?: boolean;
}

const navItems: NavItem[] = [
  {
    href: "/",
    label: "Beranda",
    icon: HomeIcon,
    exact: true,
  },
  {
    href: "/edukasi",
    label: "Edukasi",
    icon: BookIcon,
    exact: false,
  },
  {
    href: "/tanya-ai",
    label: "Tanya AI",
    icon: AiIcon,
    exact: false,
  },
  {
    href: `https://wa.me/${WA_NUMBER}`,
    label: "WhatsApp",
    icon: WhatsappIcon,
    exact: false,
    external: true,
    isGreen: true,
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm"
      aria-label="Navigasi utama"
    >
      <div className="mx-auto flex max-w-2xl">
        {navItems.map(({ href, label, icon: Icon, exact, external, isGreen }) => {
          const isActive = exact
            ? pathname === href
            : href !== "/" && pathname.startsWith(href);

          const commonClass = `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[10px] font-medium transition-colors ${
            isGreen
              ? "text-green-600 dark:text-green-400"
              : isActive
              ? "text-pmi-red dark:text-red-400"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`;

          if (external) {
            return (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (buka di tab baru)`}
                className={commonClass}
              >
                <Icon isActive={false} isGreen />
                <span>{label}</span>
              </a>
            );
          }

          return (
            <Link
              key={label}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className={commonClass}
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

function HomeIcon({ isActive }: { isActive: boolean; isGreen?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" aria-hidden="true">
      <path d="M3 10L11 3l8 7" />
      <path d="M5 8.5V19h4v-5h4v5h4V8.5" />
    </svg>
  );
}

function BookIcon({ isActive }: { isActive: boolean; isGreen?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" aria-hidden="true">
      <path d="M4 3h6a3 3 0 013 3v12a2 2 0 00-2-2H4V3z"/>
      <path d="M18 3h-6a3 3 0 00-3 3v12a2 2 0 012-2h7V3z" opacity=".5"/>
    </svg>
  );
}

function AiIcon({ isActive }: { isActive: boolean; isGreen?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" aria-hidden="true">
      <rect x="3" y="3" width="16" height="13" rx="3"/>
      <path d="M7 19h8M11 16v3"/>
      <path d="M7.5 9l1.5 3 2-5 2 5 1.5-3" strokeLinejoin="round"/>
    </svg>
  );
}

function WhatsappIcon({ isGreen }: { isActive: boolean; isGreen?: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={isGreen ? "#16a34a" : "currentColor"} strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M11 2a9 9 0 019 9c0 4.97-4.03 9-9 9a8.96 8.96 0 01-4.65-1.3L2 20l1.33-4.27A8.97 8.97 0 012 11a9 9 0 019-9z"/>
      <path d="M8 9.5c.3 2.8 3.7 5.5 6 6 .5-1 .8-1.7.7-2.1-.1-.3-.5-.5-1-.8-.5-.2-.9-.1-1.2.2-.5.5-1 .5-1.9-.1-.9-.6-1.6-1.4-1.7-2.3-.1-.9.2-1.3.7-1.7.3-.3.4-.7.2-1.2-.2-.5-.6-.9-.9-1C9.4 6 8 7 8 9.5z"/>
    </svg>
  );
}
