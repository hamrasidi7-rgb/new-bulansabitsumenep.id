import Link from 'next/link'
import Image from 'next/image'
import { NAV_CATEGORIES } from '@/data/categories'
import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import { fmtDate as formatDate } from '@/lib/fmt'
import { notFound } from 'next/navigation'

const CHANNEL_FOR_CATEGORY: Record<string, string[]> = {
  kesehatan:         ['berita-kesehatan'],
  'aksi-kemanusiaan':['aksi-kemanusiaan'],
  edukasi:           ['berita-kesehatan', 'dokter-menulis'],
  relawan:           ['aksi-kemanusiaan'],
  'tanggap-bencana': ['aksi-kemanusiaan'],
  gizi:              ['berita-kesehatan'],
}

const SUBCHANNEL_FOR_CATEGORY: Record<string, string> = {
  gizi:              'gizi',
  relawan:           'donor-darah',
  'tanggap-bencana': 'tanggap-bencana',
}

export async function generateStaticParams() {
  return NAV_CATEGORIES
    .filter((c) => c.slug !== 'terbaru')
    .map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = NAV_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) return {}
  return { title: cat.label }
}


export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const cat = NAV_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) notFound()

  const channels = CHANNEL_FOR_CATEGORY[slug] ?? []
  const subcat   = SUBCHANNEL_FOR_CATEGORY[slug]

  let articles: any[] = []

  if (channels.length > 0) {
    const query = supabase
      .from('articles')
      .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
      .in('channel', channels)
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(20)

    const { data } = await query
    if (data && data.length > 0) {
      articles = subcat
        ? data.filter((a: any) => a.subchannel?.includes(subcat))
        : data
    } else {
      const seed = SEED_ARTICLES.filter((a: any) => channels.includes(a.channel))
      articles = subcat
        ? seed.filter((a: any) => a.subchannel?.includes(subcat))
        : seed
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="mb-6 font-serif text-2xl font-bold text-[var(--foreground)]">
        {cat.label}
      </h1>

      {articles.length === 0 ? (
        <p className="py-12 text-center text-sm text-[var(--muted)]">
          Belum ada artikel di kategori ini.
        </p>
      ) : (
        <div className="divide-y divide-[var(--border)]">
          {articles.map((a: any) => (
            <Link
              key={a.id}
              href={a.channel === 'dokter-menulis' ? `/dokter-menulis/${a.slug}` : `/artikel/${a.slug}`}
              className="group flex items-start gap-3 py-4"
            >
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[15px] font-semibold leading-snug
                  text-[var(--foreground)] group-hover:text-[var(--accent-red)]
                  transition-colors line-clamp-3">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{a.excerpt}</p>
                )}
                <time className="mt-1 block text-xs text-[var(--muted)]" dateTime={a.published_at}>
                  {formatDate(a.published_at)}
                </time>
              </div>
              {a.cover_url && (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image src={a.cover_url} alt="" fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="80px" />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
