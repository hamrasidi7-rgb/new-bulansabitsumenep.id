"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ContributorCard from "@/components/contributor/ContributorCard";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import {
  getContributorsByRole,
  CONTRIBUTOR_FILTERS,
  type ContributorFilter,
} from "@/data/contributors";

const WA_JOIN = "6285234567890";
const WA_JOIN_MSG = encodeURIComponent(
  "Halo, saya ingin bergabung sebagai penulis/kontributor di Bulan Sabit Sumenep."
);

export default function KontributorPage() {
  const [activeFilter, setActiveFilter] = useState<ContributorFilter>("Semua");
  const filtered = getContributorsByRole(activeFilter);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-5">

        {/* Hero teks */}
        <section aria-labelledby="kontributor-heading" className="mb-6">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
            Kontributor
          </p>
          <h1
            id="kontributor-heading"
            className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)]"
          >
            Dokter &amp; Tenaga Kesehatan Kami
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
            Konten ini ditulis dan direview oleh dokter dan tenaga kesehatan
            berpengalaman — dari dokter spesialis, psikolog, hingga perawat
            komunitas yang bertugas langsung di kepulauan Sumenep.
          </p>

          {/* Tombol bergabung */}
          <a
            href={`https://wa.me/${WA_JOIN}?text=${WA_JOIN_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Bergabung sebagai penulis (buka WhatsApp)"
            className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-[var(--accent-red)] px-5 py-2 text-sm font-semibold text-[var(--accent-red)] transition hover:bg-red-50 dark:hover:bg-red-950/30"
          >
            Bergabung Menulis
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 7h10M8 3l4 4-4 4" />
            </svg>
          </a>
        </section>

        {/* Statistik ringkas */}
        <div className="mb-5 grid grid-cols-3 gap-3">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-3 text-center"
            >
              <p className="font-serif text-xl font-bold text-[var(--accent-red)]">
                {s.value}
              </p>
              <p className="mt-0.5 text-[11px] text-[var(--muted)]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter role */}
        <div
          className="mb-4 flex gap-2 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Filter peran kontributor"
        >
          {CONTRIBUTOR_FILTERS.map((f) => (
            <button
              key={f}
              role="tab"
              aria-selected={f === activeFilter}
              onClick={() => setActiveFilter(f)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition min-h-[44px] ${
                f === activeFilter
                  ? "bg-[var(--accent-red)] text-white"
                  : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--accent-red)] hover:text-[var(--foreground)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid kontributor */}
        <section aria-label={`Daftar kontributor — ${activeFilter}`}>
          {filtered.length === 0 ? (
            <p className="py-12 text-center text-sm text-[var(--muted)]">
              Belum ada kontributor di kategori ini.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filtered.map((c) => (
                <ContributorCard key={c.id} contributor={c} />
              ))}
            </div>
          )}
        </section>

        {/* CTA bergabung — bawah */}
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900 dark:bg-red-950/20">
          <h2 className="font-serif text-base font-bold text-[var(--foreground)]">
            Anda dokter atau tenaga kesehatan?
          </h2>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Bergabunglah sebagai penulis tamu dan bantu masyarakat Sumenep
            mendapat informasi kesehatan yang tepat dan terpercaya.
          </p>
          <a
            href={`https://wa.me/${WA_JOIN}?text=${WA_JOIN_MSG}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[var(--accent-red)] px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Hubungi Kami via WhatsApp
          </a>
        </div>

        <div className="mt-6">
          <WhatsAppCard />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

const STATS = [
  { value: "8", label: "Kontributor" },
  { value: "105+", label: "Artikel" },
  { value: "100%", label: "Terverifikasi" },
];
