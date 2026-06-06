import Header from '@/components/layout/Header'
import ChannelBar from '@/components/layout/ChannelBar'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import BannerSlot from '@/components/ui/BannerSlot'

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Banner di atas header */}
      <div className="w-full px-4 py-2 bg-[var(--card)] border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl">
          <BannerSlot size="leaderboard" />
        </div>
      </div>
      <Header />
      <ChannelBar />
      <main className="flex-1 pb-16">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
