/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,  // disable Rust image optimizer
  },
};

module.exports = nextConfig;

