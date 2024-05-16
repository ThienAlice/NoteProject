import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const ProtectedRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("access_token")) {
      navigate("/login");
      return;
    }
  }, []);

  return <Outlet />;
};
