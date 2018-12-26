import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./routes";
import { withAuthentication } from "./components/session";

import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import PasswordForget from "./components/PasswordForget";
import PasswordChange from "./components/PasswordChange";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Switch>
          <Route path={ROUTES.PROFILE} component={Dashboard} />
          <Route path={ROUTES.SIGN_IN} component={SignIn} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
          <Route path={ROUTES.PASSWORD_CHANGE} component={PasswordChange} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default withAuthentication(App);
