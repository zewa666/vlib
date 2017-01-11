import * as Redux from "redux";
import devToolsEnhancer from "remote-redux-devtools";

import {
  rootReducer,
  ActionCreators
} from "./store";

import {
  VLibRender,
  prerenderingDone  
} from "../lib/vlib";

import { content } from "./main";

let store = null;

export let model = {
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
      store.dispatch(ActionCreators.clickHandler());
    },
    "sayHelloToHandler": (e) => { 
      store.dispatch(ActionCreators.sayHelloToHandler(e.target.value));
    },
    "sayHelloTo": null
  }
};

let initialState = model;

if (window.__PRELOADED_STATE__) {
 initialState = Object.assign({}, window.__PRELOADED_STATE__, model);
}

store = Redux.createStore(rootReducer, initialState, devToolsEnhancer({ "realtime": true }));

function render() {
  const currentState = store.getState();

  VLibRender(content, currentState, "body", currentState.primary.mountId);
}

store.subscribe(render);

if (window.__PRELOADED_STATE__) {
  store.dispatch(prerenderingDone);
} else {
  render();
}
