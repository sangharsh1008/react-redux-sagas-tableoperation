import { createAction } from "redux-actions";

export const deleteRowType = `DELETE_ROW`;
export const deleteRowAction = createAction(deleteRowType);

export const insertRowType = `INSERT_ROW`;
export const insertRowAction = createAction(insertRowType);

export const insertRowSuccessType = `INSERT_ROW_Success`;
export const insertRowSuccessAction = createAction(insertRowSuccessType);
