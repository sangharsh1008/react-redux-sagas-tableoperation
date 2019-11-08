import globalize from "../../utils/globalize";
import * as local from "./tableReducer";

export const path = "selectRemaining";

export const selectRemainingRows = globalize(local.selectRemaining, path);
