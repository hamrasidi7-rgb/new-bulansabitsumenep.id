"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import ArticleCard from "@/components/article/ArticleCard";
import CategoryFilter from "@/components/article/CategoryFilter";
import AiHighlight from "@/components/ai/AiHighlight";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import {
  articles,
  getFeaturedArticle,
  type FilterCategory,
} from "@/data/articles";

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

        {/* Kartu WhatsApp */}
        <section className="mt-6" aria-label="Kontak WhatsApp PMI Sumenep">
          <WhatsAppCard />
        </section>
      </main>

      <BottomNav />
    </div>
  );
}
