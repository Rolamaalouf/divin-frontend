/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: 'https://www.divinlb.com',
        permanent: true, // 301 redirect (SEO-friendly)
      },
      {
        source: '/:path*',
        destination: 'https://www.divinlb.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
