/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ['i.scdn.co', 's1.ticketm.net']
  }, 
  experimental: {
    outputStandalone: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  }, 
}

export default nextConfig
