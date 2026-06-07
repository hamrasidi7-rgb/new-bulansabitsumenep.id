'use client'

import dynamic from 'next/dynamic'

const HealthMap = dynamic(() => import('./HealthMap'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full animate-pulse"
      style={{ height: '100dvh', background: 'linear-gradient(to bottom, #1a2235 0%, #2d3f5e 40%, #c8d8c8 100%)' }}
    />
  ),
})

export default function HealthMapClient() {
  return <HealthMap />
}
