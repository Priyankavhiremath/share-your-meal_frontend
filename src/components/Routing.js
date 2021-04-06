import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import GuestForm from "./GuestForm";
import WelcomePage from "./WelcomePage";

const Routing = (props) => {
  return (
    <Switch>
      <Route exact path="/guest" render={() => <GuestForm {...props} />} />
      <Route exact path="/" component={WelcomePage} />
    </Switch>
  );
};

export default Routing;
