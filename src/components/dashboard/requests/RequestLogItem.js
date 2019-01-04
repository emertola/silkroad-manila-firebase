import React from "react";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import LocalHotel from "@material-ui/icons/LocalHotel";

const capitalize = str => str[0].toUpperCase() + str.slice(1);

const RequestLogItem = props => {
  const { item } = props;

  if (item) {
    const avatar =
      item.type === "vacation" ? <EventAvailableIcon /> : <LocalHotel />;
    return (
      <ListItem>
        <Avatar>{avatar}</Avatar>
        <ListItemText
          primary={capitalize(item.type)}
          secondary={moment(item.dateSubmitted).format("MMM D, YYYY")}
        />
      </ListItem>
    );
  }
  return (
    <ListItem>
      <ListItemText primary="No requests made yet." />
    </ListItem>
  );
};

export default RequestLogItem;
