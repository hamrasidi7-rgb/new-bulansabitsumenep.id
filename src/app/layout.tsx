import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Lora } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";

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

export const metadata: Metadata = {
  title: "Bulan Sabit Sumenep — Kesehatan & Kemanusiaan",
  description:
    "Portal berita kesehatan dan aksi kemanusiaan PMI Sumenep, Madura. Divalidasi dokter dan tenaga kesehatan.",
  openGraph: {
    title: "Bulan Sabit Sumenep",
    description: "Kesehatan & Kemanusiaan untuk Masyarakat Sumenep",
    locale: "id_ID",
    type: "website",
  },
};

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
        <Footer />
      </body>
    </html>
  );
}
