import React, { Component } from "react";
import { withFirebase } from "../firebase";
import * as ROUTES from "../../routes";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import * as ROLES from "../../roles";

import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const SignUp = props => {
  return (
    <div>
      <SignUpForm />
    </div>
  );
};

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    backgroundColor: "#2196f3",
    "&:hover": {
      backgroundColor: "#1e88e5"
    },
    color: "#fff"
  }
});

const INITIAL_STATE = {
  email: "",
  password: "",
  passwordConf: "",
  firstName: "",
  lastName: "",
  mobile: "",
  position: "",
  isAdmin: false,
  credits: {
    vacation: 0,
    sick: 0
  },
  requests: [],
  error: null
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...INITIAL_STATE
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onInputChange = e => {
    const { name } = e.target;
    this.setState({
      [name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      mobile,
      position,
      email,
      password,
      isAdmin,
      credits,
      requests
    } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase Realtime Database
        return this.props.firebase.user(authUser.user.uid).set({
          firstName,
          lastName,
          mobile,
          position,
          email,
          isAdmin,
          roles,
          credits,
          requests
        });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROFILE);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { classes } = this.props;
    const {
      firstName,
      lastName,
      mobile,
      position,
      email,
      password,
      passwordConf,
      error
    } = this.state;

    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email
    );

    const isMobileNumValid = /^(09|\+639)\d{9}$/i.test(mobile);

    // if invalid, disable the submit button
    const isInvalid =
      password === "" ||
      passwordConf === "" ||
      password !== passwordConf ||
      !isEmailValid ||
      !isMobileNumValid;

    return (
      <main className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {error && <Typography color="error">{error.message}</Typography>}
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                onChange={this.onInputChange}
                value={firstName}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                onChange={this.onInputChange}
                value={lastName}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="mobile">Mobile Number</InputLabel>
              <Input
                id="mobile"
                name="mobile"
                onChange={this.onInputChange}
                value={mobile}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="position">Position</InputLabel>
              <Input
                id="position"
                name="position"
                onChange={this.onInputChange}
                value={position}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                onChange={this.onInputChange}
                value={email}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.onInputChange}
                value={password}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordConf">Confirm Password</InputLabel>
              <Input
                name="passwordConf"
                type="password"
                id="passwordConf"
                onChange={this.onInputChange}
                value={passwordConf}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={isInvalid}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUpFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

SignUpFormBase = withStyles(styles)(SignUpFormBase);

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUp;

export { SignUpForm };
