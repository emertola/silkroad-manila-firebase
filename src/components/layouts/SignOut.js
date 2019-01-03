import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { withFirebase } from "../firebase";

const SignOut = ({ firebase }) => {
  return (
    <MenuItem onClick={firebase.doSignOut}>
      Sign out
    </MenuItem>
  );
};

export default withFirebase(SignOut);
