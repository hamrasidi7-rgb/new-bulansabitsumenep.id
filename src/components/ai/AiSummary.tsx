"use client";

interface AiSummaryProps {
  // TODO: sambungkan ke Claude API — nanti summary dihasilkan dari body artikel
  summary?: string;
  keyPoints?: string[];
  isLoading?: boolean;
}

const DEFAULT_SUMMARY =
  "Dinas Kesehatan Sumenep mengeluarkan status waspada DBD untuk dua kecamatan akibat lonjakan kasus memasuki musim hujan. Masyarakat diimbau melaksanakan 3M Plus dan segera ke puskesmas jika demam lebih dari 2 hari.";

const DEFAULT_KEY_POINTS = [
  "14 kasus DBD baru ditemukan di Kalianget dan Saronggi",
  "Genangan air setelah hujan deras menjadi sumber perindukan nyamuk",
  "PMI dan kader Jumantik aktif di 47 desa zona kuning",
  "Pemeriksaan darah gratis tersedia setiap Sabtu pagi di Pasar Anom Baru",
];

export default function AiSummary({
  summary,
  keyPoints,
  isLoading = false,
}: AiSummaryProps) {
  const displaySummary = summary ?? DEFAULT_SUMMARY;
  const displayPoints = keyPoints ?? DEFAULT_KEY_POINTS;

  return (
    <div
      className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-4 dark:border-blue-800 dark:from-blue-950/30 dark:to-indigo-950/30"
      role="region"
      aria-label="Ringkasan AI"
    >
      <div className="mb-3 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white font-bold">
          AI
        </span>
        <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
          Ringkasan AI
        </span>
      </div>

      {isLoading ? (
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-3 animate-pulse rounded bg-blue-200 dark:bg-blue-800"
              style={{ width: `${85 - i * 10}%` }}
            />
          ))}
        </div>
      ) : (
        <>
          <p className="mb-3 text-sm leading-relaxed text-blue-900 dark:text-blue-200">
            {displaySummary}
          </p>

          <ul className="space-y-1.5" aria-label="Poin utama artikel">
            {displayPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
                  {i + 1}
                </span>
                {point}
              </li>
            ))}
          </ul>
        </>
      )}

      <p className="mt-3 text-xs text-blue-400">
        Dihasilkan oleh AI · Verifikasi dengan membaca artikel lengkap
      </p>
    </div>
  );
}
