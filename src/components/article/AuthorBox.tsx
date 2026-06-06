"use client";

import Image from "next/image";
import { useState } from "react";
import type { AuthorProfile } from "@/data/articles";

function getInitials(name: string): string {
  return name
    .replace(/^(dr\.|drg\.|prof\.|ibu|bpk\.?)\s*/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

export default function AuthorBox({ author }: { author: AuthorProfile }) {
  const [imgError, setImgError] = useState(false);

  // Render hanya jika bio tersedia
  if (!author.bio) return null;

  const showImage = !!author.avatar && !imgError;

  return (
    <aside
      className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
      aria-label={`Profil penulis: ${author.name}`}
    >
      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-[var(--muted)]">
        Tentang Penulis
      </p>
      <div className="flex gap-4">
        {/* Avatar — 56 px */}
        <div
          className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-red-50 dark:bg-red-950/30"
          aria-hidden="true"
        >
          {showImage ? (
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
              sizes="56px"
              onError={() => setImgError(true)}
            />
          ) : (
            <span className="select-none text-sm font-bold text-[var(--accent-red)]">
              {getInitials(author.name)}
            </span>
          )}
        </div>

        {/* Teks */}
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-[var(--foreground)]">
            {author.name}
          </p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">{author.role}</p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--foreground)]/80">
            {author.bio}
          </p>
        </div>
      </div>
    </aside>
  );
}
