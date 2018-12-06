import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import AuthenticatedNav from "./AuthenticatedNav";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  navBackColor: {
    backgroundColor: "#2196f3"
  }
};

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      auth: true,
      anchorEl: null
    };

    this.handleMenu = this.handleMenu.bind(this);
  }

  //   handleChange = event => {
  //     this.setState({ auth: event.target.checked });
  //   };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.navBackColor}>
          <Grid container justify="center">
            <Grid item md={6} xs={12}>
              <Toolbar>
                <Typography
                  variant="h6"
                  color="inherit"
                  className={classes.grow}
                >
                  Silkroad
                </Typography>
                {auth && (
                  <AuthenticatedNav
                    open={open}
                    handleMenu={this.handleMenu}
                    handleClose={this.handleClose}
                    anchorEl={anchorEl}
                  />
                )}
              </Toolbar>
            </Grid>
          </Grid>
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Navbar);
