import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
import { articles as localArticles, getAuthorById } from '@/data/articles'
import HeroSection from '@/components/HeroSection'
import VideoStory from '@/components/VideoStory'
import GallerySection from '@/components/GallerySection'
import AiHighlight from '@/components/ai/AiHighlight'
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

// Normalisasi articles.ts ke format SEED_ARTICLES agar bisa ditampilkan di HomeFeed
function normalizeLocalArticles() {
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

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 space-y-12">

      {/* Hero carousel + sidebar + berita terbaru */}
      <HeroSection />

      {/* Sorotan AI (statis, sambungkan ke API nanti) */}
      <AiHighlight />

      {/* Artikel terbaru dengan filter kategori */}
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
