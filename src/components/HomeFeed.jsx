import Image from 'next/image'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import BannerSlot from '@/components/ui/BannerSlot'

const RED = '#c0392b'

function articleHref(a) {
  return a.channel === 'dokter-menulis'
    ? `/dokter-menulis/${a.slug}`
    : `/artikel/${a.slug}`
}

function fmt(iso) {
  return new Date(iso).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ── Kartu featured: foto atas + panel teks putih di bawah (gaya palingHOT)
function FeaturedCard({ article }) {
  return (
    <Link
      href={articleHref(article)}
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
    >
      {/* Foto */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface)]">
        {article.cover_url && (
          <Image
            src={article.cover_url}
            alt={article.title}
            fill
            priority
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width:640px) 100vw, (max-width:1024px) 70vw, 800px"
          />
        )}
      </div>
      {/* Panel teks di bawah foto */}
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1.5">
          {article.subchannel && (
            <span className="text-[10px] font-bold uppercase tracking-wider"
              style={{ color: RED }}>
              {article.subchannel}
            </span>
          )}
          <time className="text-[10px] text-[var(--muted)]" dateTime={article.published_at}>
            {fmt(article.published_at)}
          </time>
        </div>
        <h3 className="font-serif text-[1.1rem] font-bold leading-snug
          text-[var(--foreground)] group-hover:text-[#c0392b]
          transition-colors line-clamp-3">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

// ── Kartu list: thumbnail kiri + teks kanan (gaya ngopiDAERAH)
function ListCard({ article }) {
  return (
    <Link
      href={articleHref(article)}
      className="group flex items-start gap-3 py-3
        border-b border-[var(--border)] last:border-0"
    >
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[var(--surface)]">
        {article.cover_url && (
          <Image
            src={article.cover_url}
            alt=""
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="64px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <time className="block text-[10px] text-[var(--muted)]" dateTime={article.published_at}>
          {fmt(article.published_at)}
        </time>
        {article.subchannel && (
          <span className="block text-[10px] font-bold uppercase tracking-wider"
            style={{ color: RED }}>
            {article.subchannel}
          </span>
        )}
        <h3 className="mt-0.5 font-serif text-[13px] font-semibold leading-snug
          text-[var(--foreground)] group-hover:text-[#c0392b]
          transition-colors line-clamp-3">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

// ── Kartu grid: foto atas + teks bawah (gaya palingFRESH)
function GridCard({ article }) {
  return (
    <Link
      href={articleHref(article)}
      className="group flex flex-col overflow-hidden rounded-xl
        border border-[var(--border)] bg-[var(--card)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--surface)]">
        {article.cover_url && (
          <Image
            src={article.cover_url}
            alt={article.title}
            fill
            className="object-cover transition duration-300 group-hover:scale-105"
            sizes="(max-width:640px) 50vw, 30vw"
          />
        )}
      </div>
      <div className="p-3 flex flex-col flex-1">
        <time className="text-[10px] text-[var(--muted)] mb-0.5" dateTime={article.published_at}>
          {fmt(article.published_at)}
        </time>
        {article.subchannel && (
          <span className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: RED }}>
            {article.subchannel}
          </span>
        )}
        <h3 className="mt-1 font-serif text-[13px] font-bold leading-snug
          text-[var(--foreground)] group-hover:text-[#c0392b]
          transition-colors line-clamp-4">
          {article.title}
        </h3>
      </div>
    </Link>
  )
}

export default function HomeFeed({ articles }) {
  const kesehatan   = articles.filter((a) => a.channel === 'berita-kesehatan')
  const kemanusiaan = articles.filter((a) => a.channel === 'aksi-kemanusiaan')
  const dokter      = articles.filter((a) => a.channel === 'dokter-menulis')

  return (
    <div className="space-y-12">

      {/* ── Berita Kesehatan: featured besar + grid 2 kolom ── */}
      {kesehatan.length > 0 && (
        <section aria-label="Berita Kesehatan">
          <SectionHeader prefix="Berita " highlight="KESEHATAN" href="/berita-kesehatan" />
          <FeaturedCard article={kesehatan[0]} />
          {kesehatan.length > 1 && (
            <div className="mt-3 grid grid-cols-2 gap-3">
              {kesehatan.slice(1, 5).map((a) => (
                <GridCard key={a.id} article={a} />
              ))}
            </div>
          )}
        </section>
      )}

      <BannerSlot size="strip" />

      {/* ── Aksi Kemanusiaan: grid 2 kolom ── */}
      {kemanusiaan.length > 0 && (
        <section aria-label="Aksi Kemanusiaan">
          <SectionHeader prefix="Aksi " highlight="KEMANUSIAAN" href="/aksi-kemanusiaan" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {kemanusiaan.slice(0, 4).map((a) => (
              <GridCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

      {/* ── Dokter Menulis: list thumbnail ── */}
      {dokter.length > 0 && (
        <section aria-label="Dokter Menulis">
          <SectionHeader prefix="Dokter " highlight="MENULIS" href="/dokter-menulis" />
          <div className="rounded-xl border border-[var(--border)]
            bg-[var(--card)] px-4 divide-y divide-[var(--border)]">
            {dokter.slice(0, 4).map((a) => (
              <ListCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
