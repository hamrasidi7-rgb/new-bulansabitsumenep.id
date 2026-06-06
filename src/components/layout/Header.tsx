import Link from "next/link";
import Image from "next/image";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-2">

        {/* Logo kiri: BSM */}
        <Link
          href="/"
          className="flex items-center gap-3 min-h-[44px]"
          aria-label="Beranda Bulan Sabit Sumenep"
        >
          <div className="relative h-10 w-[130px] shrink-0">
            <Image
              src="/logo-bulansabitsumenep.jpg"
              alt="Bulan Sabit Merah Sumenep"
              fill
              className="object-contain object-left"
              sizes="130px"
              priority
            />
          </div>
        </Link>

        {/* Kanan: logo PMI + search */}
        <div className="flex items-center gap-2">
          {/* Logo PMI — badge afiliasi */}
          <div className="relative h-8 w-[72px] shrink-0 opacity-80">
            <Image
              src="/logo-pmi.jpg"
              alt="Palang Merah Indonesia"
              fill
              className="object-contain object-right"
              sizes="72px"
            />
          </div>

          {/* Divider */}
          <span className="h-6 w-px bg-[var(--border)]" aria-hidden="true" />

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
