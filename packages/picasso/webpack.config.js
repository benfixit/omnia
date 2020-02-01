const path = require('path');

const distPath = path.resolve(__dirname);

const outputName = 'picasso.min.js';

module.exports = {
  entry: path.resolve('./index.js'),
  mode: 'development',
  output: {
    path: distPath,
    filename: outputName,
    libraryTarget: 'umd'
  },
  devtool: 'inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    // Don't bundle styled-components, react or react-dom
    'styled-components': {
      commonjs: 'styled-components',
      commonjs2: 'styled-components',
      amd: 'styled-components'
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'react'
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'ReactDOM',
      root: 'ReactDOM'
    },
    'react-router-dom': {
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
      amd: 'ReactRouterDOM',
      root: 'ReactRouterDOM'
    }
  }
};
