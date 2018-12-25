import React, { Component } from "react";
import { withFirebase } from "../firebase";
import PropTypes from "prop-types";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
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
  error: null
};

class PasswordForgetFormBase extends Component {
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
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.PROFILE);
      })
      .catch(error => this.setState({ error }));
  };

  render() {
    const { classes } = this.props;
    const { email, error } = this.state;
    const isEmailValid = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
      email
    );

    // if invalid, disable the submit button
    const isInvalid = !isEmailValid;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Forgot Password?
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
                autoFocus
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              disabled={isInvalid}
            >
              Reset My Password
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

PasswordForgetFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const PasswordForget = props => {
  return (
    <div>
      <PasswordForgetForm />
    </div>
  );
};

PasswordForgetFormBase = withStyles(styles)(PasswordForgetFormBase);

const PasswordForgetForm = compose(
  withRouter,
  withFirebase
)(PasswordForgetFormBase);

export default PasswordForget;

export { PasswordForgetForm };
