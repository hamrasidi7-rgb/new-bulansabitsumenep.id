import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

/**
 * Layout semua halaman publik (route group "(public)").
 * Menyediakan Header 5-kanal dan Footer baru berbasis channels.js.
 * Root layout (app/layout.tsx) tetap menangani font, lang, dan global CSS.
 */
export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
