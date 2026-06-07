import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import PreloadResources from '@/components/PreloadResources'
import WhatsAppFab from '@/components/ui/WhatsAppFab'

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PreloadResources />

      <Header />

      <main className="flex-1 pb-16">
        {children}
      </main>

      <Suspense fallback={<div className="h-48 bg-[#1a2235]" />}>
        <Footer />
      </Suspense>

      <Suspense fallback={null}>
        <WhatsAppFab />
      </Suspense>

      <BottomNav />
    </div>
  )
}
