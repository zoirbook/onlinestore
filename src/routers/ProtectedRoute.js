import React from "react";
import useAuth from "../custom-hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { currentUser } = useAuth();

  console.log(typeof currentUser, currentUser);
  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
