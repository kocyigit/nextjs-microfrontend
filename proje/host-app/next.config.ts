import { NextConfig } from 'next';
import webpack from 'webpack';

const config: NextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    if (!isServer) {
      config.plugins.push(
        new webpack.container.ModuleFederationPlugin({
          name: 'hostApp',
          remotes: {
            productsRemote: 'remote_products@http://localhost:3001/remoteEntry.js',  // Remote URL doğru olmalı
          },
          shared: {
            react: { singleton: true, eager: true },
            'react-dom': { singleton: true, eager: true },
            redux: { singleton: true },
            'react-redux': { singleton: true },
          },
        })
      );
    }

    return config;
  },
};

export default config;
