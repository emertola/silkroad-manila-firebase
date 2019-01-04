import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import RequestLogItem from "./RequestLogItem";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  }
});

const reqArrayData = obj => {
  let reqArray = [];
  if (obj) {
    Object.keys(obj).map(key => {
      const id = key;
      obj[key].id = id;
      reqArray.push(obj[key]);
      return reqArray;
    });
  }
  return reqArray;
};

class RequestLog extends Component {
  render() {
    const { classes, user } = this.props;
    const { requests } = user;

    return (
      <div>
        <List className={classes.root}>
          {requests ? (
            reqArrayData(requests).map(item => (
              <RequestLogItem key={item.id} item={item} />
            ))
          ) : (
            <RequestLogItem />
          )}
        </List>
      </div>
    );
  }
}

RequestLog.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RequestLog);
