import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, Outlet, Route } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = ({ path, children }) => {
  const { user } = useAuth();

  if (!user || !user.token) {
    return <Navigate to={"/connexion"} replace />;
  }


  return <>{children}</>;
};

export default ProtectedRoute;
