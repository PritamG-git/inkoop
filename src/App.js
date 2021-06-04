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
        {state.isLoggedIn ? (
          <Route path="/events" component={EventHome} />
        ) : (
          <Route exact path="/" component={AuthPage} />
        )}
      </Switch>
    </Router>
  );
}
