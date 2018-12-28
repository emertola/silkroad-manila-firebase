import React, { Component } from "react";
import { withFirebase } from "../firebase";
import {withAuthorization} from '../session'
import PropTypes from "prop-types";
import { compose } from "recompose";
import { Link, withRouter } from "react-router-dom";
import * as ROUTES from "../../routes";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

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
  error: null
};

class SignInFormBase extends Component {
  constructor() {
    super();

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
    const { email, password } = this.state;
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROFILE);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { classes } = this.props;
    const { email, password, error } = this.state;
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email
    );

    // if invalid, disable the submit button
    const isInvalid = password === "" || !isEmailValid;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && <Typography color="error">{error.message}</Typography>}
          <form className={classes.form} onSubmit={this.onSubmit}>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={isInvalid}
            >
              Sign in
            </Button>
          </form>
        </Paper>
        <Typography variant="body1">
          Not registered yet? <Link to={ROUTES.SIGN_UP}>Sign up here!</Link>
        </Typography>
        <Typography variant="body1">
          <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
        </Typography>
      </main>
    );
  }
}

SignInFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const SignIn = props => {
  return <SignInForm />
}

SignInFormBase = withStyles(styles)(SignInFormBase);

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SignIn);
// export default SignIn

export { SignInForm };
