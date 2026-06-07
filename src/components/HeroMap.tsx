'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface Facility {
  id: number; name: string; category: string
  lat: number; lng: number; address: string; phone?: string
}

const FACILITIES: Facility[] = [
  { id:1,  name:'RSUD dr. H. Moh. Anwar Sumenep', category:'rs',        lat:-7.0047, lng:113.8481, address:'Jl. Dr. Cipto No.42, Sumenep',        phone:'(0328) 662555' },
  { id:2,  name:'RS Mitra Sehat Sumenep',           category:'rs',        lat:-7.0120, lng:113.8530, address:'Jl. Trunojoyo, Sumenep',               phone:'(0328) 675000' },
  { id:3,  name:'Puskesmas Kota Sumenep',           category:'puskesmas', lat:-7.0065, lng:113.8460, address:'Jl. Gajah Mada, Sumenep' },
  { id:4,  name:'Puskesmas Kalianget',              category:'puskesmas', lat:-7.0530, lng:113.9190, address:'Kalianget, Sumenep' },
  { id:5,  name:'Puskesmas Lenteng',                category:'puskesmas', lat:-7.0340, lng:113.7990, address:'Lenteng, Sumenep' },
  { id:6,  name:'Puskesmas Bluto',                  category:'puskesmas', lat:-7.0700, lng:113.8100, address:'Bluto, Sumenep' },
  { id:7,  name:'Puskesmas Gapura',                 category:'puskesmas', lat:-7.0200, lng:113.9100, address:'Gapura, Sumenep' },
  { id:8,  name:'Klinik Pratama PMI Sumenep',       category:'klinik',    lat:-7.0060, lng:113.8500, address:'Jl. Urip Sumoharjo, Sumenep' },
  { id:9,  name:'Klinik Sehat Sumenep',             category:'klinik',    lat:-7.0080, lng:113.8440, address:'Jl. Pajagalan, Sumenep' },
  { id:10, name:'Apotek Kimia Farma Sumenep',       category:'apotek',    lat:-7.0050, lng:113.8470, address:'Jl. Trunojoyo, Sumenep' },
  { id:11, name:'Apotek K-24 Sumenep',              category:'apotek',    lat:-7.0090, lng:113.8510, address:'Jl. Dr. Wahidin, Sumenep' },
  { id:12, name:'IGD RSUD Sumenep',                 category:'igd',       lat:-7.0050, lng:113.8483, address:'IGD 24 Jam',                           phone:'(0328) 662555' },
]

const COLORS: Record<string,string> = {
  rs:'#dc2626', puskesmas:'#16a34a', klinik:'#2563eb', apotek:'#ea580c', igd:'#9333ea',
}

function pinHtml(color: string) {
  return `<div style="width:24px;height:24px;border-radius:50% 50% 50% 0;background:${color};border:2px solid white;box-shadow:0 2px 5px rgba(0,0,0,.3);transform:rotate(-45deg)"></div>`
}

export default function HeroMap() {
  const mapRef     = useRef<HTMLDivElement>(null)
  const leafletRef = useRef<any>(null)
  const clusterRef = useRef<any>(null)
  const userMk     = useRef<any>(null)
  const [selected, setSelected] = useState<Facility | null>(null)
  const [locating, setLocating] = useState(false)

  useEffect(() => {
    if (!mapRef.current || leafletRef.current) return
    // Delay 1.2s: beri browser waktu paint artikel (priority image) dulu → LCP lebih cepat
    const timer = setTimeout(() => {
      if (!mapRef.current) return
      Promise.all([import('leaflet'), import('leaflet.markercluster')]).then(([L]) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl
        const map = L.map(mapRef.current!, { center:[-7.0047,113.8481], zoom:12, zoomControl:false, scrollWheelZoom:false, preferCanvas:true })
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution:'© OpenStreetMap', maxZoom:19 }).addTo(map)
        L.control.zoom({ position:'bottomright' }).addTo(map)
        map.on('locationfound',(e:any)=>{
          userMk.current?.remove()
          userMk.current = L.circleMarker(e.latlng,{radius:8,color:'#2563eb',fillColor:'#3b82f6',fillOpacity:1,weight:3}).addTo(map)
          map.flyTo(e.latlng,15); setLocating(false)
        })
        map.on('locationerror',()=>setLocating(false))
        leafletRef.current = { map, L }
        buildClusters(L, map)
      })
    }, 1200)
    return ()=>{ clearTimeout(timer); leafletRef.current?.map?.remove(); leafletRef.current=null }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  function buildClusters(L:any, map:any) {
    if (clusterRef.current) map.removeLayer(clusterRef.current)
    const grp = (L as any).markerClusterGroup({ spiderfyOnMaxZoom:true, showCoverageOnHover:false, maxClusterRadius:45 })
    FACILITIES.forEach(f=>{
      const mk = L.marker([f.lat,f.lng],{ icon: L.divIcon({ className:'', html:pinHtml(COLORS[f.category]??'#6b7280'), iconSize:[24,24], iconAnchor:[12,24] }) })
      mk.on('click',()=>setSelected(f))
      grp.addLayer(mk)
    })
    map.addLayer(grp); clusterRef.current=grp
  }

  function locate() {
    if (!leafletRef.current) return
    setLocating(true); leafletRef.current.map.locate({ setView:false, maxZoom:16 })
  }

  return (
    <div className="w-full">

      {/* Judul mini atas peta */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-white border-b border-gray-100">
        <span className="text-base">📍</span>
        <h2 className="text-[13px] font-bold text-[#1a2235] tracking-tight">
          Peta Faskes Kabupaten Sumenep
        </h2>
      </div>

      {/* MAP CONTAINER */}
      <div className="relative w-full h-[270px] sm:h-[400px] overflow-hidden">
        <div ref={mapRef} className="absolute inset-0 z-0" />

        {/* Banner Tanya AI BulanSabitSumenep */}
        <a
          href="https://wa.me/6285234567890?text=Halo%20Tanya%20AI%20BulanSabitSumenep%2C%20saya%20ingin%20bertanya%20tentang%20faskes%2C%20stok%20darah%2C%20obat%2C%20atau%20ambulans."
          target="_blank" rel="noopener noreferrer"
          className="absolute top-3 left-3 right-3 z-10 flex items-center bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow active:scale-[0.98]"
        >
          {/* Robot icon + sparkle */}
          <div className="relative flex h-[60px] w-[60px] shrink-0 items-center justify-center bg-red-50">
            <span className="text-[28px] leading-none">🤖</span>
            <span className="absolute top-2 right-1.5 text-[10px] text-red-400 font-black">✦</span>
          </div>

          {/* Divider vertikal */}
          <div className="w-px self-stretch bg-gray-200 mx-0 shrink-0" />

          {/* Teks tengah */}
          <div className="flex-1 px-3 py-2 min-w-0">
            <p className="font-black text-[12.5px] leading-tight tracking-tight">
              <span className="text-[#1a2235]">TANYA AI </span>
              <span className="text-red-600">BULANSABITSUMENEP</span>
            </p>
            <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mt-0.5 leading-none">
              CARI FASKES&nbsp;•&nbsp;STOK DARAH&nbsp;•&nbsp;OBAT&nbsp;•&nbsp;AMBULANS
            </p>
          </div>

          {/* Tombol kirim merah */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500 text-white shadow-sm mr-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
            </svg>
          </div>
        </a>

        {/* Floating buttons kanan bawah */}
        <div className="absolute bottom-14 right-2.5 z-10 flex flex-col gap-2">
          <button onClick={locate} aria-label="Lokasi Saya"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md hover:bg-gray-50 transition active:scale-95">
            {locating
              ? <span className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"/>
              : <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/></svg>
            }
          </button>
          <Link href="/peta" aria-label="Layar Penuh"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-md hover:bg-gray-50 transition active:scale-95">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1a2235" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M16 21h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
          </Link>
        </div>

        {/* Tombol Jelajahi Peta — kiri bawah */}
        <Link href="/peta"
          className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-xl bg-[#1a2235] px-3 py-2 text-[12px] font-bold text-white shadow-lg hover:bg-[#243050] transition active:scale-95">
          📍 Jelajahi Peta Kesehatan
        </Link>

        {/* Bottom sheet info faskes */}
        <div className="absolute left-0 right-0 z-20 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300"
          style={{ bottom:0, transform: selected ? 'translateY(0)' : 'translateY(110%)' }}>
          {selected && (
            <div className="px-4 pt-3 pb-4">
              <div className="flex items-start gap-3 mb-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
                  style={{ background:(COLORS[selected.category]??'#6b7280')+'18' }}>
                  {selected.category==='rs'?'🏥':selected.category==='puskesmas'?'🏢':selected.category==='klinik'?'🩺':selected.category==='apotek'?'💊':'🚑'}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-[14px] leading-snug text-gray-900">{selected.name}</h3>
                  <p className="text-[11px] text-gray-500">{selected.address}</p>
                </div>
                <button onClick={()=>setSelected(null)} className="text-gray-300 text-xl shrink-0">×</button>
              </div>
              <div className="flex gap-2">
                {selected.phone && (
                  <a href={`tel:${selected.phone.replace(/\D/g,'')}`}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold text-green-700 bg-green-50">
                    📞 Telepon
                  </a>
                )}
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-xl py-2.5 text-[12px] font-bold text-white"
                  style={{ background:'#1a2235' }}>
                  🧭 Arah
                </a>
              </div>
            </div>
          )}
        </div>
        {selected && <div className="absolute inset-0 z-[15]" onClick={()=>setSelected(null)}/>}
      </div>

      {/* Counter ringkas di bawah peta */}
      <div className="bg-white border-t border-gray-100">
        <div className="mx-auto flex max-w-2xl divide-x divide-gray-100">
          {[
            { emoji:'🏥', count:'4',  label:'RS' },
            { emoji:'🩺', count:'31', label:'Puskesmas' },
            { emoji:'💊', count:'20', label:'Apotek' },
            { emoji:'🩸', count:'',   label:'PMI Aktif' },
          ].map(({ emoji, count, label }) => (
            <div key={label} className="flex flex-1 flex-col items-center py-2.5 gap-0.5">
              <span className="text-lg leading-none">{emoji}</span>
              <span className="text-[13px] font-extrabold text-[#1a2235] leading-none">
                {count && <>{count} </>}{label}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
