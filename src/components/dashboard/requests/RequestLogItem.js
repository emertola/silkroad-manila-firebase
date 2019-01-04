import React from "react";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import LocalHotel from "@material-ui/icons/LocalHotel";
import Chip from "@material-ui/core/Chip";

const styles = {
  chip: {
    border: "1px solid none",
    width: '80px'
  },
  chipApproved: {
    border: "1px solid transparent",
    backgroundColor: '#DCEDC8',
    color: '#33691E',
    fontWeight: 500,
    width: '80px'
  },
  chipDenied: {
    border: "1px solid transparent",
    backgroundColor: '#FFEBEE',
    color: '#B71C1C',
    fontWeight: 500,
    width: '80px'
  }
};

const capitalize = str => str[0].toUpperCase() + str.slice(1);
const itemStatus = stat =>
  stat > 0
    ? stat > 1
      ? { status: "Denied", style: styles.chipDenied }
      : { status: "Approved", style: styles.chipApproved }
    : { status: "Pending", style: styles.chip };

const RequestLogItem = props => {
  const { item } = props;

  if (item) {
    const avatar =
      item.type === "vacation" ? <EventAvailableIcon /> : <LocalHotel />;
    return (
      <ListItem button>
        <Avatar>{avatar}</Avatar>
        <ListItemText
          primary={capitalize(item.type)}
          secondary={moment(item.dateSubmitted).format("MMM D, YYYY")}
        />
        <Chip
          style={itemStatus(item.status).style}
          label={itemStatus(item.status).status}
          variant="outlined"
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
