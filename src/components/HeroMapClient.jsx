'use client'

import dynamic from 'next/dynamic'

const HeroMap = dynamic(() => import('./HeroMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[350px] sm:h-[480px] animate-pulse bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
      <span className="text-slate-400 text-sm font-medium">Memuat peta...</span>
    </div>
  ),
})

export default function HeroMapClient() {
  return <HeroMap />
}
