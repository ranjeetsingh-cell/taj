/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
    domains: ["manage.tajwaycabs.com"],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
             value: "public, max-age=2592000, immutable"  
          }
        ]
      }
    ];
  }
};

export default nextConfig;
