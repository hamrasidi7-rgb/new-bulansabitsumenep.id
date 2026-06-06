// Satu-satunya sumber kebenaran untuk identitas portal.
// Digunakan oleh layout.tsx (metadata), Header, Footer, dan sitemap.

export const siteConfig = {
  name: "bulansabitsumenep",
  displayName: "Bulan Sabit Sumenep",
  seoTitle: "Portal Kesehatan dan Kemanusiaan",
  tagline: "Melayani Kemanusiaan, Menguatkan Kesehatan Masyarakat",
  description: "Melayani Kemanusiaan, Menguatkan Kesehatan Masyarakat",
  url: "https://bulansabitsumenep.id",
  ogImage: "/og.jpg",
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
