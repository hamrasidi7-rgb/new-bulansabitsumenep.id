const WA_NUMBER = "6285234567890"; // ganti dengan nomor PMI Sumenep yang sebenarnya
const WA_MESSAGE = encodeURIComponent(
  "Halo PMI Sumenep, saya ingin bertanya tentang layanan kesehatan."
);

interface WhatsAppCardProps {
  message?: string;
  ctaText?: string;
}

export default function WhatsAppCard({
  message = "Butuh darah atau info cepat? Chat tim kami.",
  ctaText = "Chat via WhatsApp",
}: WhatsAppCardProps) {
  const href = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-800 dark:bg-green-950/30">
      <div className="flex items-start gap-3">
        <WhatsAppIcon />
        <div className="flex-1">
          <p className="text-sm font-semibold text-green-900 dark:text-green-200">{message}</p>
          <p className="mt-0.5 text-xs text-green-700 dark:text-green-400">
            PMI Sumenep siap membantu · Respons cepat
          </p>
        </div>
      </div>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat dengan PMI Sumenep via WhatsApp (buka di tab baru)"
        className="mt-3 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 active:scale-95"
      >
        <WhatsAppIcon small />
        {ctaText}
      </a>
    </div>
  );
}

function WhatsAppIcon({ small = false }: { small?: boolean }) {
  const size = small ? 18 : 36;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      aria-hidden="true"
    >
      {!small && <rect width="36" height="36" rx="10" fill="#16a34a" />}
      <path
        d="M18 6C11.37 6 6 11.37 6 18c0 2.13.57 4.13 1.56 5.85L6 30l6.3-1.53A11.94 11.94 0 0018 30c6.63 0 12-5.37 12-12S24.63 6 18 6z"
        stroke={small ? "#16a34a" : "white"}
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M14 13.5c.4 3.8 5 7.5 8.2 8.2.7-1.4 1.1-2.3 1-2.9-.1-.4-.7-.7-1.4-1.1-.7-.3-1.2-.1-1.6.3-.7.7-1.4.7-2.6-.1-1.2-.8-2.2-1.9-2.3-3.1-.1-1.2.3-1.8 1-2.3.4-.4.5-.9.3-1.6-.3-.7-.8-1.2-1.2-1.4C14.8 9 13 10.3 14 13.5z"
        fill={small ? "#16a34a" : "white"}
      />
    </svg>
  );
}
