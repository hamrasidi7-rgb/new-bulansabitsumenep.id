import { Suspense } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'
import PreloadResources from '@/components/PreloadResources'
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PreloadResources />

      <Header />

      <main className="flex-1 pb-16">
        {children}
      </main>

      <Suspense fallback={<div className="h-48 bg-[#e8ecf2]" />}>
        <Footer />
      </Suspense>

      <BottomNav />
    </div>
  )
}
