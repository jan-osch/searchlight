const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [
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
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),

    new HtmlWebpackPlugin({
      template: 'src/resources/index.html',
      favicon: 'src/resources/logo_56.png',
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
    })
  ],

  resolve: {
    extensions: [
      '.js',
      '.ts',
      '.tsx',
      '.json',
      '.scss',
      '*',
    ]
  },

  output: {
    path: path.resolve(__dirname, 'c_build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },

  entry: [
    './src/index.tsx'
  ]
};
