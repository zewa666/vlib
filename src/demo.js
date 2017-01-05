import * as Redux from "redux";

import {
  ACTION_UPDATE_JSXCOMPONENT,
  rootReducer
} from "./store";

import {
  VLibRender  
} from "../lib/vlib";

import { content } from "./main";

let store = null;
let model = {
  "primary": {
    "mountId": "main-content",
    "greetingHeader": "Hello World !!!",
    "styles": {"textDecoration": "underline"},
    "tableData": [ 
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ],
    "random": Math.random(0, 1)
  },
  "jsxComponent": {
    "text": "Jaddaa jaddaa jadaa",
    "clickHandler": () => { 
      store.dispatch({
        "type": ACTION_UPDATE_JSXCOMPONENT,
        "value": { "text": "foo" }
      });
    }
  }
};

store = Redux.createStore(rootReducer, model);

function render() {
  const currentState = store.getState();

  VLibRender(content, currentState, "body", currentState.primary.mountId);
}

store.subscribe(render);
render();



