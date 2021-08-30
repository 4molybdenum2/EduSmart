import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Assignment from "./components/UserCore/Assignment";
import Calendar from "./components/UserHome/Calendar";
import Home from "./components/Home";
import { isAuthenticated } from "./helper/API";
import Dashboard from "./components/UserHome/Dashboard";
import AddCourse from "./components/UserHome/AddCourse";
import StudentAddCourse from "./components/UserHome/StudentAddCourse";
import Tests from "./components/UserHome/Tests";
import { NotFound } from "./Commons";

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
);

const TeacherRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated() && !isAuthenticated().isStudent)
        return <Component {...props} />;
      else return <Redirect to="/signin" />;
    }}
  />
);

const StudentRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated() && isAuthenticated().isStudent)
        return <Component {...props} />;
      else return <Redirect to="/signin" />;
    }}
  />
);

const NonLoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated()) return <Redirect to="/dashboard" />;
      else return <Component {...props} />;
    }}
  />
);

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <NonLoginRoute path="/signin" component={SignIn} exact />
        <NonLoginRoute path="/signup" component={SignUp} exact />
        <LoginRoute path="/dashboard" component={Dashboard} exact />
        <TeacherRoute path="/courses/create" component={AddCourse} exact />
        <StudentRoute path="/courses/link" component={StudentAddCourse} exact />
        <LoginRoute path="/tests" component={Tests} exact />
        <LoginRoute path="/assignment" component={Assignment} />
        <LoginRoute path="/calendar" component={Calendar} />
        <Route path="/" component={Home} exact/>
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
