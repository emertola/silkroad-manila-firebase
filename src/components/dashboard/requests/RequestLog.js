import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import LocalHotel from "@material-ui/icons/LocalHotel";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const RequestLog = props => {
  const { classes } = props;
  return (
    <div>
      <List className={classes.root}>
        <ListItem>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText primary="Vacation" secondary="Jan 9, 2014" />
        </ListItem>
        <ListItem>
          <Avatar>
            <LocalHotel />
          </Avatar>
          <ListItemText primary="Sick" secondary="Jan 7, 2014" />
        </ListItem>
        <ListItem>
          <Avatar>
            <BeachAccessIcon />
          </Avatar>
          <ListItemText primary="Vacation" secondary="July 20, 2014" />
        </ListItem>
      </List>
    </div>
  );
};

RequestLog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestLog);
