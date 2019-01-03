import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import divBackgroundImage from "../../utils/images/shape-pattern.png";

const styles = {
  root: {
    marginTop: 20
  },
  home: {
    backgroundImage: `url(${divBackgroundImage})`,
    backgroundSize: "20%"
  }
};

const Home = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        <Grid item md={6} xs={12}>
          <h2>Home</h2>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Home);
