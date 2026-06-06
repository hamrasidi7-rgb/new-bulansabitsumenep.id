import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import VerifiedBadge from "@/components/article/VerifiedBadge";
import AiToolbar from "@/components/ai/AiToolbar";
import AiSummary from "@/components/ai/AiSummary";
import AskArticle from "@/components/ai/AskArticle";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import ArticleCard from "@/components/article/ArticleCard";
import { getArticleBySlug, getRecentArticles, articles } from "@/data/articles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Bulan Sabit Sumenep`,
    description: article.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRecentArticles(3, slug);
  const fullText = article.body.join(" ");

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-2xl flex-1 pb-32 pt-0">
        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-b-2xl">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>

        <div className="px-4 pt-5">
          {/* Metadata */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent-red)]">
              {article.category}
            </span>
            {article.isVerified && <VerifiedBadge />}
          </div>

          {/* Judul */}
          <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
            {article.title}
          </h1>

          {/* Penulis + tanggal + waktu baca */}
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
            <span className="font-medium text-[var(--foreground)]">
              {article.author.name}
            </span>
            <span>·</span>
            <span>{article.author.title}</span>
            <span>·</span>
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            <span>·</span>
            <span>{article.readingMinutes} mnt baca</span>
          </div>

          {/* AI Toolbar */}
          <div className="mt-4">
            <AiToolbar
              articleText={fullText}
              durationMinutes={article.readingMinutes}
              articleSlug={article.slug}
            />
          </div>

          {/* AI Summary */}
          <div className="mt-4">
            <AiSummary />
          </div>

          {/* Badan Artikel */}
          <article
            className="article-body mt-6"
            aria-label={`Isi artikel: ${article.title}`}
          >
            {/* Desktop: 2 kolom; Mobile: 1 kolom */}
            <div className="sm:columns-2 sm:gap-6">
              {article.body.map((para, i) => {
                // Sisipkan pull quote setelah paragraf ke-2 jika ada
                const isPullQuoteSlot = i === 2 && article.pullQuote;
                return (
                  <div key={i}>
                    <p className="mb-4 font-serif text-[16px] leading-[1.8] text-[var(--foreground)] break-inside-avoid">
                      {para}
                    </p>
                    {isPullQuoteSlot && (
                      <blockquote
                        className="pull-quote break-inside-avoid"
                        aria-label="Kutipan utama artikel"
                      >
                        {article.pullQuote}
                      </blockquote>
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          {/* Tag */}
          {article.tags.length > 0 && (
            <div
              className="mt-6 flex flex-wrap gap-2"
              aria-label="Tag artikel"
            >
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* WhatsApp */}
          <div className="mt-6">
            <WhatsAppCard
              message="Ada pertanyaan tentang kondisi kesehatan Anda?"
              ctaText="Tanya Tim Medis PMI"
            />
          </div>

          {/* Artikel terkait */}
          {related.length > 0 && (
            <section className="mt-8" aria-labelledby="related-heading">
              <h2
                id="related-heading"
                className="mb-4 font-serif text-lg font-bold text-[var(--foreground)]"
              >
                Baca Juga
              </h2>
              <div>
                {related.map((rel) => (
                  <ArticleCard key={rel.slug} article={rel} variant="list" />
                ))}
              </div>
            </section>
          )}

          {/* Kembali ke beranda */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      {/* Panel Tanya AI — sticky di bawah, di atas BottomNav */}
      <div className="fixed bottom-16 left-0 right-0 z-40 mx-auto max-w-2xl">
        <AskArticle
          articleTitle={article.title}
          articleSlug={article.slug}
        />
      </div>

      <BottomNav />
    </div>
  );
}
