const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.resolve('./src/index.js'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 8085,
    open: true,
    publicPath: '/',
    historyApiFallback: true,
    contentBase: './dist',
    proxy: {
      '/graphql': 'http://localhost:4000'
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Personal App',
      template: path.resolve('./src/index.html')
    }),
    new CleanWebpackPlugin()
  ],
  resolve: {
    symlinks: false
  }
};
