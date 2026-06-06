import { CHANNELS } from '@/lib/channels'
import CategoryPillNav from '@/components/layout/CategoryPillNav'

const CHANNEL_CATEGORIES = [
  { label: 'Terbaru', href: '/', slug: 'terbaru' },
  ...CHANNELS.map((ch) => ({ label: ch.label, href: ch.href, slug: ch.slug })),
]

export default function ChannelBar() {
  return <CategoryPillNav categories={CHANNEL_CATEGORIES} />
}
