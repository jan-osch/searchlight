const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        enforce: 'pre'
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
      {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loaders: [
          'ts-loader'
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/resources/index.html'
    }),
  ],
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), 'build_c'),
    filename: 'index.js'
  },
  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json'
    ]
  },
  entry: [
    './src/index.tsx'
  ],
  devServer: {
    proxy: {
      '/api': 'http://localhost:4000'
    },
    historyApiFallback: true,
    hot: true,
  }
};
