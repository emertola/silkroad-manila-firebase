import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Profile from './profile/Profile'
import RequestLog from './requests/RequestLog'

const styles = {
    root: {
        marginTop: 20
    }
}

class Dashboard extends Component {
  render() {
      const {classes} = this.props
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid item md={3} xs={12}>
            <Profile />
          </Grid>
          <Grid item md={3} xs={12}>
            <RequestLog />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
