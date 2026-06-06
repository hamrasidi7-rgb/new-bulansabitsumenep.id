import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import { articles as localArticles, getAuthorById } from '@/data/articles'
import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { fmtDate as fmt } from '@/lib/fmt'

export const metadata = {
  title: 'Berita Terbaru — Bulan Sabit Sumenep',
  description: 'Semua berita terbaru dari Bulan Sabit Sumenep: kesehatan, kemanusiaan, dan edukasi.',
}

const CATEGORY_TO_CHANNEL = {
  'Berita Kesehatan': 'berita-kesehatan',
  'Aksi Kemanusiaan': 'aksi-kemanusiaan',
  'Kemanusiaan':      'aksi-kemanusiaan',
  'Edukasi':          'berita-kesehatan',
  'Gizi':             'berita-kesehatan',
}

const CHANNEL_LABEL = {
  'berita-kesehatan': 'Berita Kesehatan',
  'aksi-kemanusiaan': 'Aksi Kemanusiaan',
  'dokter-menulis':   'Dokter Menulis',
}

function normalizeLocal() {
  return localArticles.map((a) => ({
    id:           a.slug,
    title:        a.title,
    slug:         a.slug,
    channel:      CATEGORY_TO_CHANNEL[a.category] ?? 'berita-kesehatan',
    subchannel:   null,
    excerpt:      a.excerpt,
    cover_url:    a.thumbnailImage,
    author_name:  getAuthorById(a.authorId)?.name ?? 'Redaksi BSS',
    published_at: a.publishedAt,
  }))
}

async function fetchAll(limit = 30) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data
  return [...normalizeLocal(), ...SEED_ARTICLES]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit)
}


function articleHref(a) {
  return a.channel === 'dokter-menulis'
    ? `/dokter-menulis/${a.slug}`
    : `/artikel/${a.slug}`
}

export default async function TerbaruPage() {
  const articles = await fetchAll(30)

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <SectionHeader prefix="Berita " highlight="TERBARU" className="mb-6" />

      <div className="divide-y divide-[var(--border)]">
        {articles.map((a) => (
          <Link
            key={a.id}
            href={articleHref(a)}
            className="group flex items-start gap-4 py-4"
          >
            {/* Thumbnail */}
            <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
              {a.cover_url && (
                <Image
                  src={a.cover_url}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="96px"
                />
              )}
            </div>

            {/* Teks */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: '#c0392b' }}
                >
                  {CHANNEL_LABEL[a.channel] ?? a.channel}
                </span>
                <span className="text-[10px] text-[var(--muted)]">·</span>
                <time className="text-[10px] text-[var(--muted)]" dateTime={a.published_at}>
                  {fmt(a.published_at)}
                </time>
              </div>
              <h2 className="font-serif text-[15px] font-semibold leading-snug
                text-[var(--foreground)] group-hover:text-[#c0392b]
                transition-colors line-clamp-3">
                {a.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
