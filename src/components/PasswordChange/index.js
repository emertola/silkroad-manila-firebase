import React, { Component } from "react";
import { withFirebase } from "../firebase";
import { withAuthorization } from "../session";
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
  password: "",
  passwordConf: "",
  error: null
};

class PasswordChangeFormBase extends Component {
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
    const { password, passwordConf, error } = this.state;

    // if invalid, disable the submit button
    const isInvalid =
      password === "" || passwordConf === "" || password !== passwordConf;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Password Change
          </Typography>
          {error && <Typography color="error">{error.message}</Typography>}
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">New Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                onChange={this.onInputChange}
                value={password}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="passwordConf">
                Confirm New Password
              </InputLabel>
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
              Reset My Password
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

PasswordChangeFormBase.propTypes = {
  classes: PropTypes.object.isRequired
};

const PasswordChange = props => {
  return (
    <div>
      <PasswordChangeForm />
    </div>
  );
};

PasswordChangeFormBase = withStyles(styles)(PasswordChangeFormBase);

const PasswordChangeForm = compose(
  withRouter,
  withFirebase
)(PasswordChangeFormBase);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(PasswordChange);

export { PasswordChangeForm };
