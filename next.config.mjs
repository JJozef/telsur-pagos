/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sucursalvirtual.telsur.cl'
      }
    ]
  }
}

export default nextConfig
