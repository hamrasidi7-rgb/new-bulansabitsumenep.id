import Link from "next/link";
import type { Contributor } from "@/data/contributors";

interface ContributorCardProps {
  contributor: Contributor;
}

const MAX_VISIBLE_TOPICS = 2;

export default function ContributorCard({ contributor }: ContributorCardProps) {
  const extraTopics = contributor.topics.length - MAX_VISIBLE_TOPICS;
  const visibleTopics = contributor.topics.slice(0, MAX_VISIBLE_TOPICS);

  return (
    <Link
      href={`/kontributor/${contributor.id}`}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 transition hover:border-red-200 hover:shadow-sm dark:hover:border-red-900"
      aria-label={`Lihat profil ${contributor.name}`}
    >
      {/* Baris atas: avatar + nama + chevron */}
      <div className="flex items-start gap-3">
        {/* Avatar inisial */}
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white ${contributor.avatarColor}`}
          aria-hidden="true"
        >
          {contributor.initials}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors text-sm leading-snug">
            {contributor.name}
          </p>
          <p className="text-xs text-[var(--accent-red)] font-medium mt-0.5">
            {contributor.specialty}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-[var(--muted)]">
            {contributor.institution}
          </p>
        </div>

        <ChevronIcon />
      </div>

      {/* Topics / tag */}
      <div className="flex flex-wrap gap-1.5">
        {visibleTopics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-[var(--background)] border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]"
          >
            {topic}
          </span>
        ))}
        {extraTopics > 0 && (
          <span className="rounded-full bg-[var(--background)] border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--muted)]">
            +{extraTopics}
          </span>
        )}
      </div>

      {/* Footer: artikel count + verified */}
      <div className="flex items-center gap-3 border-t border-[var(--border)] pt-2.5 text-xs text-[var(--muted)]">
        <span className="flex items-center gap-1">
          <ArticleIcon />
          {contributor.articleCount} artikel
        </span>
        {contributor.isVerified && (
          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
            <CheckIcon />
            Terverifikasi
          </span>
        )}
      </div>
    </Link>
  );
}

function ChevronIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="shrink-0 text-[var(--muted)] mt-0.5" aria-hidden="true">
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="2" />
      <path d="M3 4h6M3 6h6M3 8h4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}
