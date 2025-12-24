/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization for production builds
    // Falls back to unoptimized for static exports
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Temporarily unoptimized for development - remove for production
    unoptimized: true,
  },
}

export default nextConfig
