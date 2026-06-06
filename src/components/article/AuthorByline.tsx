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

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

interface Props {
  author: AuthorProfile;
  date: string;   // ISO string
  readTime: number;
}

export default function AuthorByline({ author, date, readTime }: Props) {
  const [imgError, setImgError] = useState(false);
  const showImage = !!author.avatar && !imgError;

  return (
    <div className="flex items-center gap-3">
      {/* Avatar bulat */}
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[var(--border)] bg-red-50 dark:bg-red-950/30"
        aria-hidden="true"
      >
        {showImage ? (
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover"
            sizes="44px"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="select-none text-xs font-bold text-[var(--accent-red)]">
            {getInitials(author.name)}
          </span>
        )}
      </div>

      {/* Nama + jabatan + meta */}
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold leading-tight text-[var(--foreground)]">
          {author.name}
        </p>
        <p className="mt-0.5 text-xs leading-tight text-[var(--muted)]">
          {author.role}
          <span className="mx-1.5 select-none opacity-40">•</span>
          <time dateTime={date}>{formatDate(date)}</time>
          <span className="mx-1.5 select-none opacity-40">•</span>
          {readTime} mnt baca
        </p>
      </div>
    </div>
  );
}
