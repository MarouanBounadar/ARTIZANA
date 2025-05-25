/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Uncomment the next line to enable static exports
  // output: 'export',
  
  // Uncomment for Docker/containerized environments
  // output: 'standalone',
}

export default nextConfig
