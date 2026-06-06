interface VerifiedBadgeProps {
  size?: "sm" | "md";
}

export default function VerifiedBadge({ size = "md" }: VerifiedBadgeProps) {
  const sizeClass = size === "sm" ? "text-[10px] px-2 py-0.5 gap-1" : "text-xs px-2.5 py-1 gap-1.5";

  return (
    <span
      className={`inline-flex items-center rounded-full bg-green-100 text-green-800 font-medium dark:bg-green-900/40 dark:text-green-300 ${sizeClass}`}
      title="Konten ini telah diverifikasi oleh tim medis"
    >
      <CheckIcon size={size === "sm" ? 10 : 12} />
      Diverifikasi tim medis
    </span>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 6l3 3 5-5" />
    </svg>
  );
}
