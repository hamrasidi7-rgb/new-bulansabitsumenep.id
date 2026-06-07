'use client'

import { preconnect, prefetchDNS } from 'react-dom'

export default function PreloadResources() {
  preconnect('https://images.unsplash.com', { crossOrigin: 'anonymous' })
  preconnect('https://img.youtube.com', { crossOrigin: 'anonymous' })
  prefetchDNS('https://placehold.co')
  return null
}
