/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, 
  images: {
    domains: ['i.scdn.co', 's1.ticketm.net']
  }, 
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    })

    return config
  }, 
  typescript: {

    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.

    ignoreBuildErrors: true,
  },
}

export default nextConfig
