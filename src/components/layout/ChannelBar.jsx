import { CHANNELS } from '@/lib/channels'
import CategoryPillNav from '@/components/layout/CategoryPillNav'

const CHANNEL_CATEGORIES = CHANNELS.map((ch) => ({
  label: ch.label,
  href: ch.href,
  slug: ch.slug,
}))

export default function ChannelBar() {
  return <CategoryPillNav categories={CHANNEL_CATEGORIES} />
}
