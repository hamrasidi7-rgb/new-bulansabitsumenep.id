import Image from "next/image";
import { getSiteSettings } from "@/lib/sitePages";

const DEFAULT_NUMBER = "6285234567890";
const WA_MESSAGE = encodeURIComponent(
  "Halo PMI Sumenep, saya ingin cek stok darah dan informasi layanan kesehatan."
);

export default async function WhatsAppFab() {
  const settings = await getSiteSettings().catch(() => ({} as Record<string, string>));
  const rawNumber = settings.whatsapp || DEFAULT_NUMBER;
  const number = rawNumber.replace(/\D/g, "");
  const href = `https://wa.me/${number}?text=${WA_MESSAGE}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat Stok Darah Sekarang — PMI Sumenep via WhatsApp"
      className="
        fixed bottom-[4.75rem] right-3 z-40
        sm:bottom-6 sm:right-5
        transition-transform duration-200
        hover:scale-105 active:scale-95
        drop-shadow-2xl
      "
    >
      <Image
        src="/chat-darah.png"
        alt="Chat Stok Darah Sekarang — PMI Sumenep"
        width={280}
        height={93}
        className="w-[185px] sm:w-[260px] h-auto"
        priority={false}
      />
    </a>
  );
}
