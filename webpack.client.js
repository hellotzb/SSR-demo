const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.js');

const clientConfig = {
  entry: './src/client/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public'),
  },
};

module.exports = merge(commonConfig, clientConfig);
