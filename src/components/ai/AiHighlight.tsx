"use client";

interface AiHighlightProps {
  // TODO: sambungkan ke API — nanti props ini akan berisi data dari Claude API
  staticContent?: string;
  isLoading?: boolean;
}

export default function AiHighlight({
  staticContent,
  isLoading = false,
}: AiHighlightProps) {
  const defaultContent =
    "Musim hujan meningkatkan risiko DBD dan leptospirosis di wilayah pesisir dan kepulauan. Pastikan tidak ada genangan air di sekitar rumah, gunakan lotion anti-nyamuk saat sore hari, dan segera ke puskesmas bila demam lebih dari 2 hari. Warga Kangean dan Sapudi perlu ekstra waspada minggu ini.";

  return (
    <div
      className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950/40"
      role="region"
      aria-label="Sorotan AI hari ini"
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white font-bold">
          AI
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          Sorotan AI Hari Ini
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-blue-200 dark:bg-blue-800" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-blue-200 dark:bg-blue-800" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-blue-200 dark:bg-blue-800" />
        </div>
      ) : (
        <p className="text-sm leading-relaxed text-blue-900 dark:text-blue-200">
          {staticContent ?? defaultContent}
        </p>
      )}

      <p className="mt-2 text-xs text-blue-500 dark:text-blue-500">
        Dihasilkan oleh AI · Bukan pengganti saran medis profesional
      </p>
    </div>
  );
}
