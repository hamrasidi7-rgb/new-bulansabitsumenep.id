'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CHANNELS } from '@/lib/channels'

export default function ChannelBar() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Kanal portal"
      className="border-b border-[var(--border)] bg-[var(--background)]"
    >
      <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-2">
        {CHANNELS.map((ch) => {
          const isActive = pathname === ch.href || pathname.startsWith(ch.href + '/')
          return (
            <Link
              key={ch.slug}
              href={ch.href}
              aria-current={isActive ? 'page' : undefined}
              className={[
                'shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
                'inline-flex items-center min-h-[40px] whitespace-nowrap',
                isActive
                  ? 'bg-[var(--accent-red)] text-white'
                  : 'text-[var(--muted)] hover:bg-gray-100 dark:hover:bg-white/10',
              ].join(' ')}
            >
              {ch.label}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
