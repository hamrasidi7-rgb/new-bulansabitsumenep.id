import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Dokter Menulis',
  description: 'Artikel kesehatan yang ditulis langsung oleh dokter dan tenaga medis Sumenep.',
}

async function fetchArticles() {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,excerpt,cover_url,author_name,published_at,tags')
    .eq('channel', 'dokter-menulis')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
  return data ?? []
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function DokterMenulisPage() {
  const articles = await fetchArticles()

  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <div className="mb-6">
        <h1 className="font-serif text-2xl font-bold text-[var(--foreground)]">Dokter Menulis</h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Opini, edukasi, dan pengalaman klinis langsung dari para dokter dan tenaga medis.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="rounded-xl border border-[var(--border)] p-8 text-center text-sm text-[var(--muted)]">
          Belum ada artikel diterbitkan.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {articles.map((a) => (
            <Link key={a.id} href={`/dokter-menulis/${a.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]">
              {a.cover_url && (
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={a.cover_url} alt="" fill
                    className="object-cover transition duration-300 group-hover:scale-105"
                    sizes="(max-width:640px) 100vw, 360px" />
                </div>
              )}
              <div className="flex flex-1 flex-col p-4">
                <h2 className="font-serif text-[15px] font-semibold leading-snug
                  text-[var(--foreground)] group-hover:text-[var(--accent-red)] transition-colors line-clamp-3">
                  {a.title}
                </h2>
                {a.excerpt && (
                  <p className="mt-1.5 text-sm text-[var(--muted)] line-clamp-2">{a.excerpt}</p>
                )}
                <div className="mt-auto flex items-center gap-2 pt-3 text-xs text-[var(--muted)]">
                  {a.author_name && (
                    <><span className="font-medium text-[var(--foreground)]">{a.author_name}</span><span>·</span></>
                  )}
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
