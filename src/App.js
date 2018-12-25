import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./routes";
import { withAuthentication } from "./components/session";

import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import TestFB from "./components/TestFB";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path="/test" component={TestFB} />
          <Route path={ROUTES.PROFILE} component={Dashboard} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
