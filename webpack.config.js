const webpack = require("webpack");
const glob = require("glob");

console.log(glob.sync("./src/*.js"));

module.exports = {
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
};
