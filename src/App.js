import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import * as ROUTES from "./routes";
import { withFirebase } from "./components/firebase";

import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/authentication/SignIn";
import SignUp from "./components/authentication/SignUp";
import TestFB from "./components/TestFB";

class App extends Component {
  constructor() {
    super();

    this.state = {
      authUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    console.log(this.state);
    return (
      <BrowserRouter>
        <div>
          <Navbar authUser={this.state.authUser} />
          <Switch>
            <Route path="/test" component={TestFB} />
            <Route path={ROUTES.PROFILE} component={Dashboard} />
            <Route path={ROUTES.SIGN_IN} component={SignIn} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default withFirebase(App);
