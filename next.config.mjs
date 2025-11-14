/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',     // REQUIRED for AWS
  images: {
    unoptimized: true,      // Avoid sharp failures on Amplify
  },
  reactStrictMode: true,
};

export default nextConfig;
