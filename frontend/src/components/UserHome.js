import { CssBaseline, Typography, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { isAuthenticated, logout } from "../helper/API";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "black",
  },
}));

const UserHome = ({ children }) => {
  const classes = useStyles();
  const {name} = isAuthenticated();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            Welcome {name}
          </Typography>
          <Link to="/dashboard" className={classes.menuButton} color="inherit">
            Dashboard
          </Link>
          <Link to="/tests" className={classes.menuButton} color="inherit">
            Tests
          </Link>
          <Link to="#" className={classes.menuButton} color="inherit">
            Calendar
          </Link>
          <Link
            to="/"
            className={classes.menuButton}
            color="inherit"
            onClick={logout}>
            Logout
          </Link>
        </Toolbar>
      </AppBar>
      {children}
    </div>
  );
};

export default UserHome;
