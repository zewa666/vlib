import {
  ACTION_PRERENDER_DONE
} from "../lib/vlib";

export const ACTION_UPDATE_JSXCOMPONENT = "UPDATE_JSXCOMPONENT";

export const rootReducer = (state = {}, action) => {  
  switch (action.type) {
    case ACTION_UPDATE_JSXCOMPONENT:
      return Object.assign({}, state, {
        "jsxComponent": Object.assign({}, state.jsxComponent, action.value) 
      });
    case ACTION_PRERENDER_DONE:
      return Object.assign({}, state, action.value);
    default: 
      return state;
  }
}

export const ActionCreators = {
  clickHandler: () => {
    return {
      "type": ACTION_UPDATE_JSXCOMPONENT,
      "value": { "text": "foo" }
    }
  },
  sayHelloToHandler: (sayHelloTo) => {
    return {
      "type": ACTION_UPDATE_JSXCOMPONENT,
      "value": { sayHelloTo }
    }
  }
}
