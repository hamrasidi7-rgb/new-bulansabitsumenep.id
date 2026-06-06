export type ContributorRole =
  | "Dokter Spesialis"
  | "Dokter Umum"
  | "Perawat"
  | "Psikolog"
  | "Tenaga Kesehatan";

export interface Contributor {
  id: string;
  name: string;
  initials: string;
  role: ContributorRole;
  specialty: string;      // sub-spesialisasi atau bidang
  institution: string;
  topics: string[];       // topik keahlian / tag
  articleCount: number;
  isVerified: boolean;
  avatarColor: string;    // warna bg avatar (tailwind class)
  bio?: string;
}

export const contributors: Contributor[] = [
  {
    id: "fatima-zahra",
    name: "dr. Fatima Zahra, Sp.A",
    initials: "FZ",
    role: "Dokter Spesialis",
    specialty: "Dokter Spesialis Anak",
    institution: "RSUD dr. H. Moh. Anwar Sumenep",
    topics: ["Tumbuh Kembang", "Imunisasi", "Gizi Balita"],
    articleCount: 24,
    isVerified: true,
    avatarColor: "bg-blue-600",
    bio: "Spesialis anak dengan fokus pada tumbuh kembang balita dan pencegahan stunting di wilayah kepulauan.",
  },
  {
    id: "anwar-fauzi",
    name: "dr. Anwar Fauzi",
    initials: "AF",
    role: "Dokter Umum",
    specialty: "Dokter Umum",
    institution: "Puskesmas Kalianget, Sumenep",
    topics: ["DBD", "Diare", "Pertolongan Pertama"],
    articleCount: 18,
    isVerified: true,
    avatarColor: "bg-red-600",
    bio: "Dokter umum aktif di Puskesmas Kalianget, berpengalaman menangani penyakit tropis dan kegawatan ringan.",
  },
  {
    id: "siti-maryam",
    name: "dr. Siti Maryam, M.Gizi",
    initials: "SM",
    role: "Dokter Spesialis",
    specialty: "Ahli Gizi Klinis",
    institution: "Dinas Kesehatan Sumenep",
    topics: ["Gizi Ibu Hamil", "Stunting", "Pangan Lokal"],
    articleCount: 15,
    isVerified: true,
    avatarColor: "bg-green-600",
    bio: "Ahli gizi klinis yang aktif mendampingi program penurunan stunting di kepulauan Sumenep sejak 2022.",
  },
  {
    id: "hamid-wibowo",
    name: "dr. Hamid Wibowo, Sp.JP",
    initials: "HW",
    role: "Dokter Spesialis",
    specialty: "Dokter Spesialis Jantung",
    institution: "RSUD dr. H. Moh. Anwar Sumenep",
    topics: ["Hipertensi", "Jantung", "Gaya Hidup Sehat"],
    articleCount: 11,
    isVerified: true,
    avatarColor: "bg-purple-600",
    bio: "Spesialis kardiovaskular dengan perhatian khusus pada pencegahan penyakit jantung akibat pola makan Madura.",
  },
  {
    id: "nisa-pratiwi",
    name: "Nisa Pratiwi, S.Psi., M.Psi.",
    initials: "NP",
    role: "Psikolog",
    specialty: "Psikolog Klinis",
    institution: "RSJ Menur Surabaya (mitra PMI Sumenep)",
    topics: ["Kesehatan Mental", "Remaja", "Trauma"],
    articleCount: 9,
    isVerified: true,
    avatarColor: "bg-pink-600",
    bio: "Psikolog klinis yang mengembangkan program Pertolongan Pertama Psikologis (P3) bersama PMI Sumenep.",
  },
  {
    id: "romlah-kader",
    name: "Ibu Romlah Aminah, A.Md.Kep.",
    initials: "RA",
    role: "Perawat",
    specialty: "Perawat Komunitas",
    institution: "Puskesmas Arjasa, Kepulauan Kangean",
    topics: ["Posyandu", "Imunisasi", "Kesehatan Keluarga"],
    articleCount: 7,
    isVerified: true,
    avatarColor: "bg-teal-600",
    bio: "Perawat komunitas di Kepulauan Kangean, aktif sebagai koordinator kader Posyandu sejak 2019.",
  },
  {
    id: "yusuf-rahman",
    name: "dr. Yusuf Rahman",
    initials: "YR",
    role: "Dokter Umum",
    specialty: "Dokter Umum",
    institution: "Klinik PMI Sumenep",
    topics: ["Donor Darah", "Kedaruratan", "Kesehatan Umum"],
    articleCount: 13,
    isVerified: true,
    avatarColor: "bg-orange-600",
    bio: "Dokter relawan PMI Sumenep yang aktif dalam layanan donor darah dan bakti kesehatan kepulauan.",
  },
  {
    id: "halimah-dinkes",
    name: "dr. Halimah, M.Kes.",
    initials: "HL",
    role: "Tenaga Kesehatan",
    specialty: "Epidemiolog Kesehatan",
    institution: "Dinas Kesehatan Kabupaten Sumenep",
    topics: ["Epidemiologi", "DBD", "Surveilans"],
    articleCount: 8,
    isVerified: true,
    avatarColor: "bg-indigo-600",
    bio: "Kepala Bidang Pencegahan dan Pengendalian Penyakit Dinkes Sumenep, fokus pada surveilans penyakit tropis.",
  },
];

export type ContributorFilter =
  | "Semua"
  | "Dokter Spesialis"
  | "Dokter Umum"
  | "Perawat"
  | "Psikolog"
  | "Tenaga Kesehatan";

export const CONTRIBUTOR_FILTERS: ContributorFilter[] = [
  "Semua",
  "Dokter Spesialis",
  "Dokter Umum",
  "Perawat",
  "Psikolog",
  "Tenaga Kesehatan",
];

export function getContributorsByRole(role: ContributorFilter): Contributor[] {
  if (role === "Semua") return contributors;
  return contributors.filter((c) => c.role === role);
}
