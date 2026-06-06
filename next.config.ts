import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
