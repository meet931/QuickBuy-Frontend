/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "rukminim2.flixcart.com",
      },
      {
        protocol: "https",
        hostname: "*.cnet.com",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
    ],
    domains: ['localhost'],
  },
};

module.exports = nextConfig;
