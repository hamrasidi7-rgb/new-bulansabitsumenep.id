import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
// Footer hanya dirender di (public)/layout.jsx — bukan di sini,
// agar tidak double saat rute (public) diakses.

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "optional",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "fallback",
});

// ── Metadata global ────────────────────────────────────────────────────────
// Setiap halaman dapat menimpa title/description via generateMetadata.
// Template "%s — Bulan Sabit Sumenep" otomatis ditambahkan pada title per halaman.

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.seoTitle,
    template: `%s | ${siteConfig.displayName}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],

  openGraph: {
    title: siteConfig.seoTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.displayName,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seoTitle,
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.seoTitle,
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
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] font-sans"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
