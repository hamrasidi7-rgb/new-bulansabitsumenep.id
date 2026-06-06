import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Edukasi Kesehatan",
  description: `Panduan kesehatan praktis dari ${siteConfig.displayName}, ditulis dan divalidasi oleh dokter dan tenaga kesehatan berpengalaman di Sumenep dan kepulauan Madura.`,
  openGraph: {
    title: "Edukasi Kesehatan",
    description: `Panduan kesehatan praktis dari ${siteConfig.displayName}.`,
    type: "website",
    locale: "id_ID",
  },
};

export default function EdukasiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
