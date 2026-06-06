export interface NavCategory {
  slug: string
  label: string
  href: string
}

export const NAV_CATEGORIES: NavCategory[] = [
  { slug: 'terbaru',         label: 'Terbaru',          href: '/'                        },
  { slug: 'kesehatan',       label: 'Kesehatan',         href: '/kategori/kesehatan'      },
  { slug: 'aksi-kemanusiaan',label: 'Aksi Kemanusiaan',  href: '/kategori/aksi-kemanusiaan'},
  { slug: 'edukasi',         label: 'Edukasi',           href: '/kategori/edukasi'        },
  { slug: 'relawan',         label: 'Relawan',           href: '/kategori/relawan'        },
  { slug: 'tanggap-bencana', label: 'Tanggap Bencana',   href: '/kategori/tanggap-bencana'},
  { slug: 'gizi',            label: 'Gizi',              href: '/kategori/gizi'           },
]
