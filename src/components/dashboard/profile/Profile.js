import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Face from "@material-ui/icons/Face";
import Toolbar from "@material-ui/core/Toolbar";

const styles = {
  root: {
    flexGrow: 1
  },
  card: {
    minWidth: 100,
    marginTop: 20
  },
  typo: { marginLeft: "10px", flexGrow: 6, float: "left" },
  sub: {fontSize: "14px"},
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  icon: {
    fontSize: "90px",
    color: "#616161",
    float: "left"
  }
};

const Profile = props => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Toolbar>
            <Face className={classes.icon} />
            <Typography variant="h5" className={classes.typo}>
              Erwin Mertola
              <div className={classes.sub}><em>emertola@dummy.com</em></div>
            </Typography>
          </Toolbar>
        </CardContent>
        <CardActions>Action</CardActions>
      </Card>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
