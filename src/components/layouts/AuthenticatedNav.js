import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import SignOut from './SignOut'

const AuthenticatedNav = props => {
    const {open, handleClose, handleMenu, anchorEl} = props;

  return (
    <div>
      <IconButton
        aria-owns={open ? "menu-appbar" : undefined}
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Acount</MenuItem>
        <SignOut />
      </Menu>
    </div>
  );
};

export default AuthenticatedNav;