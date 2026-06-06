import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES } from '@/lib/seedData'
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

async function fetchLatestArticles(limit = 20) {
  const { data } = await supabase
    .from('articles')
    .select('id,title,slug,channel,subchannel,excerpt,cover_url,author_name,published_at')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data
  return SEED_ARTICLES.slice(0, limit)
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
