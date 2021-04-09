import React from "react";
import PropTypes from "prop-types";
import {
  withStyles,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  chip: {
    margin: theme.spacing.unit
  }
});
const theme = createMuiTheme({
  overrides: {
    MuiChip: {
      clickableColorSecondary: {
        "&:hover, &:focus": {
          backgroundColor: "red"
        },
        "&:active": {
          backgroundColor: "green"
        }
      }
    }
  }
});

function Chips(props) {
  const { classes } = props;
  return (
    <Chip
        label="Secondary Clickable Chip"
        clickable
        className={classes.chip}
        color="secondary"
    />
);
}

Chips.propTypes = {
  classes: PropTypes.object.isRequired
};

const StyledChips = withStyles(styles)(Chips);
const Demo = () => (
  <MuiThemeProvider theme={theme}>
    <StyledChips />
  </MuiThemeProvider>
);
export default Demo;
