import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ roles, component: Component, ...rest }) => {
  const { isAuthenticated, loading, data } = useSelector((state) => state.user);
  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (!isAuthenticated) {
              return <Redirect to="/" />;
            }

            if (roles && !roles.includes(data.role)) {
              return <Redirect to="/" />;
            }

            return <Component {...props} />;
          }}
        />
      )}
    </>
  );
};

export default ProtectedRoute;
