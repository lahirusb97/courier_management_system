import React from "react";
import { UserAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export default function RiderProtected({ children }) {
  const { userData, loading, error } = UserAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-screen justify-center items-center">
        <CircularProgress /> Loading...
      </div>
    );
  } else {
    if (userData) {
      if (
        userData?.job_role === "rider" ||
        userData?.job_role === "admin" ||
        userData?.job_role === "branch"
      ) {
        return children;
      } else {
        return <Navigate to={"/login"} />;
      }
    } else {
      return <Navigate to={"/login"} />;
    }
  }
}
