const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8)]
  },
  rewrites: async () => {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap'
      },
      {
        source: '/robots.txt',
        destination: '/api/robots'
      }
    ]
  }
}

module.exports = nextConfig
