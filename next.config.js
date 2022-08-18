/** @type {import('next').NextConfig} */
const path = require('path');

module.exports = {
  reactStrictMode: true,
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils'],
  },
  env: {
    APP_URL: process.env.APP_URL,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  webpack: (
    config,
    { buildId, dev, isServer, inlineFontLimit, assetPrefix = '' }
  ) => {
    const serverPrefix = isServer ? '../' : '';
    const filenamePattern = '[name].[hash:8].[ext]';
    const limit = inlineFontLimit || 8192;
    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      use: [
        {
            loader: '@svgr/webpack',
            options: {
              limit,
              fallback: 'file-loader',
              publicPath: `${assetPrefix}/_next/static/media/`,
              outputPath: `${serverPrefix ? '../' : ''}static/media/`,
              name: filenamePattern,
            },
          },
        {
          loader: 'file-loader',
          options: {
            publicPath: `${assetPrefix}/_next/static/media/`,
            outputPath: `${serverPrefix}static/media/`,
          },
        },
      ],
    });

    return config;
  },
};
