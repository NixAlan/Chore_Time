import React from "react";
import Home from "../components/Home";
import Header from "../components/Header";

const HomeView = () => {
  return (
    <div>
      <Header title={`Welcome ${localStorage.getItem("username")}`} />
      <Home />
    </div>
  );
};

export default HomeView;
