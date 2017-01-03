"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/* global VLibRender, table, thead, th, tbody, tr, td, div, h2, p, br */
/** @jsx VLibCreate */

var renderTable = function renderTable(data) {
  return table({ "id": "my-table" }, thead(null, th(null, "Col A"), th(null, "Col B"), th(null, "Col C")), tbody.apply(undefined, [null].concat(_toConsumableArray(data.map(function (row) {
    return tr.apply(undefined, [null].concat(_toConsumableArray(row.map(function (col) {
      return td(null, col);
    }))));
  })))));
};

var jsx = VLibCreate(
  "div",
  null,
  VLibCreate(
    "h2",
    null,
    "Some JSX generated content."
  )
);

var content = function content() {
  return div({ "id": "main-content" }, h2({ "class": ["red", "blue"] }, "Hello World"), p(null, "Lorem ipsum dolor sit amet"), br(), p({ "style": { "textDecoration": "underline" } }, "Das ist ein Test"), renderTable([[1, 2, 3], [4, 5, 6], [7, 8, 9]]), p({}, true), p(null, Math.random(0, 1)), p(null, null), jsx);
};

VLibRender(content(), "body");
