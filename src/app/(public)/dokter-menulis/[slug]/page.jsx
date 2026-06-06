import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await supabase
    .from('articles')
    .select('title,excerpt,cover_url,author_name,published_at')
    .eq('slug', slug)
    .eq('channel', 'dokter-menulis')
    .eq('is_published', true)
    .single()
  if (!data) return {}
  return {
    title: data.title,
    description: data.excerpt ?? undefined,
    openGraph: {
      title: data.title,
      type: 'article',
      authors: data.author_name ? [data.author_name] : undefined,
      images: data.cover_url ? [{ url: data.cover_url }] : [],
    },
  }
}

export default async function DokterMenulisDetailPage({ params }) {
  const { slug } = await params
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('channel', 'dokter-menulis')
    .eq('is_published', true)
    .single()

  if (!article) notFound()

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString('id-ID', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
    })

  return (
    <div className="mx-auto w-full max-w-2xl pb-20 pt-0">
      {article.cover_url && (
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:rounded-b-2xl">
          <Image src={article.cover_url} alt={article.title} fill
            className="object-cover" sizes="(max-width:640px) 100vw, 640px" priority />
        </div>
      )}

      <div className="px-4 pt-4">
        <nav aria-label="Breadcrumb" className="mb-3 flex items-center gap-1.5 text-xs text-[var(--muted)]">
          <Link href="/dokter-menulis" className="hover:text-[var(--accent-red)]">Dokter Menulis</Link>
          <span aria-hidden="true">›</span>
          <span className="truncate text-[var(--foreground)]">{article.title}</span>
        </nav>

        <h1 className="font-serif text-2xl font-bold leading-tight text-[var(--foreground)] sm:text-3xl">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted)]">
          {article.author_name && (
            <span className="font-medium text-[var(--foreground)]">{article.author_name}</span>
          )}
          {article.author_name && <span>·</span>}
          <time dateTime={article.published_at}>{formatDate(article.published_at)}</time>
        </div>

        <article
          className="article-body prose prose-sm mt-6 max-w-none
            prose-headings:font-serif prose-headings:text-[var(--foreground)]
            prose-p:text-[var(--foreground)] prose-a:text-[var(--accent-red)]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <span key={tag}
                className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--muted)]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <Link href="/dokter-menulis"
            className="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl
              border border-[var(--border)] px-5 py-2.5 text-sm font-medium
              text-[var(--muted)] transition hover:text-[var(--foreground)]">
            ← Kembali ke Dokter Menulis
          </Link>
        </div>
      </div>
    </div>
  )
}
