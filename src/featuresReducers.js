// @flow
import { combineReducers } from "redux";
import { path as tableReducerPath } from "./features/tableOperation/tableSelector";

import tableReducer from "./features/tableOperation/tableReducer";

const localize = path => path.replace(/^features\./, "");

export const reducerMap = {
  [localize(tableReducerPath)]: tableReducer
};

export default combineReducers(reducerMap);
