import React from "react";
import { Route, Switch } from "react-router";
import { FirebaseAuth } from "./components/UserAuth/FirebaseAuth";
import LandingPage from "./components/LandingPage/LandingPage";
import Register from "./components/UserAuth/Register";
import Login from "./components/UserAuth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Watchlist from "./components/Watchlist/Watchlist";
const App = () => {
  return (
    <FirebaseAuth>
      <div className="bg-blue-darkest">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/watchlist" component={Watchlist}/>
        </Switch>
      </div>
    </FirebaseAuth>
  );
};

export default App;
