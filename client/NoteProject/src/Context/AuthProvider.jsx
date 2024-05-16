import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const unsubcribed = auth.onIdTokenChanged((user) => {
      console.log("[AuthProvider]", { user });
      if (user?.uid) {
        setUser(user);
        if (user.accessToken !== localStorage.getItem("access_token")) {
          window.location.reload();
          localStorage.setItem("access_token", user.accessToken);
        }
        setIsLoading(false);
        return;
      }
      setUser({});
      localStorage.clear();
      setIsLoading(false);
      navigate("/login");
    });
    return () => {
      unsubcribed();
    };
  }, [auth]);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
};
