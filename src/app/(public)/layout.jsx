import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import ChannelBar from '@/components/layout/ChannelBar'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import BannerSlot from '@/components/ui/BannerSlot'
import PreloadResources from '@/components/PreloadResources'
import WhatsAppFab from '@/components/ui/WhatsAppFab'

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PreloadResources />

      {/* Banner — Suspense agar tidak blokir LCP */}
      <Suspense fallback={<div className="w-full h-[50px] sm:h-[90px] bg-[var(--surface)] border-b border-[var(--border)]" />}>
        <div className="w-full px-4 py-2 bg-[var(--card)] border-b border-[var(--border)]">
          <div className="mx-auto max-w-6xl">
            <BannerSlot size="leaderboard" />
          </div>
        </div>
      </Suspense>

      <Header />
      <ChannelBar />

      <main className="flex-1 pb-16">
        {children}
      </main>

      {/* Footer — Suspense agar tidak blokir render */}
      <Suspense fallback={<div className="h-48 bg-[#1a2235]" />}>
        <Footer />
      </Suspense>

      {/* WhatsApp FAB — Suspense, tidak perlu fallback */}
      <Suspense fallback={null}>
        <WhatsAppFab />
      </Suspense>

      <BottomNav />
    </div>
  )
}
