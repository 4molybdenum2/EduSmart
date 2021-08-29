import { CssBaseline, Typography, AppBar, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Dashboard from "./UserHome/Dashboard";
import Tests from "./UserHome/Tests";
import AddCourse from "./UserHome/AddCourse";

const useStyles = makeStyles((theme) => ({
  root: { flexGrow: 1 },
  menuButton: {
    marginRight: theme.spacing(2),
    textDecoration: "none",
    color: "black",
  }
}));

const UserHome = ({ screen }) => {
  const classes = useStyles();
  const renderComponent = (comp) => {
    switch (comp) {
      case "dashboard":
        return <Dashboard />;
      case "tests":
        return <Tests />;
      case "addCourse":
        return <AddCourse />
      default:
        return null;
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            Welcome 'insert name here'
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
          <Link to="#" className={classes.menuButton} color="inherit">
            Logout
          </Link>
        </Toolbar>
      </AppBar>
      {renderComponent(screen)}
    </div>
  );
};

export default UserHome;
