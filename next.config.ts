import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Batasi ukuran maksimum agar tidak generate w=3840 (Retina 4K)
    // Portal berita tidak butuh gambar lebih dari 1920px
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Placeholder untuk seed/dummy data
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      // Thumbnail otomatis YouTube
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
