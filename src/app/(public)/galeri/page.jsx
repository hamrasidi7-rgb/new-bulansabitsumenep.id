import GalleryIndex from '@/components/GalleryIndex'

export const metadata = {
  title: 'Galeri Foto',
  description: 'Dokumentasi foto kegiatan Bulan Sabit Sumenep: donor darah, bakti sosial, tanggap bencana, dan kegiatan kemanusiaan lainnya.',
}

export default function GaleriPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <GalleryIndex />
    </div>
  )
}
