import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../routes";
import MenuItem from "@material-ui/core/MenuItem";
import { withFirebase } from "../firebase";

const SignOut = ({ firebase }) => {
  return (
    <MenuItem onClick={firebase.doSignOut} component={Link} to={ROUTES.SIGN_IN}>
      Sign out
    </MenuItem>
  );
};

export default withFirebase(SignOut);
