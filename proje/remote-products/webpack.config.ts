import webpack from 'webpack';

export default async () => {
  return {
    experiments: {
      topLevelAwait: true, // Webpack ile top-level await desteğini etkinleştiriyoruz
      outputModule: true,  // Modüllerin dışa aktarılmasını sağlıyoruz
    },
    plugins: [
      new webpack.container.ModuleFederationPlugin({
        name: 'remote_products', // Remote uygulamanın adı
        filename: 'remoteEntry.js', // Remote dosyasının adı
        remotes: {
          hostApp: 'hostApp@http://localhost:3000/_next/static/chunks/remoteEntry.js', // Host uygulamasının bağlantısı
        },
        exposes: {
          './Products': './components/ProductLists', // Remote olarak dışa açılacak Products bileşeni
        },
        shared: {
          react: { singleton: true, eager: true },
          'react-dom': { singleton: true, eager: true },
          redux: { singleton: true },
          'react-redux': { singleton: true },
        },
      }),
    ],
  };
};
