const nextConfig = {
  reactStrictMode: true,
  distDir: 'public/build',
  // webpack5: true,
  webpack: (config, options) => {
    config.plugins.push(
      new options.webpack.container.ModuleFederationPlugin({
        name: 'fe1',
        filename: 'remoteEntry.js',
        remoteType: 'var',
        exposes: {
          "./header": './src/components/Header',
        },
        shared: [
          { react: {
            eager: true,
            singleton: true,
            requiredVersion: false,
          }},
          { "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: false,
          } },
        ]
      })
    );
    return config
  }
}

module.exports = nextConfig
