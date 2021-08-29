import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Assignment from "./components/UserCore/Assignment";
import UserHome from "./components/UserHome";
import { isAuthenticated } from "./helper/API";
import "./index.css";

const LoginRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() ? <Component {...props} /> : <Redirect to="/signin" />
    }
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

const App = () => {
  return (
    <Switch>
      <NonLoginRoute path="/signin" component={SignIn} exact />
      <NonLoginRoute path="/signup" component={SignUp} exact />
      <LoginRoute
        path="/dashboard"
        component={UserHome({ screen: "dashboard" })}
      />

      <LoginRoute
        path="/courses/add"
        component={UserHome({ screen: "addCourse" })}
      />

      <LoginRoute path="/tests" component={UserHome({ screen: "tests" })} />
      <LoginRoute path="/assignment" component={Assignment} exact />
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
