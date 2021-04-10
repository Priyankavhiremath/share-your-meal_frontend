import React from "react";
import { decodeToken } from "../utils/auth";

import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, onLogout, ...rest }) => {
    return (
        <Route
        {...rest}
        render={(props) =>
            decodeToken() ? (
            <Component {...props} onLogout={onLogout} />
            ) : (
            <Redirect
                to={{
                pathname: "/login",
                state: { from: props.location },
                }}
            />
            )
        }
        />
    );
};

export default ProtectedRoute;