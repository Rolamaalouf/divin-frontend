/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'divinlb.com',
          },
        ],
        destination: 'https://www.divinlb.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

//** @type {import('next').NextConfig} */ const nextConfig = {}; export default nextConfig//