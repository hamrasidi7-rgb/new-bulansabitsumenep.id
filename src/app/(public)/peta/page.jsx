import HealthMapClient from '@/components/HealthMapClient'

export const metadata = {
  title: 'Peta Layanan Kesehatan & Kedaruratan — Sumenep',
  description:
    'Peta interaktif fasilitas kesehatan Kabupaten Sumenep: RS, Puskesmas, Klinik, IGD, dan Apotek. Dilengkapi petunjuk arah Google Maps.',
}

export default function PetaPage() {
  return (
    <>
      {/*
        Fixed positioning: map menutupi seluruh layar di bawah header (56px).
        Tidak terpengaruh pb-16 pada <main> maupun Footer di layout (public).
      */}
      <div
        className="fixed inset-x-0 bottom-0 z-40"
        style={{ top: '56px' }}
      >
        <HealthMapClient />
      </div>

      {/* Spacer agar <main> tidak collapse (elemen fixed keluar dari flow) */}
      <div style={{ height: 'calc(100dvh - 56px)' }} aria-hidden="true" />
    </>
  )
}
