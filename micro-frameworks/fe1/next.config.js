const { NextFederationPlugin } = require('@module-federation/nextjs-mf');


const nextConfig = {
  reactStrictMode: true,
  // distDir: 'public/build',
  // webpack5: true,
  webpack: (config, options) => {
    const { isServer } = options;
    config.plugins.push(
      new NextFederationPlugin({
        name: 'next2',
        remotes: {
          next1: `fe1@http://localhost:3001/_next/static/${
            isServer ? 'ssr' : 'chunks'
          }/remoteEntry.js`,
        },
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './header': './src/components/Header',
          // './checkout': './pages/checkout',
        },
        shared: {
          // whatever else
        },
      })
    );
    return config
  }
}

module.exports = nextConfig

// require('@module-federation/nextjs-mf/src/include-defaults');

