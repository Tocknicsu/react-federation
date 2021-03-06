const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  resolve: {
    modules: ['node_modules'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'ui',
      filename: 'remoteEntry.js',
      exposes: {
        './Widget': './src/Widget',
      },
      shared: [
        {
          react: { singleton: true },
          'react-dom': { singleton: true },
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
  ],
};
