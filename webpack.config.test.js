/* global require, module, __dirname */

const path = require("path");

module.exports = [{
  devtool: "inline-source-map",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        query: {
          presets: ["es2015"],
          plugins: ["transform-react-jsx"]
        }
      }
    ]
  },
  entry: "./webpack.tests.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "test.js"
  }
}];
