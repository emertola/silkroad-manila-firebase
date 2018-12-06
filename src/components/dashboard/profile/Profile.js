import React from "react";
import PropTypes from "prop-types";
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
  fab: {
    marginTop: 20,
    width: "100%"
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

const Profile = props => {
  const { classes } = props;
  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Toolbar className={classes.tool}>
            <Face className={classes.iconProfile} />
            <Typography variant="headline" className={classes.typo}>
              Erwin Mertola
              <div className={classes.sub}>emertola@dummy.com</div>
            </Typography>
          </Toolbar>
          <Toolbar className={classes.details}>
            <Typography variant="body2">
              <Assignment className={classes.icon} /> QA Specialist
            </Typography>
          </Toolbar>
          <Toolbar className={classes.details}>
            <Typography variant="body2">
              <PhoneIphone className={classes.icon} /> + 63 977 819 3682
            </Typography>
          </Toolbar>
          <Fab variant="extended" className={classes.fab}>
            Make a Request
          </Fab>
        </CardContent>
        <Divider variant="middle" />
        <CardActions>
          <Grid container spacing={24} justify="center">
            <Grid item md={4}>
              <Typography className={classes.ptoTitle}>Vacation</Typography>
              <Typography className={classes.ptoValue}>20</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography className={classes.ptoTitle}>Sick</Typography>
              <Typography className={classes.ptoValue}>12</Typography>
            </Grid>
            <Grid item md={4}>
              <Typography className={classes.ptoTitle}>Convertibles</Typography>
              <Typography className={classes.ptoValue}>10</Typography>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </div>
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
