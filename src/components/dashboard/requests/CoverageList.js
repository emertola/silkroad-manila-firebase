import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = () => ({
  root: {
    flexGrow: 1
  },
  delete: {
    color: "#EF5350"
  }
});

const CoverageList = props => {
  const {
    classes,
    coverageArr,
    handleDeleteCoverage,
    handleEditCoverage
  } = props;

  // console.log(this.state)

  return coverageArr.map(coverage => (
    <div key={coverage.id}>
      <Divider />
      <ListItem>
        <Grid item md={12} container spacing={24} className={classes.root}>
          <Grid item md={5} xs={12}>
            <TextField
              id="date"
              label="Date"
              type="date"
              name="date"
              value={coverage.date}
              InputLabelProps={{
                shrink: true
              }}
              onChange={e =>
                handleEditCoverage(coverage.id, "date", e.target.value)
              }
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={coverage.wholeHalf < 1 ? true : false}
                  name="wholeHalf"
                  value={coverage.wholeHalf}
                  onChange={e => {
                    const half = e.target.checked ? 0.5 : 1;
                    handleEditCoverage(coverage.id, "wholeHalf", half);
                  }}
                />
              }
              label="Half-day"
            />
          </Grid>
          <Grid item md={1} xs={12}>
            <IconButton
              aria-label="Delete"
              onClick={() => handleDeleteCoverage(coverage.id)}
            >
              <DeleteIcon className={classes.delete} />
            </IconButton>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  ));
};

export default withStyles(styles)(CoverageList);
