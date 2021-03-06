/* global require, global */
const fs = require("fs");
const entries = require("object.entries");

if (!Object.entries) {
    entries.shim();
}

const jsdom = require("jsdom");

global.document = jsdom.jsdom();
global.window = document.defaultView;


const App = require("./src/main");
const Demo = require("./src/demo");
const appDom = App.content(Demo.model);

Demo.model.isPrerendered = true;

let html = fs.readFileSync("demo.html", "utf8")
  .replace("// [prerendered model]", `window.__PRELOADED_STATE__ = ${JSON.stringify(Demo.model)};`)
  .replace("<!-- prerendered ui -->", appDom.outerHTML);

// a little web server
const express = require("express");
const server = express();

server.use("/dist", express.static("dist"));

server.get("/", (req, res) => {
  res.send(html);
});

console.log("Server started");  // eslint-disable-line
server.listen(8081);
