import React, { useState } from "react";
import Home from "../components/Home";
import Header from "../components/Header";

const HomeView = (props) => {
  return (
    <div>
      <Header link={"/"} linkText={"End of Week"} title={"Dashboard"} />
      <Home />
    </div>
  );
};

export default HomeView;
