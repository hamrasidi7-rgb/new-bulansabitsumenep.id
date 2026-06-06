import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontributor",
  description: `Kenali dokter dan tenaga kesehatan berpengalaman yang berkontribusi menulis dan memvalidasi konten di ${siteConfig.displayName} — portal kesehatan kemanusiaan PMI Sumenep.`,
  openGraph: {
    title: "Kontributor Dokter & Tenaga Kesehatan",
    description: `Tim medis dan tenaga kesehatan profesional di balik konten ${siteConfig.displayName}.`,
    type: "website",
    locale: "id_ID",
  },
};

export default function KontributorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
