const webpack = require("webpack");
const glob = require("glob");
const path = require('path');
const fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = [
{
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-react-jsx']
        }
      }
    ]
  },
  entry: {
    vendor: ['diffhtml', 'redux'],
    vlib: './lib/vlib.js',
    app: glob.sync("./src/*.js")
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ],
  stats: { colors: true, reasons: true }
},
{
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-react-jsx']
        }
      }
    ]
  },
  entry: './server.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  externals: nodeModules
}];
