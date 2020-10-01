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
      name: 'app',
      shared: {
        react: { eager: true, singleton: true },
        'react-dom': { eager: true, singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: true,
    }),
  ],
};
