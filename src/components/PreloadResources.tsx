'use client'

import { preconnect, prefetchDNS } from 'react-dom'

export default function PreloadResources() {
  preconnect('https://images.unsplash.com', { crossOrigin: 'anonymous' })
  preconnect('https://img.youtube.com', { crossOrigin: 'anonymous' })
  // OSM tile servers — preconnect agar tiles mulai segera saat Leaflet init
  preconnect('https://a.tile.openstreetmap.org', { crossOrigin: 'anonymous' })
  preconnect('https://b.tile.openstreetmap.org', { crossOrigin: 'anonymous' })
  preconnect('https://c.tile.openstreetmap.org', { crossOrigin: 'anonymous' })
  prefetchDNS('https://placehold.co')
  return null
}
