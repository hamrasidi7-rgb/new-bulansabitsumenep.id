import Header from '@/components/layout/Header'
import ChannelBar from '@/components/layout/ChannelBar'
import Footer from '@/components/layout/Footer'

/**
 * Layout semua halaman publik (route group "(public)").
 * Struktur: Header (logo+hamburger) → ChannelBar (5 kanal) → konten → Footer.
 */
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ChannelBar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
