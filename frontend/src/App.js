import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Assignment from "./components/UserCore/Assignment";
import UserHome from "./components/UserHome";
import "./index.css";

const App = () => {
  return (
    <Switch>
      <Route path="/signin" exact>
        <SignIn />
      </Route>
      <Route path="/signup" exact>
        <SignUp />
      </Route>
      <Route path="/dashboard" exact>
        <UserHome screen={"dashboard"}/>
      </Route>
      <Route path="/tests" exact>
        <UserHome screen={"tests"}/>
      </Route>
      <Route path="/assignment">
        <Assignment />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  );
};

export default App;
