"use client";

import ListenButton from "./ListenButton";

interface AiToolbarProps {
  articleText: string;
  durationMinutes: number;
  articleSlug: string;
  // TODO: sambungkan ke Claude API untuk fitur Ringkas, Bahasa Madura, Kedalaman
}

type ToolAction = "ringkas" | "madura" | "kedalaman";

export default function AiToolbar({
  articleText,
  durationMinutes,
  articleSlug,
}: AiToolbarProps) {
  function handleAction(action: ToolAction) {
    // TODO: panggil Claude API berdasarkan action
    switch (action) {
      case "ringkas":
        console.log("[AI] Ringkas artikel:", articleSlug);
        break;
      case "madura":
        console.log("[AI] Terjemahkan ke Bhâsa Madhurâ:", articleSlug);
        break;
      case "kedalaman":
        console.log("[AI] Mode kedalaman:", articleSlug);
        break;
    }
    alert(`Fitur "${action}" akan segera tersedia — sedang dihubungkan ke AI.`);
  }

  return (
    <div
      className="flex flex-wrap items-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--card)] p-3"
      role="toolbar"
      aria-label="Alat AI untuk artikel ini"
    >
      {/* Tombol utama: Dengarkan */}
      <ListenButton
        text={articleText}
        durationMinutes={durationMinutes}
        variant="full"
      />

      {/* Tombol sekunder */}
      <button
        onClick={() => handleAction("ringkas")}
        aria-label="Ringkas artikel dengan AI"
        className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/40"
      >
        <DocumentIcon />
        Ringkas
      </button>

      <button
        onClick={() => handleAction("madura")}
        aria-label="Terjemahkan ke Bahasa Madura"
        className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/40"
      >
        <GlobeIcon />
        Bhâsa Madhurâ
      </button>

      <button
        onClick={() => handleAction("kedalaman")}
        aria-label="Baca dengan mode kedalaman"
        className="flex min-h-[44px] items-center gap-1.5 rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950/40"
      >
        <MagnifierIcon />
        Kedalaman
      </button>
    </div>
  );
}

function DocumentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M4 1h6l4 4v10H2V1h2zm5 0v4h4M4 8h8M4 11h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r="6"/>
      <path d="M8 2C6 4 5 6 5 8s1 4 3 6M8 2c2 2 3 4 3 6s-1 4-3 6M2 8h12"/>
    </svg>
  );
}

function MagnifierIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="4.5"/>
      <path d="M10 10l3.5 3.5"/>
    </svg>
  );
}
