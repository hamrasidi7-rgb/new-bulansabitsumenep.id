'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_CATEGORIES } from '@/data/categories'

export default function CategoryNav() {
  const pathname = usePathname()

  function isActive(cat: typeof NAV_CATEGORIES[number]) {
    if (cat.slug === 'terbaru') return pathname === '/'
    return pathname.startsWith(cat.href)
  }

  return (
    <nav
      aria-label="Navigasi kategori"
      className="border-b border-[var(--border)] bg-[var(--background)]"
    >
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2">
        {NAV_CATEGORIES.map((cat) => {
          const active = isActive(cat)
          return (
            <Link
              key={cat.slug}
              href={cat.href}
              aria-current={active ? 'page' : undefined}
              className={[
                'shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
                'min-h-[40px] inline-flex items-center',
                active
                  ? 'bg-[var(--accent-red)] text-white'
                  : 'text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-white/10',
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
