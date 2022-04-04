import React from "react";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({ children, ...props }) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  return (
    <Route {...props}>
      {isAuthenticated ? <Redirect to='/cars' /> : children}
    </Route>
  );
}

export default PublicRoute;
