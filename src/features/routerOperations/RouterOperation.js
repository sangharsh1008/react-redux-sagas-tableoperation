import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { Test } from "./Test";

class RouterOperation extends React.Component<Props, State> {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/Test" component={Test} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RouterOperation;
