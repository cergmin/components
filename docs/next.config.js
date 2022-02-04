const { resolve } = require('path');

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  env: {
    ROOT_PATH: resolve(__dirname),
  },
  redirects: async () => {
    return [
      {
        source: '/docs',
        destination: '/docs/getting-started/introduction',
        permanent: true,
      },
    ];
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

module.exports = nextConfig;
