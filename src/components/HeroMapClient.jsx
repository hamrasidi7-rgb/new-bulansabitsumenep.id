'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const HeroMap = dynamic(() => import('./HeroMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[270px] sm:h-[400px] animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
      <span className="text-slate-400 text-sm font-medium">Memuat peta...</span>
    </div>
  ),
})

export default function HeroMapClient() {
  useEffect(() => {
    // Preload Leaflet dan markercluster segera saat komponen mount
    // sehingga sudah ada di module cache ketika HeroMap useEffect berjalan
    Promise.all([
      import('leaflet'),
      import('leaflet.markercluster'),
    ]).catch(() => {})
  }, [])

  return <HeroMap />
}
