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
      aria-label="Chat Stok Darah — PMI Sumenep via WhatsApp"
      className="
        fixed bottom-[4.75rem] right-3 z-40
        sm:bottom-6 sm:right-5
        flex items-center gap-3
        bg-white rounded-2xl px-4 py-3
        shadow-[0_8px_28px_rgba(0,0,0,0.14)]
        ring-1 ring-black/[0.06]
        transition-all duration-200
        hover:shadow-[0_12px_36px_rgba(0,0,0,0.2)]
        hover:-translate-y-0.5
        active:scale-95 active:shadow-md
      "
    >
      {/* Ikon WhatsApp */}
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-sm">
        <WhatsAppIcon />
      </span>

      {/* Teks */}
      <span className="pr-1">
        <span className="block text-[10.5px] font-medium leading-none text-gray-400 mb-1">
          Butuh Stok Darah?
        </span>
        <span className="block text-[13.5px] font-bold leading-none text-gray-800">
          Chat PMI Sumenep
        </span>
      </span>

      {/* Panah */}
      <span className="ml-auto pl-1 text-gray-300" aria-hidden="true">
        <ChevronIcon />
      </span>
    </a>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5A8.5 8.5 0 001.5 10c0 1.5.4 2.9 1.1 4.1L1.5 18.5l4.5-1.1A8.5 8.5 0 1010 1.5zm0 15.4a6.9 6.9 0 01-3.5-.95l-.25-.15-2.67.65.68-2.6-.17-.27A6.9 6.9 0 1110 16.9zm3.77-5.15c-.2-.1-1.2-.59-1.38-.66-.18-.07-.32-.1-.45.1-.14.2-.52.66-.64.79-.11.14-.23.15-.43.05a5.5 5.5 0 01-1.62-1 6.07 6.07 0 01-1.12-1.39c-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.45-1.09-.62-1.5-.16-.39-.33-.34-.45-.34h-.38c-.14 0-.35.05-.53.25-.18.2-.7.68-.7 1.67s.72 1.93.82 2.07c.1.13 1.42 2.17 3.44 3.04.48.21.86.33 1.15.42.48.15.93.13 1.27.08.39-.06 1.2-.49 1.37-.97.17-.47.17-.88.12-.97-.05-.09-.19-.14-.4-.24z"/>
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3l4 4-4 4"/>
    </svg>
  );
}
