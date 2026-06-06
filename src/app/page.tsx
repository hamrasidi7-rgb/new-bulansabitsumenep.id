"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryFilter from "@/components/article/CategoryFilter";
import AiHighlight from "@/components/ai/AiHighlight";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import Link from "next/link";
import {
  articles,
  getFeaturedArticle,
  type FilterCategory,
} from "@/data/articles";
import { contributors } from "@/data/contributors";
import ContributorCard from "@/components/contributor/ContributorCard";
import { siteConfig } from "@/lib/site";

export default function BerandaPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("Semua");

  const featured = getFeaturedArticle();

  const filtered = articles
    .filter((a) => {
      if (activeCategory === "Semua") return true;
      if (activeCategory === "Kemanusiaan")
        return (
          a.category === "Aksi Kemanusiaan" || a.category === "Kemanusiaan"
        );
      return a.category === activeCategory;
    })
    .filter((a) => a.slug !== featured?.slug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 px-4 pb-24 pt-4">

        {/* Tagline portal — di bawah nama portal, atas beranda */}
        <div className="mb-5 border-b border-[var(--border)] pb-4 text-center">
          <p className="text-xs italic text-[var(--muted)]">{siteConfig.tagline}</p>
        </div>

        {/* Headline Utama */}
        {featured && (
          <section aria-labelledby="headline-label" className="mb-5">
            <p
              id="headline-label"
              className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted)]"
            >
              Headline
            </p>
            <ArticleCard article={featured} variant="featured" />
          </section>
        )}

        {/* Sorotan AI */}
        <section aria-labelledby="ai-highlight-heading" className="mb-5">
          <AiHighlight />
        </section>

        {/* Filter Kategori */}
        <section aria-label="Filter kategori artikel" className="mb-4">
          <CategoryFilter
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </section>

        {/* Daftar Artikel */}
        <section aria-label="Daftar artikel">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-[var(--muted)]">
              Belum ada artikel di kategori ini.
            </p>
          ) : (
            <div>
              {filtered.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  variant="list"
                />
              ))}
            </div>
          )}
        </section>

        {/* Preview Kontributor */}
        <section aria-labelledby="kontributor-preview-heading" className="mt-8">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-red)]">
                Kontributor
              </p>
              <h2
                id="kontributor-preview-heading"
                className="font-serif text-lg font-bold text-[var(--foreground)]"
              >
                Dokter &amp; Tenaga Kesehatan Kami
              </h2>
            </div>
            <Link
              href="/kontributor"
              className="text-xs font-semibold text-[var(--accent-red)] hover:underline min-h-[44px] flex items-center"
            >
              Lihat semua →
            </Link>
          </div>
          <p className="mb-4 text-sm text-[var(--muted)]">
            Konten kami ditulis dan direview oleh dokter dan tenaga kesehatan berpengalaman.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {contributors.slice(0, 4).map((c) => (
              <ContributorCard key={c.id} contributor={c} />
            ))}
          </div>
          <Link
            href="/kontributor"
            className="mt-4 flex w-full min-h-[44px] items-center justify-center rounded-xl border-2 border-[var(--accent-red)] text-sm font-semibold text-[var(--accent-red)] transition hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            Lihat Semua Kontributor
          </Link>
        </section>

        {/* Kartu WhatsApp */}
        <section className="mt-6" aria-label="Kontak WhatsApp PMI Sumenep">
          <WhatsAppCard />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
