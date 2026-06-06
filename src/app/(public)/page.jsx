import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import { articles as localArticles, getAuthorById } from '@/data/articles'
import HeroSection from '@/components/HeroSection'
import VideoStory from '@/components/VideoStory'
import GallerySection from '@/components/GallerySection'
import WhatsAppCard from '@/components/ui/WhatsAppCard'
import HomeFeed from '@/components/HomeFeed'

export const metadata = {
  title: 'Bulan Sabit Sumenep — Portal Kesehatan & Kemanusiaan',
  description:
    'Portal resmi Bulan Sabit Sumenep: berita kesehatan, aksi kemanusiaan, dokter menulis, galeri, dan video story dari PMI Sumenep.',
}

const CATEGORY_TO_CHANNEL = {
  'Berita Kesehatan': 'berita-kesehatan',
  'Aksi Kemanusiaan': 'aksi-kemanusiaan',
  'Kemanusiaan':      'aksi-kemanusiaan',
  'Edukasi':          'berita-kesehatan',
  'Gizi':             'berita-kesehatan',
}

// Normalisasi articles.ts ke format SEED_ARTICLES
function normalizeLocalArticles() {
  return localArticles.map((a) => ({
    id:           a.slug,
    title:        a.title,
    slug:         a.slug,
    channel:      CATEGORY_TO_CHANNEL[a.category] ?? 'berita-kesehatan',
    subchannel:   null,
    excerpt:      a.excerpt,
    cover_url:    a.heroImage,       // gambar besar untuk slide hero
    thumb_url:    a.thumbnailImage,  // thumbnail untuk grid kecil
    author_name:  getAuthorById(a.authorId)?.name ?? 'Redaksi BSS',
    published_at: a.publishedAt,
    is_verified:  a.isVerified,
  }))
}

async function fetchLatestArticles(limit = 24) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data
  // Gabungkan articles.ts + SEED_ARTICLES, urutkan terbaru dulu
  const combined = [...normalizeLocalArticles(), ...SEED_ARTICLES]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, limit)
  return combined
}

export default async function HomePage() {
  const articles = await fetchLatestArticles(20)

  // Pisah untuk HeroSection — server fetch, tidak perlu client fetch ulang
  const heroSlides = articles.slice(0, 3)
  const heroGrid   = articles.slice(3, 7)

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 space-y-12">

      {/* Hero carousel + grid + berita terbaru (data dari server) */}
      <HeroSection slides={heroSlides} grid={heroGrid} />

      {/* Artikel per kanal: Berita Kesehatan, Aksi Kemanusiaan, Dokter Menulis */}
      <HomeFeed articles={articles} />

      {/* Video Story */}
      <section>
        <VideoStory limit={4} />
      </section>

      {/* Galeri Foto */}
      <section>
        <GallerySection limit={4} />
      </section>

      {/* WhatsApp CTA */}
      <div className="mx-auto max-w-2xl">
        {/* TODO: ganti WA_NUMBER di src/components/ui/WhatsAppCard.tsx */}
        <WhatsAppCard />
      </div>

    </div>
  )
}
