import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import AuthPage from "./screens/Auth";
import EventHome from "./screens/EventHome";

import { Context } from "./state/mainContext";

export default function App() {
  const { state } = useContext(Context);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AuthPage} />
        <Route path="/events" component={EventHome} />
      </Switch>
    </Router>
  );
}
