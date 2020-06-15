const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/worker-setup.js',
  output: {
    filename: 'worker-setup.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'lib'),
  }
};