// next.config.js (or next.config.mjs)
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Only run when ANALYZE=true
});

export default withBundleAnalyzer({
  reactStrictMode: true,
  productionBrowserSourceMaps: true, // Lets us map chunks to source files

  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // Optimize images + allow external domains
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: true,
            priority: 20,
          },
          common: {
            minChunks: 2,
            chunks: 'all',
            name: 'common',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }
    return config;
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
      {
        source: '/(.*)\\.(js|css|png|jpg|jpeg|gif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
});
