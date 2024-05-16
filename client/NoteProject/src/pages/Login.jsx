import React, { useContext, useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { AuthContext } from "../Context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { GrapQLrequest } from "../utils/request";
export const Login = () => {
  const auth = getAuth();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("access_token")) {
      navigate("/");
      return;
    }
  }, [user]);
  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    await GrapQLrequest({
      query: `mutation Mutation($uid: String!, $name: String) {
              register(uid: $uid, name: $name) {
                  name
                   uid
              }
              }`,
      variables: {
        uid,
        name: displayName,
      },
    });
  };
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "5px" }}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
};
