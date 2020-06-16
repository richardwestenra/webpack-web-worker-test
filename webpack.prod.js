const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: 'Webpack web worker test',
    }),
  ],
  output: {
    filename: 'main.js',
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
  },
};