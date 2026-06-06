import Link from 'next/link'

/**
 * Header seksi dua warna seperti referensi ngopibareng.id
 * "prefix[HIGHLIGHT] ─────────── Lihat Semua →"
 */
export default function SectionHeader({ prefix = '', highlight, href, className = '' }) {
  return (
    <div className={`flex items-center gap-3 mb-5 ${className}`}>
      <h2 className="shrink-0 text-lg font-bold leading-none">
        <span className="text-[var(--foreground)]">{prefix}</span>
        <span className="text-[#c0392b]">{highlight}</span>
      </h2>
      <div className="flex-1 h-[2px] bg-[#c0392b] opacity-40" />
      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs font-semibold text-[#c0392b] hover:underline whitespace-nowrap"
        >
          Lihat Semua
        </Link>
      )}
    </div>
  )
}
