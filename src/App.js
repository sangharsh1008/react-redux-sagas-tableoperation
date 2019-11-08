import React from "react";
import "./App.css";
import TableContainer from "./features/tableOperation/TableContainer";
import RouterOperation from "./features/routerOperations/RouterOperation";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import handleActions from "./features/tableOperation/tableReducer";
import { createStore, applyMiddleware } from "redux";
import { tableRowDisplayWatcher } from "./features/tableOperation/tableSagas";
import createSagaMiddleware from "redux-saga";

const sagaMidleware = createSagaMiddleware();
const store = createStore(handleActions, applyMiddleware(sagaMidleware));
sagaMidleware.run(tableRowDisplayWatcher);
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Provider store={store}>
          <TableContainer />
          <RouterOperation />
        </Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
