'use client'

import { useEffect, useRef, useState } from 'react'

type Category = 'semua' | 'rs' | 'puskesmas' | 'klinik' | 'apotek' | 'igd'

interface Facility {
  id: number
  name: string
  category: Exclude<Category, 'semua'>
  lat: number
  lng: number
  address: string
  phone?: string
}

const FACILITIES: Facility[] = [
  { id: 1,  name: 'RSUD dr. H. Moh. Anwar Sumenep', category: 'rs',        lat: -7.0047, lng: 113.8481, address: 'Jl. Dr. Cipto No.42, Sumenep',        phone: '(0328) 662555' },
  { id: 2,  name: 'RS Mitra Sehat Sumenep',           category: 'rs',        lat: -7.0120, lng: 113.8530, address: 'Jl. Trunojoyo, Sumenep',               phone: '(0328) 675000' },
  { id: 3,  name: 'Puskesmas Kota Sumenep',           category: 'puskesmas', lat: -7.0065, lng: 113.8460, address: 'Jl. Gajah Mada, Sumenep' },
  { id: 4,  name: 'Puskesmas Kalianget',              category: 'puskesmas', lat: -7.0530, lng: 113.9190, address: 'Kalianget, Sumenep' },
  { id: 5,  name: 'Puskesmas Lenteng',                category: 'puskesmas', lat: -7.0340, lng: 113.7990, address: 'Lenteng, Sumenep' },
  { id: 6,  name: 'Puskesmas Bluto',                  category: 'puskesmas', lat: -7.0700, lng: 113.8100, address: 'Bluto, Sumenep' },
  { id: 7,  name: 'Puskesmas Gapura',                 category: 'puskesmas', lat: -7.0200, lng: 113.9100, address: 'Gapura, Sumenep' },
  { id: 8,  name: 'Klinik Pratama PMI Sumenep',       category: 'klinik',    lat: -7.0060, lng: 113.8500, address: 'Jl. Urip Sumoharjo, Sumenep' },
  { id: 9,  name: 'Klinik Sehat Sumenep',             category: 'klinik',    lat: -7.0080, lng: 113.8440, address: 'Jl. Pajagalan, Sumenep' },
  { id: 10, name: 'Apotek Kimia Farma Sumenep',       category: 'apotek',    lat: -7.0050, lng: 113.8470, address: 'Jl. Trunojoyo, Sumenep' },
  { id: 11, name: 'Apotek K-24 Sumenep',              category: 'apotek',    lat: -7.0090, lng: 113.8510, address: 'Jl. Dr. Wahidin, Sumenep' },
  { id: 12, name: 'IGD RSUD Sumenep',                 category: 'igd',       lat: -7.0050, lng: 113.8483, address: 'RSUD dr. H. Moh. Anwar — IGD 24 Jam', phone: '(0328) 662555' },
]

const CATEGORY_CONFIG: Record<Category, { label: string; color: string; emoji: string }> = {
  semua:    { label: 'Semua',    color: '#1a2235', emoji: '🗺️' },
  rs:       { label: 'RS',       color: '#dc2626', emoji: '🏥' },
  puskesmas:{ label: 'Puskesmas',color: '#16a34a', emoji: '🏢' },
  klinik:   { label: 'Klinik',   color: '#2563eb', emoji: '🩺' },
  apotek:   { label: 'Apotek',   color: '#ea580c', emoji: '💊' },
  igd:      { label: 'IGD',      color: '#9333ea', emoji: '🚑' },
}

const MARKER_COLORS: Record<Exclude<Category, 'semua'>, string> = {
  rs:        '#dc2626',
  puskesmas: '#16a34a',
  klinik:    '#2563eb',
  apotek:    '#ea580c',
  igd:       '#9333ea',
}

function makeIcon(color: string, L: typeof import('leaflet')) {
  return L.divIcon({
    className: '',
    html: `<div style="
      width:32px;height:32px;border-radius:50% 50% 50% 0;
      background:${color};border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.35);
      transform:rotate(-45deg)">
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -34],
  })
}

export default function HealthMap() {
  const mapRef    = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<any>(null)
  const [active, setActive] = useState<Category>('semua')
  const [selected, setSelected] = useState<Facility | null>(null)

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return

    import('leaflet').then((L) => {
      // Fix default icon path (Next.js build issue)
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [-7.0047, 113.8481],
        zoom: 13,
        zoomControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // Simpan map + L ke ref agar bisa diakses di filter
      leafletRef.current = { map, L, markers: [] as any[] }

      renderMarkers(L, map, 'semua', setSelected)
    })

    return () => {
      leafletRef.current?.map?.remove()
      leafletRef.current = null
    }
  }, [])

  // Re-render marker saat filter berubah
  useEffect(() => {
    if (!leafletRef.current) return
    const { map, L, markers } = leafletRef.current
    markers.forEach((m: any) => map.removeLayer(m))
    leafletRef.current.markers = renderMarkers(L, map, active, setSelected)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <div className="relative w-full" style={{ height: 'calc(100dvh - 120px)' }}>

      {/* Peta */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Filter kategori — floating atas */}
      <div className="absolute top-3 left-0 right-0 z-10 flex justify-center px-3">
        <div className="flex gap-1.5 overflow-x-auto rounded-2xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur-sm no-scrollbar">
          {(Object.keys(CATEGORY_CONFIG) as Category[]).map((cat) => {
            const cfg = CATEGORY_CONFIG[cat]
            const isOn = active === cat
            return (
              <button
                key={cat}
                onClick={() => { setActive(cat); setSelected(null) }}
                className="flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5
                  text-[11px] font-bold transition-all"
                style={{
                  background: isOn ? cfg.color : 'transparent',
                  color: isOn ? 'white' : '#374151',
                }}
              >
                <span>{cfg.emoji}</span>
                <span>{cfg.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Info panel — muncul saat marker diklik */}
      {selected && (
        <div className="absolute bottom-4 left-3 right-3 z-10">
          <div className="rounded-2xl bg-white p-4 shadow-2xl ring-1 ring-black/10">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white mb-1.5"
                  style={{ background: MARKER_COLORS[selected.category] }}
                >
                  {CATEGORY_CONFIG[selected.category].label}
                </span>
                <h3 className="font-bold text-[15px] leading-snug text-gray-900">{selected.name}</h3>
                <p className="mt-1 text-[12px] text-gray-500">{selected.address}</p>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone.replace(/\D/g,'')}`}
                    className="mt-1 inline-block text-[12px] font-semibold text-blue-600"
                  >
                    📞 {selected.phone}
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-400 hover:text-gray-700 text-xl leading-none mt-0.5 shrink-0"
              >×</button>
            </div>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-center justify-center gap-2 rounded-xl py-2.5
                text-[13px] font-bold text-white transition"
              style={{ background: '#1a2235' }}
            >
              🗺️ Petunjuk Arah
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

function renderMarkers(L: any, map: any, active: Category, setSelected: (f: Facility) => void) {
  const filtered = active === 'semua' ? FACILITIES : FACILITIES.filter(f => f.category === active)
  return filtered.map((f) => {
    const marker = L.marker([f.lat, f.lng], { icon: makeIcon(MARKER_COLORS[f.category], L) })
      .addTo(map)
      .on('click', () => setSelected(f))
    return marker
  })
}
