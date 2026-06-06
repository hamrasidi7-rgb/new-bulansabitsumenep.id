'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import CategoryFilter from '@/components/article/CategoryFilter'

const FEED_CATEGORIES = ['Semua', 'Berita Kesehatan', 'Aksi Kemanusiaan', 'Dokter Menulis']

const RED = '#c0392b'

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis':   'Dokter Menulis',
}

function matchCategory(article, cat) {
  if (cat === 'Semua') return true
  if (cat === 'Berita Kesehatan') return article.channel === 'berita-kesehatan'
  if (cat === 'Aksi Kemanusiaan') return article.channel === 'aksi-kemanusiaan'
  if (cat === 'Dokter Menulis') return article.channel === 'dokter-menulis'
  return true
}

function articleHref(article) {
  return article.channel === 'dokter-menulis'
    ? `/dokter-menulis/${article.slug}`
    : `/artikel/${article.slug}`
}

function fmt(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function HomeFeed({ articles }) {
  const [active, setActive] = useState('Semua')

  const filtered = articles.filter((a) => matchCategory(a, active))

  return (
    <section aria-label="Artikel terbaru">
      {/* Header seksi */}
      <div
        className="mb-4 flex items-center justify-between border-t-[3px] pt-3"
        style={{ borderColor: RED }}
      >
        <h2 className="font-serif text-lg font-bold text-[var(--foreground)]">
          Artikel Terbaru
        </h2>
      </div>

      {/* Filter — satu instance, komponen bersama */}
      <div className="mb-5">
        <CategoryFilter
          categories={FEED_CATEGORIES}
          active={active}
          onChange={setActive}
        />
      </div>

      {/* Daftar artikel */}
      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-[var(--muted)]">
          Belum ada artikel di kategori ini.
        </p>
      ) : (
        <div className="divide-y divide-[var(--border)]">
          {filtered.map((article) => (
            <Link
              key={article.id}
              href={articleHref(article)}
              className="group flex items-start gap-3 py-4"
            >
              <div className="flex-1 min-w-0">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: RED }}
                >
                  {CHANNEL_LABEL[article.channel] ?? article.channel}
                </span>
                <h3 className="mt-0.5 font-serif text-[15px] font-semibold leading-snug
                  text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                  transition-colors line-clamp-3">
                  {article.title}
                </h3>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--muted)]">
                  {article.author_name && (
                    <>
                      <span className="font-medium">{article.author_name}</span>
                      <span>·</span>
                    </>
                  )}
                  <time dateTime={article.published_at}>{fmt(article.published_at)}</time>
                </div>
              </div>
              {article.cover_url && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src={article.cover_url}
                    alt=""
                    fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="80px"
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}
