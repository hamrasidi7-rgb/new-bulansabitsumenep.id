import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
// Footer hanya dirender di (public)/layout.jsx — bukan di sini,
// agar tidak double saat rute (public) diakses.

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

// ── Metadata global ────────────────────────────────────────────────────────
// Setiap halaman dapat menimpa title/description via generateMetadata.
// Template "%s — Bulan Sabit Sumenep" otomatis ditambahkan pada title per halaman.

export const metadata: Metadata = {
  // TODO: ganti URL ini jika domain sendiri sudah aktif
  metadataBase: new URL(siteConfig.url),

  title: {
    default: `${siteConfig.displayName} — ${siteConfig.seoTitle}`,
    template: `%s — ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],

  openGraph: {
    siteName: siteConfig.displayName,
    title: `${siteConfig.displayName} — ${siteConfig.seoTitle}`,
    description: siteConfig.description,
    locale: "id_ID",
    type: "website",
    images: [
      {
        // TODO: buat file public/og-default.jpg (ukuran ideal 1200×630 px)
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.displayName} — ${siteConfig.seoTitle}`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.displayName} — ${siteConfig.seoTitle}`,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
};

// ── Root Layout ────────────────────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans">
        {children}
      </body>
    </html>
  );
}
