import React, { useState } from "react";
import Login from "../components/Login";
import Header from "../components/Header";

const LogInView = (props) => {
  return (
    <div>
      <Header link={"/reg"} linkText={"Register"} title={"Welcome"} />
      <Login />
    </div>
  );
};

export default LogInView;
