import { takeEvery } from "redux-saga/effects";
import { take, put, call, fork, select, all } from "redux-saga/effects";
import { insertRowAction, insertRowSuccessAction } from "./tableAction";
import { selectRemainingRows } from "./tableSelector";
import users from "./mockData";
import axios from "axios";

export const tableRowDisplayWatcher = function* tableRowDisplayPayloadProcessor() {
  yield takeEvery(insertRowAction, rowDisplay);
};

function* rowDisplay(action) {
  console.log(action, "action");

  const user = {
    id: 1
  };

  const ajaxHandlerGet = yield axios.post("http://localhost/API/index.php", {
    id: true
  });
  console.log(ajaxHandlerGet, "ajaxHandlerGet");
  //const response = await axios.post('http://demo0725191.mockable.io/post_data', { posted_data: 'example' });

  let response = ajaxHandlerGet.data;

  yield put(insertRowSuccessAction(response));
}
