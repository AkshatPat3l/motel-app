import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PrivateRoute() {
  const { user } = useSelector((state) => state.user);
  return user ? <Outlet /> : <Navigate to="/log-in" />;
}