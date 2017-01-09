const webpackConfig = require('./webpack.config.js');
const path = require("path");

module.exports = function(config) {
  config.set({

    // Add any browsers here
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],

    // The entry point for our test suite
    basePath: './',
    autoWatch: false,
    files: ['webpack.tests.js'],
    preprocessors: {
      // Run this through webpack, and enable inline sourcemaps
      'webpack.tests.js': ['webpack', 'sourcemap'],
    },

    webpack: webpackConfig[2],
    client: {
      // log console output in our test console
      captureConsole: true
    },

    reporters: ['dots'],
    singleRun: true, // exit after tests have completed

    webpackMiddleware: {
      noInfo: true
    },

    // Webpack takes a little while to compile -- this manifests as a really
    // long load time while webpack blocks on serving the request.
    browserNoActivityTimeout: 60000, // 60 seconds

  });
};