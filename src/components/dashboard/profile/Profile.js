import React, { Component } from "react";
import PropTypes from "prop-types";
import { withFirebase } from "../../firebase";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Face from "@material-ui/icons/Face";
import PhoneIphone from "@material-ui/icons/PhoneIphone";
import Assignment from "@material-ui/icons/Assignment";
import Toolbar from "@material-ui/core/Toolbar";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import SendRequest from "../requests/SendRequest";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  tool: {
    padding: 0,
    marginBottom: 40
  },
  card: {
    minWidth: 100
  },
  typo: { marginLeft: "10px", flexGrow: 6, float: "left" },
  sub: { fontSize: "12px" },
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
    color: "#616161",
    float: "left"
  },
  iconProfile: {
    fontSize: 80
  },
  details: {
    minHeight: 30
  },
  // fab: {
  //   marginTop: 20,
  //   width: "100%",
  //   backgroundColor: "#26A69A",
  //   color: "#fff",
  //   "&:hover": {
  //     backgroundColor: "#009688"
  //   }
  // },
  fab: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "transparent",
    border: "1px solid #26A69A",
    boxShadow: "none",
    color: "#26A69A",
    "&:hover": {
      backgroundColor: "#E0F2F1"
    }
  },
  ptoTitle: {
    fontSize: 14,
    color: "hsl(214, 7%, 47%)"
  },
  ptoValue: {
    fontSize: 20,
    fontWeight: 500
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Profile extends Component {
  constructor() {
    super();

    this.state = {
      open: false
    };
  }

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { classes, user, firebase } = this.props;
    const { vacation, sick } = user.credits;
    const { open } = this.state;
    const greaterThanFive = num => (num >= 5 ? 5 : num);
    const getConvertibles = greaterThanFive(vacation) + greaterThanFive(sick);

    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Toolbar className={classes.tool}>
              <Face className={classes.iconProfile} />
              <Typography variant="headline" className={classes.typo}>
                {user.firstName} {user.lastName}
                <div className={classes.sub}>{user.email}</div>
              </Typography>
            </Toolbar>
            <Toolbar className={classes.details}>
              <Typography variant="body2">
                <Assignment className={classes.icon} /> {user.position}
              </Typography>
            </Toolbar>
            <Toolbar className={classes.details}>
              <Typography variant="body2">
                <PhoneIphone className={classes.icon} /> {user.mobile}
              </Typography>
            </Toolbar>
            <Fab
              size="small"
              variant="extended"
              className={classes.fab}
              onClick={this.handleOpen}
            >
              Make a Request
            </Fab>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Grid container spacing={24} justify="center">
              <Grid item md={4}>
                <Typography className={classes.ptoTitle}>Vacation</Typography>
                <Typography className={classes.ptoValue}>
                  {user.credits.vacation}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography className={classes.ptoTitle}>Sick</Typography>
                <Typography className={classes.ptoValue}>
                  {user.credits.sick}
                </Typography>
              </Grid>
              <Grid item md={4}>
                <Typography className={classes.ptoTitle}>
                  Convertibles
                </Typography>
                <Typography className={classes.ptoValue}>
                  {getConvertibles}
                </Typography>
              </Grid>
            </Grid>
          </CardActions>
        </Card>

        <SendRequest
          open={open}
          handleClose={this.handleClose}
          handleOpen={this.handleOpen}
          user={user}
          firebase={firebase}
        />
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withFirebase(withStyles(styles)(Profile));
