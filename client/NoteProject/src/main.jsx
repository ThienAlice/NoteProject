import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import "../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import routes from "./routes/index.jsx";
import { Container } from "@mui/material";
import "./firebase/config.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
    <RouterProvider router={routes}></RouterProvider>
  </Container>
);
