"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  href: string;
  label: string;
  icon: ({ isActive }: { isActive: boolean }) => React.JSX.Element;
  exact: boolean;
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
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm"
      aria-label="Navigasi utama"
    >
      <div className="mx-auto flex max-w-2xl">
        {navItems.map(({ href, label, icon: Icon, exact }) => {
          const isActive = exact
            ? pathname === href
            : href !== "/" && pathname.startsWith(href);

          const commonClass = `flex flex-1 flex-col items-center justify-center gap-0.5 py-2 min-h-[56px] text-[10px] font-medium transition-colors ${
            isActive
              ? "text-pmi-red dark:text-red-400"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`;

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

function HomeIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" aria-hidden="true">
      <path d="M3 10L11 3l8 7" />
      <path d="M5 8.5V19h4v-5h4v5h4V8.5" />
    </svg>
  );
}

function BookIcon({ isActive }: { isActive: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={isActive ? 2.2 : 1.7} strokeLinecap="round" aria-hidden="true">
      <path d="M4 3h6a3 3 0 013 3v12a2 2 0 00-2-2H4V3z"/>
      <path d="M18 3h-6a3 3 0 00-3 3v12a2 2 0 012-2h7V3z" opacity=".5"/>
    </svg>
  );
}


