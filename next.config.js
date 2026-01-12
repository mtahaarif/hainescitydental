/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'hainescitydental.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  experimental: {
    optimizeCss: true,
  },
  // Enable gzip compression
  compress: true,
  // Optimize build output
  poweredByHeader: false,
  // Generate ETags for caching
  generateEtags: true,
  // Enable React strict mode for better development
  reactStrictMode: true,
}

module.exports = nextConfig
