// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'i.pinimg.com',
      'raw.githubusercontent.com',
      'img.shields.io',
      'user-images.githubusercontent.com',
      'navarasu.com'
    ],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['react-icons', 'lodash'],
  },

  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },

  compress: true,
  poweredByHeader: false,
  generateEtags: false,

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
