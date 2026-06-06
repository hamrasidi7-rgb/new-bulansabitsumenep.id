import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";
import VerifiedBadge from "@/components/article/VerifiedBadge";
import ArticleImage from "@/components/article/ArticleImage";
import ShareButtons from "@/components/article/ShareButtons";
import AiToolbar from "@/components/ai/AiToolbar";
import AiSummary from "@/components/ai/AiSummary";
import AskArticle from "@/components/ai/AskArticle";
import WhatsAppCard from "@/components/ui/WhatsAppCard";
import ArticleCard from "@/components/article/ArticleCard";
import { getArticleBySlug, getRecentArticles, articles } from "@/data/articles";
import { siteConfig } from "@/lib/site";

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

  // title tanpa suffix — template layout ("%s — Bulan Sabit Sumenep") menambahkannya otomatis
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      siteName: siteConfig.displayName,
      locale: "id_ID",
      // heroImage sudah URL absolut (Unsplash) — langsung dipakai sebagai OG image artikel
      images: [
        {
          url: article.heroImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.heroImage],
    },
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

        {/* ── Hero Image ─────────────────────────────────────────────────── */}
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

        {/* ── Caption foto hero ──────────────────────────────────────────── */}
        {(article.heroCaption || article.heroCredit) && (
          <p className="px-4 pt-2 text-xs leading-relaxed text-[var(--muted)] italic">
            {article.heroCaption && <span>{article.heroCaption}</span>}
            {article.heroCaption && article.heroCredit && " "}
            {article.heroCredit && `(Foto: ${article.heroCredit})`}
          </p>
        )}

        <div className="px-4 pt-4">
          {/* ── Metadata ────────────────────────────────────────────────── */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--accent-red)]">
              {article.category}
            </span>
            {article.isVerified && <VerifiedBadge />}
          </div>

          {/* ── Judul ───────────────────────────────────────────────────── */}
          <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
            {article.title}
          </h1>

          {/* ── Penulis + tanggal + waktu baca ──────────────────────────── */}
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

          {/* ── Share buttons (a) — di bawah penulis/tanggal ────────────── */}
          <div className="mt-3">
            <ShareButtons title={article.title} slug={article.slug} />
          </div>

          {/* ── AI Toolbar ──────────────────────────────────────────────── */}
          <div className="mt-4">
            <AiToolbar
              articleText={fullText}
              durationMinutes={article.readingMinutes}
              articleSlug={article.slug}
            />
          </div>

          {/* ── AI Summary ──────────────────────────────────────────────── */}
          <div className="mt-4">
            <AiSummary />
          </div>

          {/* ── Badan Artikel ───────────────────────────────────────────── */}
          <article
            className="article-body mt-6"
            aria-label={`Isi artikel: ${article.title}`}
          >
            {/* Desktop: 2 kolom; Mobile: 1 kolom */}
            <div className="sm:columns-2 sm:gap-6">
              {article.body.map((para, i) => {
                const isPullQuoteSlot = i === 2 && article.pullQuote;
                // Gambar inline disisipkan setelah paragraf ke-i
                const inlineImage = article.bodyImages?.find(
                  (img) => img.afterParagraph === i
                );

                return (
                  <div key={i}>
                    {/* Drop cap HANYA pada paragraf pertama (i === 0) */}
                    <p
                      className={`mb-4 font-serif text-[16px] leading-[1.8] text-[var(--foreground)] break-inside-avoid${
                        i === 0 ? " first-paragraph" : ""
                      }`}
                    >
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

                    {/* Foto inline — [column-span:all] agar merentang dua kolom di desktop */}
                    {inlineImage && (
                      <ArticleImage
                        src={inlineImage.src}
                        alt={inlineImage.alt}
                        caption={inlineImage.caption}
                        credit={inlineImage.credit}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </article>

          {/* ── Tag ─────────────────────────────────────────────────────── */}
          {article.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Tag artikel">
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

          {/* ── Share buttons (b) — di akhir artikel ────────────────────── */}
          <div className="mt-5 border-t border-[var(--border)] pt-5">
            <ShareButtons title={article.title} slug={article.slug} />
          </div>

          {/* ── WhatsApp ─────────────────────────────────────────────────── */}
          <div className="mt-6">
            <WhatsAppCard
              message="Ada pertanyaan tentang kondisi kesehatan Anda?"
              ctaText="Tanya Tim Medis PMI"
            />
          </div>

          {/* ── Artikel terkait ──────────────────────────────────────────── */}
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

          {/* ── Kembali ke beranda ───────────────────────────────────────── */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl border border-[var(--border)] px-5 py-2.5 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
            >
              ← Kembali ke Beranda
            </Link>
          </div>
        </div>
      </main>

      {/* ── Panel Tanya AI — sticky di atas BottomNav ─────────────────── */}
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
