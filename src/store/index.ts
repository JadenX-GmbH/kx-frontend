import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { ActionTypes, SET_TOKEN, SET_USER } from "./actions";
import { Store } from "../util/types";

let baseStore: Store = {
  token: "",
  user: null,
};

// try {
//   if (localStorage.getItem(config.storage_key)) {
//     baseStore = JSON.parse(localStorage.getItem(config.storage_key) as string);
//   }
// } catch (e) {}

// Redux implementation
function appReducer(state: Store = baseStore, action: ActionTypes) {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export default createStore(appReducer, applyMiddleware(thunk));
