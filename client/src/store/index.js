import { createStore, applyMiddleware } from "redux";
import reducer from "./reducer";
import middleware from "./middleware";
import thunk from "redux-thunk";

const configureStore = initialState => {
  const store = createStore(reducer, initialState, middleware);
  return store;
};

export default configureStore;
