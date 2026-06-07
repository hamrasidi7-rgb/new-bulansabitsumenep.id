import Link from 'next/link'

const SERVICES = [
  {
    label: 'FASKES',
    desc: 'RS, Puskesmas,\nKlinik & Lainnya',
    href: '/berita-kesehatan/layanan-kesehatan',
    bg: '#16a34a',
    icon: FaskesIcon,
  },
  {
    label: 'DARURAT',
    desc: 'IGD 24 Jam,\nAmbulan',
    href: '/aksi-kemanusiaan/tanggap-bencana',
    bg: '#dc2626',
    icon: DaruratIcon,
  },
  {
    label: 'APOTEK',
    desc: 'Obat & Apotek\nTerdekat',
    href: '/berita-kesehatan/layanan-kesehatan',
    bg: '#ea580c',
    icon: ApotekIcon,
  },
  {
    label: 'DONOR DARAH',
    desc: 'Stok & Jadwal\nDonor Darah',
    href: '/aksi-kemanusiaan/donor-darah',
    bg: '#be123c',
    icon: DonorIcon,
  },
]

export default function QuickAccess() {
  return (
    <nav aria-label="Layanan Cepat"
      className="border-b border-[var(--border)] bg-[var(--background)] px-3 py-3">
      <div className="mx-auto grid max-w-2xl grid-cols-4 gap-2">
        {SERVICES.map(({ label, desc, href, bg, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center gap-1.5 rounded-xl p-2 text-center
              transition hover:bg-[var(--surface)] active:scale-95"
          >
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm"
              style={{ backgroundColor: bg }}
            >
              <Icon />
            </span>
            <span className="text-[11px] font-bold leading-none text-[var(--foreground)]">
              {label}
            </span>
            <span className="text-[9.5px] leading-tight text-[var(--muted)] whitespace-pre-line">
              {desc}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}

function FaskesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="6" width="20" height="18" rx="2" />
      <path d="M9 24V16h8v8" />
      <path d="M3 12h20" />
      <path d="M10 3h6M13 3v3" />
      <path d="M11 9.5h4M13 8v3" />
    </svg>
  )
}

function DaruratIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="10" width="24" height="11" rx="3" />
      <path d="M6 10V8a2 2 0 012-2h10a2 2 0 012 2v2" />
      <circle cx="7" cy="21" r="2" />
      <circle cx="19" cy="21" r="2" />
      <path d="M9 15h2.5M11.5 13v4" />
      <path d="M19 13l1.5-3" />
    </svg>
  )
}

function ApotekIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="8" y="3" width="10" height="20" rx="5" transform="rotate(0 8 3)" />
      <ellipse cx="13" cy="13" rx="5" ry="10" />
      <path d="M8 13h10" />
      <rect x="4" y="8" width="18" height="10" rx="5" />
      <path d="M4 13h18" />
    </svg>
  )
}

function DonorIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="white"
      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 22C13 22 4 16 4 10a5 5 0 0110 0 5 5 0 0110 0c0 6-9 12-11 12z"
        fill="rgba(255,255,255,0.25)" />
      <path d="M13 8v6M10 11h6" />
    </svg>
  )
}
