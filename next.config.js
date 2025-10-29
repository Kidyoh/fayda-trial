/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org", "randomuser.me"],
  },
};

module.exports = nextConfig;
