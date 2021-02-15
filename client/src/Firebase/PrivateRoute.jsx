import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { FireAuthContext } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const {currentUser} = useContext(FireAuthContext);
  return (
    <Route {...rest} render={routeProps =>
      !!currentUser
        ? (<RouteComponent {...routeProps} userId={currentUser.uid} />)
        : (<Redirect to={"/login"} />)
      }
    />
  );
};


export default PrivateRoute;