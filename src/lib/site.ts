// Satu-satunya sumber kebenaran untuk identitas portal.
// Digunakan oleh layout.tsx (metadata), Header, Footer, dan sitemap.

export const siteConfig = {
  name: "bulansabitsumenep",
  displayName: "Bulan Sabit Sumenep",
  seoTitle: "Portal Kesehatan dan Kemanusiaan",
  tagline: "Melayani Kemanusiaan, Menguatkan Kesehatan Masyarakat",
  description:
    "Portal resmi Bulan Sabit Sumenep yang menyajikan informasi kesehatan, kegiatan kemanusiaan, relawan, edukasi masyarakat, tanggap bencana, dan pelayanan sosial untuk masyarakat Kabupaten Sumenep dan Madura.",
  // TODO: ganti URL ini jika domain sendiri sudah aktif (mis. https://bulansabitsumenep.id)
  url: "https://bulansabitsumenepid.vercel.app",
  ogImage: "/og-default.jpg", // Buat file ini di public/og-default.jpg (ideal: 1200×630 px)
  keywords: [
    "kesehatan",
    "kemanusiaan",
    "relawan",
    "edukasi kesehatan",
    "tanggap bencana",
    "pelayanan sosial",
    "Sumenep",
    "Madura",
    "PMI Sumenep",
    "donor darah",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
