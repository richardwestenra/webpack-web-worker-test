const path = require('path');

module.exports = {
  // mode: 'development',
  mode: 'production',
  entry: './lib/worker-setup.js',
  output: {
    filename: 'worker-setup.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
  }
};