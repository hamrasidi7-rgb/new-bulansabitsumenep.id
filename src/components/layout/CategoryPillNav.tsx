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
      className={`bg-[var(--accent-red)] ${className}`}
    >
      <div className="flex gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((cat) => {
          const active = isActive(cat)
          return (
            <Link
              key={cat.href}
              href={cat.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'inline-flex shrink-0 cursor-pointer items-center',
                'min-h-[36px] whitespace-nowrap rounded-full',
                'px-4 py-1.5 text-[14px] font-medium transition-colors',
                active
                  ? 'bg-white text-[var(--accent-red)]'
                  : 'text-white/90 hover:bg-white/15 hover:text-white',
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
