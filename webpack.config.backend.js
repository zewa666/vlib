/* global require, module, __dirname */

const path = require("path");
const fs = require("fs");

let nodeModules = {};

fs.readdirSync("node_modules")
  .filter((x) => {
    return [".bin"].indexOf(x) === -1;
  })
  .forEach((mod) => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

module.exports = [
{
  devtool: "inline-source-map",
  target: "node",
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
  entry: "./server.js",
  output: {
    filename: "server.js",
    path: path.join(__dirname, "/dist")
  },
  externals: nodeModules,
  stats: {
    colors: true,
    reasons: true
  }
}];
