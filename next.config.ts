import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache gambar yang sudah dioptimasi selama 30 hari
    // Tanpa ini default 60 detik → PageSpeed selalu proses ulang → LCP lambat
    minimumCacheTTL: 2592000,
    // AVIF & WebP jauh lebih kecil dari JPEG → download lebih cepat
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "img.youtube.com" },
      // Supabase Storage — untuk gambar artikel & galeri yang diupload admin
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
