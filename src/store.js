export const ACTION_UPDATE_JSXCOMPONENT = "UPDATE_JSXCOMPONENT";

export const rootReducer = (state = {}, action) => {  
  switch (action.type) {
    case ACTION_UPDATE_JSXCOMPONENT:
      return Object.assign({}, state, {
        "jsxComponent": Object.assign({}, state.jsxComponent, action.value) 
      });
    default: 
      return state;
  }
}