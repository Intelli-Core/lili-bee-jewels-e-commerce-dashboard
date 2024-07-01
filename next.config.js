/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d30vxck32ggp8b.cloudfront.net",
      },
    ],
  },
};

module.exports = nextConfig;
