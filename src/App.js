import React from "react";
import { Container } from "react-bootstrap";
import Header from "./Components/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Pages/Home";
import New from "./Pages/New";
import Edit from "./Pages/Edit";

//    REDUX
import store from "./store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Container className="mt-5">
          <Switch>
            <Route path="/" exact={true}>
              <Home />
            </Route>

            <Route path="/nuevo" exact={true}>
              <New />
            </Route>

            <Route path="/:id/editar" exact={true}>
              <Edit />
            </Route>

            <Route path="*">
              <Home />
            </Route>
          </Switch>
        </Container>
      </Router>
    </Provider>
  );
}