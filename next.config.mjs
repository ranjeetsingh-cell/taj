/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
   images: {
    domains: ["manage.tajwaycabs.com"],
  },
  async headers() {
    return [
      {
        source: "/:path*{jpg,jpeg,png,svg,gif,webp,ico}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
