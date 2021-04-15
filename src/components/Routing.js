import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import GuestForm from "./GuestForm";
import WelcomePage from "./WelcomePage";
import SelectionPage from "./SelectionPage";
import CallPage from "./CallPage";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

const Routing = (props) => {
  return (
    <Switch>
      <Route exact path="/guest" render={() => <GuestForm {...props} />} />
      <Route exact path="/call" render={() => <CallPage {...props} />} />
      <Route exact path="/select" render={() => <SelectionPage {...props} />} />
      <Route
        exact
        path="/register"
        render={() => <RegisterForm {...props} />}
      />
      <Route exact path="/login" render={() => <LoginForm {...props} />} />
      {/* <ProtectedRoute exact path="/profile" render={()=> <Profile {...props} />} /> */}
      <ProtectedRoute exact path="/profile" {...props} component={Profile} />
      <Route exact path="/" component={WelcomePage} />
    </Switch>
  );
};

export default Routing;

//auth = /login
//admin = /profile
