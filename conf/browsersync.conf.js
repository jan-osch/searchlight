const conf = require('./gulp.conf');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const httpProxyMiddleware = require('http-proxy-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConf = require('./webpack.conf');
const webpackBundler = webpack(webpackConf);

const apiURl = `http://localhost:${process.env.API_PORT}`; //TODO fix

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [
        httpProxyMiddleware('/api', {target: apiURl}),

        webpackDevMiddleware(webpackBundler, {
          // IMPORTANT: dev middleware can't access config, so we should
          // provide publicPath by ourselves
          publicPath: webpackConf.output.publicPath,

          // Quiet verbose output in console
          quiet: true
        }),

        // bundler should be the same as above
        webpackHotMiddleware(webpackBundler)
      ]
    },
    open: false
  };
};
