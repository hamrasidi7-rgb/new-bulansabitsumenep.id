import HealthMapClient from '@/components/HealthMapClient'

export const metadata = {
  title: 'Peta Layanan Kesehatan & Kedaruratan — Sumenep',
  description:
    'Peta interaktif fasilitas kesehatan Kabupaten Sumenep: RS, Puskesmas, Klinik, IGD, dan Apotek. Dilengkapi petunjuk arah Google Maps.',
}

export default function PetaPage() {
  return (
    /* h-[calc(100dvh-56px)]: isi layar penuh dikurangi tinggi header */
    <div style={{ height: 'calc(100dvh - 56px)', overflow: 'hidden' }}>
      <HealthMapClient />
    </div>
  )
}
