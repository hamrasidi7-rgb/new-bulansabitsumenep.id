import { supabase } from '@/lib/supabaseClient'
import { notFound } from 'next/navigation'
import GalleryDetail from '@/components/GalleryDetail'

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await supabase
    .from('galleries')
    .select('title,description,cover_url')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (!data) return {}
  return {
    title: data.title,
    description: data.description ?? `Album foto ${data.title} — Bulan Sabit Sumenep`,
    openGraph: {
      images: data.cover_url ? [{ url: data.cover_url }] : [],
    },
  }
}

export default async function GalleryDetailPage({ params }) {
  const { slug } = await params

  // Ambil album + foto sekaligus
  const { data: gallery } = await supabase
    .from('galleries')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!gallery) notFound()

  const { data: photos } = await supabase
    .from('gallery_photos')
    .select('id,image_url,caption,sort_order')
    .eq('gallery_id', gallery.id)
    .order('sort_order')

  return (
    <GalleryDetail gallery={gallery} photos={photos ?? []} />
  )
}
