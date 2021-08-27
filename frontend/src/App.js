import Home from "./components/Home";
import SignIn from "./components/SignIn";
import "./styles/index.css";

import { Switch, Route } from "react-router-dom";

const App = () => {
    return (
      <Switch>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    );
}

export default App;