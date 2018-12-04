import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";

import Profile from './profile/Profile'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Grid container spacing={24} justify="center">
          <Grid item md={6} xs={12}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
