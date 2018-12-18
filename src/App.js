import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import SignIn from "./components/authentication/SignIn";
import TestFB from './components/TestFB'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <Switch>
            <Route path="/test" component={TestFB} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/login" component={SignIn} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
