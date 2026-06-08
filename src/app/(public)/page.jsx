import { supabase } from '@/lib/supabaseClient'
import { SEED_ARTICLES, SEED_VIDEOS, SEED_GALLERIES } from '@/lib/seedData'
import { articles as localArticles, getAuthorById } from '@/data/articles'
import VideoStory from '@/components/VideoStory'
import GallerySection from '@/components/GallerySection'
import HomeFeed from '@/components/HomeFeed'
import HeroSection from '@/components/HeroSection'

// Cache homepage 5 menit — Supabase tidak dipanggil setiap request
export const revalidate = 300

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

async function fetchVideos(limit = 4) {
  const { data } = await supabase
    .from('videos')
    .select('id,title,platform,video_id,thumbnail_url,description,sort_order,video_url')
    .eq('is_published', true)
    .order('sort_order')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) return data
  return SEED_VIDEOS.slice(0, limit)
}

async function fetchGalleries(limit = 4) {
  const { data } = await supabase
    .from('galleries')
    .select('id,title,slug,cover_url,event_date,category')
    .eq('is_published', true)
    .order('sort_order')
    .order('created_at', { ascending: false })
    .limit(limit)
  if (data && data.length > 0) {
    const ids = data.map((a) => a.id)
    const { data: photos } = await supabase
      .from('gallery_photos').select('gallery_id').in('gallery_id', ids)
    const counts = photos?.reduce((acc, row) => {
      acc[row.gallery_id] = (acc[row.gallery_id] ?? 0) + 1
      return acc
    }, {}) ?? {}
    return { albums: data, counts }
  }
  const seedSlice = SEED_GALLERIES.slice(0, limit)
  const counts = seedSlice.reduce((acc, g) => {
    acc[g.id] = g.photos?.length ?? 0
    return acc
  }, {})
  return { albums: seedSlice, counts }
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
  // Semua fetch paralel di server — tidak ada waterfall client-side
  const [articles, videos, { albums, counts }] = await Promise.all([
    fetchLatestArticles(20),
    fetchVideos(4),
    fetchGalleries(4),
  ])

  return (
    <div className="w-full">

      {/* Hero: Tanya AI + Kartu Peta Statis */}
      <HeroSection />

      {/* Konten portal di bawah hero */}
      <div className="mx-auto w-full max-w-6xl px-4 pt-5 pb-8 space-y-12">
        <HomeFeed articles={articles} />

        <section>
          <VideoStory limit={4} initialVideos={videos} />
        </section>

        <section>
          <GallerySection limit={4} initialAlbums={albums} initialCounts={counts} />
        </section>
      </div>

    </div>
  )
}
