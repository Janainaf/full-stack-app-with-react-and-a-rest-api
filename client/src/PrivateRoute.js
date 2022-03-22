import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;

  return authUser ? <Outlet /> : <Navigate to="/signin" />;
}
export default PrivateRoute;
