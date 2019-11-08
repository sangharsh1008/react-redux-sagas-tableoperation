import { deleteRowAction, insertRowSuccessAction } from "./tableAction";

import { handleActions } from "redux-actions";
import users from "./mockData";
import { createStore } from "redux";

type State = {
  selectRemainingRows: Array
};

export const initialState: State = {
  selectRemainingRows: []
};

export const selectRemaining = (state: State) => state.selectRemainingRows;

export default handleActions(
  {
    [String(deleteRowAction)]: (state, action) => {
      return {
        ...state,
        selectRemainingRows: null
      };
    },
    [String(insertRowSuccessAction)]: (state, action) => {
      return {
        ...state,
        selectRemainingRows: action.payload
      };
    }
  },
  initialState
);
