"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileNav from "./MobileNav";

interface HeaderProps {
  showSearch?: boolean;
}

export default function Header({ showSearch = true }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#1a2235]">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-3 py-1.5">

          {/* Kiri: ikon BSM + teks */}
          <Link
            href="/"
            className="flex items-center gap-2 min-h-[44px]"
            aria-label="Beranda Bulan Sabit Sumenep"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-lg">
              <Image
                src="/logo-bulansabitsumenep.jpg"
                alt="Logo Bulan Sabit Sumenep"
                fill
                className="object-cover object-left"
                sizes="36px"
                priority
              />
            </div>
            <div className="leading-tight">
              <span className="block text-[13px] font-bold lowercase tracking-tight text-white">
                bulansabit
              </span>
              <span className="block text-[11px] font-semibold lowercase text-red-300 -mt-0.5">
                sumenep
              </span>
            </div>
          </Link>

          {/* Kanan: logo PMI + search + menu */}
          <div className="flex items-center gap-0.5">
            <div className="relative h-9 w-[120px] sm:w-[168px] shrink-0 overflow-hidden">
              <Image
                src="/logo-pmi-sumenep.png"
                alt="Palang Merah Indonesia Kabupaten Sumenep"
                fill
                className="object-contain object-right"
                sizes="(max-width:640px) 120px, 168px"
              />
            </div>

            {showSearch && (
              <Link
                href="/cari"
                aria-label="Cari artikel"
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <SearchIcon />
              </Link>
            )}

            <button
              aria-label="Buka menu navigasi"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      <MobileNav isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <circle cx="8.5" cy="8.5" r="5.5" />
      <path d="M13 13l4 4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  );
}
