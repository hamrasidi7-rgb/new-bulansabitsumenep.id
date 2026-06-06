import Header from '@/components/layout/Header'
import ChannelBar from '@/components/layout/ChannelBar'
import CategoryNav from '@/components/CategoryNav'
import Footer from '@/components/layout/Footer'
import BottomNav from '@/components/layout/BottomNav'

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ChannelBar />
      {/* CategoryNav: pill bar kategori — dirender SEKALI di sini */}
      <CategoryNav />
      <main className="flex-1 pb-16">
        {children}
      </main>
      <Footer />
      <BottomNav />
    </div>
  )
}
