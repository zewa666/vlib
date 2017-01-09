import "babel-polyfill";

// this regex matches all *.spec.js files in the folders src and lib
var context = require.context('.', true, /(src|lib).+\.spec.js$/);
context.keys().forEach(context);