import { supabase } from '@/lib/supabaseClient'
import { getSeedArticles } from '@/lib/seedData'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getSubchannelInfo } from '@/lib/channels'
import { fmtDate as formatDate } from '@/lib/fmt'

export async function generateMetadata({ params }) {
  const { subkanal } = await params
  const info = getSubchannelInfo('berita-kesehatan', subkanal)
  if (!info) return {}
  return {
    title: info.subchannel.label,
    description: `Artikel ${info.subchannel.label} dari portal Bulan Sabit Sumenep.`,
  }
}

async function fetchArticles(subkanal) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,cover_url,author_name,published_at')
    .eq('channel', 'berita-kesehatan')
    .eq('subchannel', subkanal)
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  if (data && data.length > 0) return data
  return getSeedArticles('berita-kesehatan', subkanal)
}


export default async function SubkanalBeritaPage({ params }) {
  const { subkanal } = await params
  const info = getSubchannelInfo('berita-kesehatan', subkanal)
  if (!info) notFound()

  const articles = await fetchArticles(subkanal)

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-[var(--muted)]">
        <Link href="/berita-kesehatan" className="hover:text-[var(--accent-red)]">Berita Kesehatan</Link>
        <span aria-hidden="true">›</span>
        <span className="text-[var(--foreground)]">{info.subchannel.label}</span>
      </nav>

      <h1 className="mb-6 font-serif text-2xl font-bold text-[var(--foreground)]">
        {info.subchannel.label}
      </h1>

      {articles.length === 0 ? (
        <p className="rounded-xl border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          Belum ada artikel di sub-kanal ini.
        </p>
      ) : (
        <div className="space-y-0">
          {articles.map((a) => (
            <Link key={a.id} href={`/artikel/${a.slug}`}
              className="group flex items-start gap-4 border-b border-[var(--border)] py-4 last:border-0">
              {a.cover_url && (
                <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg">
                  <Image src={a.cover_url} alt="" fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="112px" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h2 className="font-serif text-[15px] font-semibold leading-snug
                  text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-1 text-sm text-[var(--muted)] line-clamp-2">{a.excerpt}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs text-[var(--muted)]">
                  {a.author_name && <span>{a.author_name}</span>}
                  {a.author_name && <span>·</span>}
                  <time dateTime={a.published_at}>{formatDate(a.published_at)}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
