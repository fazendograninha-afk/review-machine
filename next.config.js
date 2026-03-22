/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3007', '*.vercel.app', '*.railway.app', '*.up.railway.app'],
    },
  },
}

module.exports = nextConfig
