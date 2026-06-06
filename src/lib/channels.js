/**
 * Sumber kebenaran tunggal untuk semua kanal & sub-kanal portal.
 * Header, Footer, sitemap, dan navigasi membaca dari sini — tidak ada hardcode di tempat lain.
 */

// ── Kanal utama ────────────────────────────────────────────────────────────

export const CHANNELS = [
  {
    label: 'Berita Kesehatan',
    slug: 'berita-kesehatan',
    href: '/berita-kesehatan',
    order: 1,
    hasSubchannels: true,
    subchannels: [
      { label: 'Layanan Kesehatan',       slug: 'layanan-kesehatan',       order: 1 },
      { label: 'Edukasi Kesehatan',        slug: 'edukasi-kesehatan',        order: 2 },
      { label: 'Kesehatan Ibu & Anak',     slug: 'kesehatan-ibu-anak',       order: 3 },
      { label: 'Gizi & Stunting',          slug: 'gizi-stunting',            order: 4 },
      { label: 'Kesehatan Mental',         slug: 'kesehatan-mental',         order: 5 },
      { label: 'Kebijakan Kesehatan',      slug: 'kebijakan-kesehatan',      order: 6 },
      { label: 'Teknologi & AI Kesehatan', slug: 'teknologi-ai-kesehatan',   order: 7 },
      { label: 'Tokoh Kesehatan',          slug: 'tokoh-kesehatan',          order: 8 },
    ],
  },
  {
    label: 'Aksi Kemanusiaan',
    slug: 'aksi-kemanusiaan',
    href: '/aksi-kemanusiaan',
    order: 2,
    hasSubchannels: true,
    subchannels: [
      { label: 'Tanggap Bencana',       slug: 'tanggap-bencana',       order: 1 },
      { label: 'Donor Darah',           slug: 'donor-darah',           order: 2 },
      { label: 'Bakti Sosial',          slug: 'bakti-sosial',          order: 3 },
      { label: 'Bantuan Dhuafa & Yatim',slug: 'bantuan-dhuafa-yatim',  order: 4 },
      { label: 'Relawan',               slug: 'relawan',               order: 5 },
      { label: 'Kisah Kemanusiaan',     slug: 'kisah-kemanusiaan',     order: 6 },
      { label: 'Program Kemanusiaan',   slug: 'program-kemanusiaan',   order: 7 },
      { label: 'Laporan Donasi',        slug: 'laporan-donasi',        order: 8 },
    ],
  },
  {
    label: 'Dokter Menulis',
    slug: 'dokter-menulis',
    href: '/dokter-menulis',
    order: 3,
    hasSubchannels: false,
    subchannels: [],
  },
  {
    label: 'Video Story',
    slug: 'video-story',
    href: '/video-story',
    order: 4,
    hasSubchannels: false,
    subchannels: [],
  },
  {
    label: 'Galeri',
    slug: 'galeri',
    href: '/galeri',
    order: 5,
    hasSubchannels: false,
    subchannels: [],
  },
]

// ── Kategori galeri ────────────────────────────────────────────────────────

export const GALLERY_CATEGORIES = [
  { label: 'Semua',            value: null },
  { label: 'Donor Darah',      value: 'donor-darah' },
  { label: 'Bakti Sosial',     value: 'bakti-sosial' },
  { label: 'Tanggap Bencana',  value: 'tanggap-bencana' },
  { label: 'Kegiatan',         value: 'kegiatan' },
  { label: 'Lainnya',          value: 'lainnya' },
]

// ── Helper: cari channel berdasarkan slug ──────────────────────────────────

export function getChannelBySlug(slug) {
  return CHANNELS.find((c) => c.slug === slug) ?? null
}

/** Kembalikan sub-kanal + meta parent sekaligus (untuk breadcrumb dsb) */
export function getSubchannelInfo(channelSlug, subchannelSlug) {
  const channel = getChannelBySlug(channelSlug)
  if (!channel) return null
  const sub = channel.subchannels.find((s) => s.slug === subchannelSlug)
  if (!sub) return null
  return { channel, subchannel: sub }
}

/** URL lengkap ke halaman sub-kanal */
export function subchannelHref(channelSlug, subchannelSlug) {
  return `/${channelSlug}/${subchannelSlug}`
}
