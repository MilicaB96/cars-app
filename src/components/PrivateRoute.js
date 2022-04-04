import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

function PrivateRoute({ children, ...props }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return (
    <Route {...props}>
      {isAuthenticated ? children : <Redirect to='/login' />}
    </Route>
  );
}

export default PrivateRoute;
