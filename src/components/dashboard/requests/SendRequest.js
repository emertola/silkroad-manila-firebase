import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import CoverageList from "./CoverageList";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Dialog from "@material-ui/core/Dialog";
import Toolbar from "@material-ui/core/Toolbar";

const styles = theme => ({
  root: {
    marginBottom: 20,
    flexGrow: 1
  },
  list: {
    flexGrow: 1
  },
  fab: {
    display: "flex",
    justifyContent: "flex-end"
  },
  appBar: {
    position: "relative",
    backgroundColor: "#2196f3"
  }
});

class SendRequest extends Component {
  constructor() {
    super();

    this.state = {
      reqType: "vacation",
      coverage: [],
      counter: 0,
      coverageCompleted: []
    };

    this.handleSelectRequest = this.handleSelectRequest.bind(this);
  }

  handleSelectRequest = e => {
    this.setState({
      reqType: e.target.value
    });
  };

  handleAddCoverage = () => {
    let { counter } = this.state;
    counter++;
    const covObj = {};
    covObj.id = counter;
    covObj.wholeHalf = 1;
    covObj.date = "";
    covObj.comp = 0;
    this.setState({
      coverage: [...this.state.coverage, covObj],
      counter: counter
    });
  };

  handleEditCoverage = (id, field, value) => {
    const { coverage } = this.state;
    const covIndex = coverage.findIndex(obj => obj.id === id);
    let updatedValue;
    if (field === "date") {
      value.length > 0
        ? (updatedValue = { ...coverage[covIndex], date: value, comp: 1 })
        : (updatedValue = { ...coverage[covIndex], date: value, comp: 0 });
    } else {
      updatedValue = { ...coverage[covIndex], wholeHalf: value };
    }

    const updatedCoverage = [
      ...coverage.slice(0, covIndex),
      updatedValue,
      ...coverage.slice(covIndex + 1)
    ];

    this.setState({
      coverage: updatedCoverage
    });
  };

  handleDeleteCoverage = id => {
    const { coverage } = this.state;
    const covIndex = coverage.findIndex(obj => obj.id === id);
    const updatedCoverage = [
      ...coverage.slice(0, covIndex),
      ...coverage.slice(covIndex + 1)
    ];
    this.setState({
      coverage: updatedCoverage
    });
  };

  handleSendRequest = (uid, firebase) => {
    const { coverage, reqType } = this.state;
    const newCoverage = coverage.map(cov => {
      delete cov.comp;
      delete cov.id;
      return cov;
    });
    const reqObject = {};
    reqObject.type = reqType;
    reqObject.coverage = newCoverage;

    const d = new Date()
    const twoDigits = digit => digit < 10 ? `0${digit}` : digit
    const currentDate = `${d.getFullYear()}-${twoDigits(d.getMonth() + 1)}-${twoDigits(d.getDate())}`

    // send to firebase Users API

    firebase.db
      .ref(`users/${uid}/requests`)
      .push()
      .set({
        status: 0,
        type: reqType,
        coverage: newCoverage,
        dateSubmitted: currentDate
      })
      .then(() => console.log("Request Sent"))
      .catch(error => console.log(error));
  };

  render() {
    const { classes, open, handleClose, user, firebase } = this.props;
    const { coverage, reqType } = this.state;
    const coverageCompleted =
      coverage.length > 0 ? coverage.map(cov => cov.comp) : [0];
    const coverageIsValid = coverageCompleted.reduce((a, b) => a * b);
    // console.log(this.props);

    return (
      <div className={classes.root}>
        <Dialog
          fullScreen
          scroll="body"
          open={open}
          onClose={() => handleClose}
          aria-labelledby="form-dialog-title"
        >
          <AppBar className={classes.appBar}>
            <Grid container>
              <Grid item xs={12}>
                <Toolbar>
                  <div style={{ flexGrow: 1 }}>
                    <IconButton
                      color="inherit"
                      onClick={() => {
                        handleClose();
                        this.setState({
                          reqType: "vacation",
                          coverage: [],
                          counter: 0
                        });
                      }}
                      aria-label="Close"
                    >
                      <CloseIcon />
                    </IconButton>
                  </div>

                  <Button
                    color="inherit"
                    onClick={() => {
                      this.handleSendRequest(user.uid, firebase);
                      handleClose();
                      this.setState({
                        reqType: "vacation",
                        coverage: [],
                        counter: 0
                      });
                    }}
                    disabled={coverageIsValid < 1 ? true : false}
                  >
                    send
                  </Button>
                </Toolbar>
              </Grid>
            </Grid>
          </AppBar>
          <DialogTitle id="form-dialog-title">Select Your Request</DialogTitle>
          <DialogContent>
            <Grid container spacing={24}>
              <Grid container item md={6} xs={12}>
                <Grid item md={6}>
                  <div className="middle">
                    <label>
                      <input
                        type="radio"
                        name="radio"
                        checked={reqType === "vacation"}
                        value="vacation"
                        onChange={this.handleSelectRequest}
                      />
                      <div className="vacation box">
                        <span>Vacation</span>
                      </div>
                    </label>

                    <label>
                      <input
                        type="radio"
                        name="radio"
                        checked={reqType === "sick"}
                        value="sick"
                        onChange={this.handleSelectRequest}
                      />
                      <div className="sick box">
                        <span>Sick</span>
                      </div>
                    </label>
                  </div>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid container item xs={12} spacing={24}>
                <List className={classes.list}>
                  {coverage.length < 1 ? (
                    <div>
                      <Divider />
                      <ListItem>
                        <Typography>No added coverage yet.</Typography>
                      </ListItem>
                    </div>
                  ) : (
                    <CoverageList
                      coverageArr={coverage}
                      handleDeleteCoverage={this.handleDeleteCoverage}
                      handleEditCoverage={this.handleEditCoverage}
                    />
                  )}
                </List>
              </Grid>
            </Grid>
            <Grid container className={classes.fab}>
              <Fab
                aria-label="Add"
                size="large"
                disabled={coverage.length === 10 ? true : false}
                onClick={this.handleAddCoverage}
              >
                <AddIcon />
              </Fab>
            </Grid>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(SendRequest);
