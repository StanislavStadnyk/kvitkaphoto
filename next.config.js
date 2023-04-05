const nextConfig = {
  reactStrictMode: true,
  compress: true,
  swcMinify: true,
  images: {
    domains: [process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8)],
  },
};

module.exports = nextConfig;
