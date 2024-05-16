import React from "react";
import { useRouteError } from "react-router-dom";

export const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  return <div>ErrorPage</div>;
};
