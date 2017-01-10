/* global require */

import "babel-polyfill";

// this regex matches all *.spec.js files in the folders src and lib
const context = require.context(".", true, /(src|lib).+\.spec.js$/);

context.keys().forEach(context);
