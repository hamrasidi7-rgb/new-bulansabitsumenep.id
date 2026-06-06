import Image from "next/image";
import Link from "next/link";
import { type Article, getAuthorById } from "@/data/articles";
import { fmtDate } from "@/lib/fmt";
import VerifiedBadge from "./VerifiedBadge";
import ListenButton from "@/components/ai/ListenButton";

interface ArticleCardProps {
  article: Article;
  variant?: "featured" | "list" | "grid";
}


export default function ArticleCard({ article, variant = "list" }: ArticleCardProps) {
  if (variant === "featured") {
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className="group block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={article.heroImage}
            alt={article.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Category tag */}
          <span className="absolute left-3 top-3 rounded-md bg-[var(--accent-red)] px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            {article.category}
          </span>
        </div>
        <div className="p-4">
          {article.isVerified && <VerifiedBadge size="sm" />}
          <h2 className="mt-2 font-serif text-xl font-bold leading-tight text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors">
            {article.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[var(--muted)] line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">{getAuthorById(article.authorId)?.name}</span>
              <span>·</span>
              <span>{fmtDate(article.publishedAt)}</span>
            </div>
            {article.hasAudio && (
              <ListenButton
                text={article.body.join(" ")}
                durationMinutes={article.readingMinutes}
                variant="compact"
              />
            )}
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "grid") {
    return (
      <Link
        href={`/artikel/${article.slug}`}
        className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={article.thumbnailImage}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, 300px"
          />
          <span className="absolute left-2 top-2 rounded-md bg-[var(--accent-red)] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
            {article.category}
          </span>
        </div>
        <div className="p-3 flex-1 flex flex-col">
          <h3 className="font-serif text-sm font-bold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
            {article.title}
          </h3>
          <div className="mt-auto pt-2 flex items-center gap-1 text-[11px] text-[var(--muted)]">
            <span>{getAuthorById(article.authorId)?.name}</span>
            {article.hasAudio && (
              <>
                <span>·</span>
                <span className="text-blue-600 dark:text-blue-400">{article.readingMinutes} mnt</span>
              </>
            )}
          </div>
        </div>
      </Link>
    );
  }

  // variant === "list" (default)
  return (
    <Link
      href={`/artikel/${article.slug}`}
      className="group flex items-start gap-3 border-b border-[var(--border)] py-4 last:border-0"
    >
      {/* Thumbnail kanan */}
      <div className="flex-1 min-w-0">
        <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-red)]">
          {article.category}
        </span>
        <h3 className="mt-0.5 font-serif text-[15px] font-semibold leading-snug text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
          {article.title}
        </h3>
        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <span className="font-medium">{getAuthorById(article.authorId)?.name}</span>
          <span>·</span>
          {article.isVerified && (
            <>
              <span className="text-green-600 dark:text-green-400">✓ Terverifikasi</span>
              <span>·</span>
            </>
          )}
          {article.hasAudio && (
            <span className="text-blue-600 dark:text-blue-400">
              ▷ {article.readingMinutes} mnt
            </span>
          )}
        </div>
      </div>
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
        <Image
          src={article.thumbnailImage}
          alt=""
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="80px"
        />
      </div>
    </Link>
  );
}
