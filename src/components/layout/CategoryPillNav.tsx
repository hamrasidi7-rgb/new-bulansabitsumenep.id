'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface PillCategory {
  label: string
  href: string
  slug?: string
}

interface CategoryPillNavProps {
  /** Array kategori yang ditampilkan sebagai pill */
  categories: PillCategory[]
  /**
   * Slug kategori yang sedang aktif.
   * Jika tidak diberikan, dihitung otomatis dari pathname.
   */
  activeCategory?: string
  className?: string
}

export default function CategoryPillNav({
  categories,
  activeCategory,
  className = '',
}: CategoryPillNavProps) {
  const pathname = usePathname()

  function isActive(cat: PillCategory): boolean {
    if (activeCategory !== undefined) {
      return activeCategory === (cat.slug ?? cat.href)
    }
    return pathname === cat.href || pathname.startsWith(cat.href + '/')
  }

  return (
    <nav
      aria-label="Navigasi kategori"
      className={`bg-[var(--card)] border-b border-[var(--border)] ${className}`}
    >
      <div className="flex gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => {
          const active = isActive(cat)
          return (
            <Link
              key={cat.href}
              href={cat.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'inline-flex shrink-0 cursor-pointer items-center',
                'min-h-[32px] whitespace-nowrap rounded',
                'px-3 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors',
                active
                  ? 'bg-[var(--accent-red)] text-white'
                  : 'bg-[#e2e2e2] text-gray-600 hover:bg-[#d0d0d0] hover:text-gray-900',
              ].join(' ')}
            >
              {cat.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
