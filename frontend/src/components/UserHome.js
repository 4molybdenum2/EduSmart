import {
  CssBaseline,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Fab,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Add } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import  Dashboard from "./UserHome/Dashboard";
import  Tests from "./UserHome/Tests";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  cardContent: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2), textDecoration: 'none', color: 'black'},
  title: { flexGrow: 1 },
}));

const UserHome = ({ screen }) => {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const preventDefault = (event) => event.preventDefault();
  useEffect(() => {
    // Get Courses using API
  }, [courses]);

  const renderComponent = (comp) => {
    switch(comp){
      case "dashboard":
        return <Dashboard/>;
      case "tests":
        return <Tests/>;
      default:
        return null;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
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
      {
        renderComponent(screen)
      }
    </div>
  );
};

export default UserHome;
