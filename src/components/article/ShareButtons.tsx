"use client";

import { useState, useEffect } from "react";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  // Gunakan URL fallback saat SSR; diperbarui ke window.location.href setelah hydration
  const [shareUrl, setShareUrl] = useState(
    `https://bulansabitsumenep.id/artikel/${slug}`
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const enc = encodeURIComponent;
  const eUrl = enc(shareUrl);
  const eTitle = enc(title);

  const platforms = [
    {
      key: "wa",
      label: "Bagikan via WhatsApp",
      href: `https://wa.me/?text=${enc(title + "\n" + shareUrl)}`,
      hoverClass: "hover:border-green-500 hover:text-green-500",
      icon: <WAIcon />,
    },
    {
      key: "fb",
      label: "Bagikan via Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`,
      hoverClass: "hover:border-blue-500 hover:text-blue-500",
      icon: <FBIcon />,
    },
    {
      key: "x",
      label: "Bagikan via X (Twitter)",
      href: `https://twitter.com/intent/tweet?text=${eTitle}&url=${eUrl}`,
      hoverClass: "hover:border-slate-600 hover:text-slate-800 dark:hover:border-slate-300 dark:hover:text-slate-100",
      icon: <XIcon />,
    },
    {
      key: "tg",
      label: "Bagikan via Telegram",
      href: `https://t.me/share/url?url=${eUrl}&text=${eTitle}`,
      hoverClass: "hover:border-sky-500 hover:text-sky-500",
      icon: <TGIcon />,
    },
  ];

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: tidak ada aksi
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Bagikan artikel ini">
      <span className="shrink-0 text-xs text-[var(--muted)]">Bagikan:</span>

      {/* Tombol platform */}
      {platforms.map(({ key, label, href, hoverClass, icon }) => (
        <a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-colors ${hoverClass}`}
        >
          {icon}
        </a>
      ))}

      {/* Salin tautan */}
      <button
        onClick={handleCopy}
        aria-label={copied ? "Tautan berhasil disalin" : "Salin tautan artikel"}
        className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          copied
            ? "border-green-500 text-green-500"
            : "border-[var(--border)] text-[var(--muted)] hover:border-slate-400 hover:text-[var(--foreground)]"
        }`}
      >
        {copied ? <CheckIcon /> : <LinkIcon />}
      </button>

      {/* Feedback salin */}
      {copied && (
        <span
          className="text-xs font-medium text-green-600 dark:text-green-400"
          aria-live="polite"
          role="status"
        >
          Tersalin!
        </span>
      )}
    </div>
  );
}

// ── Ikon (SVG inline) ──────────────────────────────────────────────────────

function WAIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
      <path d="M8.5 1.5A7 7 0 0 1 15.5 8.5c0 3.87-3.13 7-7 7a6.97 6.97 0 0 1-3.62-1.01L1.5 15.5l1.04-3.33A6.97 6.97 0 0 1 1.5 8.5a7 7 0 0 1 7-7z" />
      <path d="M6.2 7.4c.24 2.18 2.88 4.28 4.66 4.66.4-.78.62-1.33.55-1.63-.06-.24-.38-.44-.77-.63-.38-.18-.7-.08-.93.16-.4.4-.78.4-1.48-.08-.7-.47-1.24-1.08-1.32-1.79-.07-.7.16-1.02.54-1.32.23-.18.3-.55.16-.93-.18-.39-.47-.7-.7-.87-.78-.47-1.94.4-1.16 3.43z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FBIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M9 3.5h1.5V1.5H9C7.34 1.5 6 2.84 6 4.5V6H4.5v2H6v7h2V8h1.5l.5-2H8V4.5c0-.55.45-1 1-1z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" aria-hidden="true">
      <path d="M11.9 1h2.3L9.1 6.6 15 14h-4.3l-3.5-4.6L3 14H.7l5.5-6L0 1h4.4l3.2 4.2L11.9 1zM11 12.7h1.3L4 2.3H2.6L11 12.7z" />
    </svg>
  );
}

function TGIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M1.2 7.6 14 2.3c.6-.2 1.1.1.9.8l-2.1 10c-.2.7-.6.9-1.1.6L8.5 11l-1.7 1.6c-.2.2-.4.3-.7.3l.3-3.3 5.7-5.1c.3-.2 0-.4-.3-.2L3.7 9.4 1 8.6c-.6-.2-.6-.6.2-.9z" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <path d="M6.5 9.5a3.5 3.5 0 0 0 5 0l2-2a3.5 3.5 0 0 0-5-5L7 4" />
      <path d="M9.5 6.5a3.5 3.5 0 0 0-5 0l-2 2a3.5 3.5 0 0 0 5 5L9 12" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 8l4 4 6-6" />
    </svg>
  );
}
