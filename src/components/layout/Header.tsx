import Link from "next/link";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        {/* Logo + nama */}
        <Link
          href="/"
          className="flex items-center gap-2.5 min-h-[44px]"
          aria-label="Beranda Bulan Sabit Sumenep"
        >
          <HeartbeatIcon />
          <div className="leading-tight">
            <div className="text-sm font-bold text-[var(--foreground)] font-serif">
              Bulan Sabit Sumenep
            </div>
            <div className="text-[10px] font-medium uppercase tracking-widest text-[var(--muted)]">
              Kesehatan &amp; Kemanusiaan
            </div>
          </div>
        </Link>

        {/* Navigasi kanan */}
        <div className="flex items-center gap-1">
          {showSearch && (
            <Link
              href="/cari"
              aria-label="Cari artikel"
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--border)] transition"
            >
              <SearchIcon />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

function HeartbeatIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="#dc2626" />
      <path
        d="M4 16h5l2.5-6L14 22l2.5-8 2 5H28"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M13 13l4 4" />
    </svg>
  );
}
