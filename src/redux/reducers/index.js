// reducers/index.js
import { combineReducers } from "redux";
import someReducer from "./someReducer";
// import other reducers as needed

const rootReducer = combineReducers({
  someReducer,
  // add other reducers here
});

export default rootReducer;
