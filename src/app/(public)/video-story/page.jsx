import VideoStory from '@/components/VideoStory'

export const metadata = {
  title: 'Video Story — Cerita Pendonor',
  description: 'Kumpulan video cerita pendonor darah dan relawan PMI Sumenep dari berbagai platform.',
}

export default function VideoStoryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <VideoStory showAll />
    </div>
  )
}
