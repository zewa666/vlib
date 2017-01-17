/* global require, module, __dirname */

const webpack = require("webpack");
const glob = require("glob");
const path = require("path");

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== "string") {
    return false;
  }

  return userRequest.indexOf("node_modules") >= 0;
}

module.exports = {
  devtool: "source-map",
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
  entry: {
    vendor: ["diffhtml", "redux", "object.entries"],
    vlib: "./lib/vlib.js",
    app: glob.sync("./src/*.js")
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "/dist")
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js",
      minChunks: (module) => {
        return isExternal(module);
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    })
  ],
  stats: {
    colors: true,
    reasons: true
  }
};
