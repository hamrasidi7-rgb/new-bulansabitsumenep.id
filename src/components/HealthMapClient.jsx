'use client'

import dynamic from 'next/dynamic'

const HealthMap = dynamic(() => import('./HealthMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full animate-pulse bg-[#e8f0e8]"
      style={{ height: 'calc(100dvh - 120px)' }}
    />
  ),
})

export default function HealthMapClient() {
  return <HealthMap />
}
