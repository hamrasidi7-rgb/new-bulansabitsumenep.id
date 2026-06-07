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
  rs: '#dc2626', puskesmas: '#16a34a', klinik: '#2563eb', apotek: '#ea580c', igd: '#9333ea',
}

function makeIcon(color: string, L: any) {
  return L.divIcon({
    className: '',
    html: `<div style="width:28px;height:28px;border-radius:50% 50% 50% 0;background:${color};border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);transform:rotate(-45deg)"></div>`,
    iconSize: [28, 28], iconAnchor: [14, 28], popupAnchor: [0, -30],
  })
}

export default function HealthMap() {
  const mapRef      = useRef<HTMLDivElement>(null)
  const leafletRef  = useRef<any>(null)
  const clusterRef  = useRef<any>(null)
  const userMarker  = useRef<any>(null)
  const [active, setActive]     = useState<Category>('semua')
  const [selected, setSelected] = useState<Facility | null>(null)
  const [query, setQuery]       = useState('')
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return

    Promise.all([
      import('leaflet'),
      import('leaflet.markercluster'),
    ]).then(([L]) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: [-7.0047, 113.8481], zoom: 13, zoomControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>', maxZoom: 19,
      }).addTo(map)

      L.control.zoom({ position: 'bottomright' }).addTo(map)

      // GPS locate
      map.on('locationfound', (e: any) => {
        if (userMarker.current) userMarker.current.remove()
        userMarker.current = L.circleMarker(e.latlng, {
          radius: 9, color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 1, weight: 3,
        }).addTo(map).bindPopup('📍 Lokasi Anda').openPopup()
        map.flyTo(e.latlng, 15)
        setLocating(false)
      })
      map.on('locationerror', () => setLocating(false))

      leafletRef.current = { map, L }
      buildCluster(L, map, 'semua', '')
    })

    return () => { leafletRef.current?.map?.remove(); leafletRef.current = null }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!leafletRef.current) return
    const { L, map } = leafletRef.current
    buildCluster(L, map, active, query)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, query])

  function buildCluster(L: any, map: any, cat: Category, q: string) {
    if (clusterRef.current) map.removeLayer(clusterRef.current)
    const cluster = (L as any).markerClusterGroup({ spiderfyOnMaxZoom: true, showCoverageOnHover: false, maxClusterRadius: 50 })
    const search = q.trim().toLowerCase()
    FACILITIES
      .filter(f => (cat === 'semua' || f.category === cat) && (!search || f.name.toLowerCase().includes(search) || f.address.toLowerCase().includes(search)))
      .forEach(f => {
        const m = L.marker([f.lat, f.lng], { icon: makeIcon(MARKER_COLORS[f.category], L) })
        m.on('click', () => setSelected(f))
        cluster.addLayer(m)
      })
    map.addLayer(cluster)
    clusterRef.current = cluster
  }

  function handleLocate() {
    if (!leafletRef.current) return
    setLocating(true)
    leafletRef.current.map.locate({ setView: false, maxZoom: 16 })
  }

  return (
    <div className="relative w-full" style={{ height: '100dvh' }}>
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* Gradient overlay di bawah header */}
      <div className="absolute left-0 right-0 z-10 pointer-events-none" style={{
        top: '56px', height: '120px',
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.55) 65%, transparent 100%)',
      }} />

      {/* Filter + Search — satu container */}
      <div className="absolute left-0 right-0 z-20 flex flex-col gap-2 px-3" style={{ top: '64px' }}>

        {/* Filter pills */}
        <div className="flex self-center gap-1.5 overflow-x-auto rounded-2xl bg-white/95 px-3 py-2 shadow-md backdrop-blur-sm no-scrollbar">
          {(Object.keys(CATEGORY_CONFIG) as Category[]).filter(c => c !== 'semua').map(cat => {
            const cfg = CATEGORY_CONFIG[cat]
            const isOn = active === cat
            return (
              <button key={cat} onClick={() => { setActive(cat); setSelected(null) }}
                className="flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold transition-all"
                style={{ background: isOn ? cfg.color : 'transparent', color: isOn ? 'white' : '#374151' }}>
                <span>{cfg.emoji}</span><span>{cfg.label}</span>
              </button>
            )
          })}
        </div>

        {/* Search bar */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="8.5" cy="8.5" r="5.5"/><path d="M13 13l4 4"/>
            </svg>
          </span>
          <input type="search" value={query}
            onChange={e => { setQuery(e.target.value); setSelected(null) }}
            placeholder="Cari RS, Puskesmas, Klinik..."
            className="w-full rounded-2xl bg-white/95 py-2.5 pl-9 pr-4 text-[13px] font-medium text-gray-700 placeholder-gray-400 shadow-md outline-none backdrop-blur-sm focus:ring-2 focus:ring-red-400"
          />
        </div>
      </div>

      {/* GPS button — di atas zoom control */}
      <button
        onClick={handleLocate}
        aria-label="Lokasi Saya"
        className="absolute z-20 flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-lg transition hover:bg-gray-50 active:scale-95"
        style={{ bottom: '96px', right: '10px' }}
      >
        {locating
          ? <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/><path d="M12 8a4 4 0 100 8 4 4 0 000-8z" strokeOpacity=".3"/>
            </svg>
        }
      </button>

      {/* Bottom Sheet — muncul dari bawah saat marker diklik */}
      <div
        className="absolute left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out"
        style={{
          bottom: 0,
          transform: selected ? 'translateY(0)' : 'translateY(110%)',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
        }}
      >
        {selected && (
          <>
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1.5 w-12 rounded-full bg-gray-200" />
            </div>

            <div className="px-5 pt-2 pb-5">
              {/* Header info */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl"
                  style={{ background: MARKER_COLORS[selected.category] + '18' }}>
                  {CATEGORY_CONFIG[selected.category].emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: MARKER_COLORS[selected.category] }}>
                    {CATEGORY_CONFIG[selected.category].label}
                  </span>
                  <h3 className="font-bold text-[16px] leading-snug text-gray-900">{selected.name}</h3>
                  <p className="text-[12px] text-gray-500 mt-0.5 leading-snug">{selected.address}</p>
                </div>
                <button onClick={() => setSelected(null)} className="text-gray-300 hover:text-gray-500 text-2xl leading-none mt-0.5 shrink-0">×</button>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5">
                {selected.phone && (
                  <a href={`tel:${selected.phone.replace(/\D/g,'')}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-[13px] font-bold text-green-700 bg-green-50 hover:bg-green-100 transition">
                    <span>📞</span> Telepon
                  </a>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl py-3 text-[13px] font-bold text-white transition"
                  style={{ background: '#1a2235' }}>
                  <span>🧭</span> Petunjuk Arah
                </a>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tap overlay tutup bottom sheet */}
      {selected && (
        <div className="absolute inset-0 z-[25]" onClick={() => setSelected(null)} />
      )}
    </div>
  )
}
