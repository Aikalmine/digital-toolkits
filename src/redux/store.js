// store.js
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // If you plan to use asynchronous actions (e.g., API calls)
import rootReducer from "./reducers"; // Your root reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
