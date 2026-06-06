"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ArticleCard from "@/components/article/ArticleCard";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import { articles } from "@/data/articles";

type EduFilter = "Semua" | "Edukasi" | "Gizi";

const EDU_FILTERS: EduFilter[] = ["Semua", "Edukasi", "Gizi"];

export default function EdukasiPage() {
  const [activeFilter, setActiveFilter] = useState<EduFilter>("Semua");

  const eduArticles = articles
    .filter((a) => a.category === "Edukasi" || a.category === "Gizi")
    .filter((a) => {
      if (activeFilter === "Semua") return true;
      return a.category === activeFilter;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-4">
        {/* Page header */}
        <div className="mb-5">
          <h1 className="font-serif text-2xl font-bold text-[var(--foreground)]">
            Edukasi Kesehatan
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Panduan kesehatan praktis, ditulis dan divalidasi oleh dokter &
            tenaga kesehatan.
          </p>
        </div>

        {/* Filter */}
        <div
          className="mb-5 flex gap-2 overflow-x-auto no-scrollbar"
          role="tablist"
          aria-label="Filter kategori edukasi"
        >
          {EDU_FILTERS.map((f) => (
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

        {/* Grid artikel */}
        {eduArticles.length === 0 ? (
          <p className="py-12 text-center text-sm text-[var(--muted)]">
            Belum ada artikel di kategori ini.
          </p>
        ) : (
          <section aria-label="Artikel edukasi kesehatan">
            {/* Grid 2 kolom untuk artikel kecil */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
              {eduArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  variant="grid"
                />
              ))}
            </div>
          </section>
        )}

        {/* Tips kesehatan ringkas */}
        <section
          className="mt-8"
          aria-labelledby="tips-heading"
        >
          <h2
            id="tips-heading"
            className="mb-3 font-serif text-lg font-bold text-[var(--foreground)]"
          >
            Tips Sehat Cepat
          </h2>
          <div className="space-y-3">
            {QUICK_TIPS.map((tip, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-lg dark:bg-red-900/40">
                  {tip.emoji}
                </span>
                <div>
                  <p className="text-sm font-semibold text-[var(--foreground)]">
                    {tip.title}
                  </p>
                  <p className="mt-0.5 text-xs leading-relaxed text-[var(--muted)]">
                    {tip.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WhatsApp */}
        <div className="mt-6">
          <WhatsAppCard
            message="Ada pertanyaan kesehatan? Konsultasi gratis dengan tim PMI Sumenep."
            ctaText="Konsultasi via WhatsApp"
          />
        </div>
      </main>

      <BottomNav />
    </div>
  );
}

const QUICK_TIPS = [
  {
    emoji: "💧",
    title: "Minum 8 gelas air per hari",
    body: "Di cuaca panas Madura, kebutuhan cairan bisa lebih tinggi. Urine berwarna kuning pucat adalah tanda hidrasi yang cukup.",
  },
  {
    emoji: "🦟",
    title: "3M Plus untuk cegah DBD",
    body: "Menguras, Menutup, Mendaur ulang — plus menggunakan kelambu dan lotion anti-nyamuk saat musim hujan.",
  },
  {
    emoji: "🥬",
    title: "Daun kelor untuk gizi ibu hamil",
    body: "100g daun kelor mengandung kalsium 4x lebih banyak dari susu. Masak sebagai sayur bening 3x seminggu.",
  },
  {
    emoji: "🩺",
    title: "Periksa tekanan darah rutin",
    body: "Hipertensi sering tanpa gejala. Periksa minimal setahun sekali di Puskesmas terdekat — gratis dengan BPJS.",
  },
];
