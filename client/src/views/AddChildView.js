import React, { useState } from "react";
import AddChild from "../components/AddChild";
import Header from "../components/Header";

const AddChildView = (props) => {
  return (
    <div>
      <Header link={"/"} linkText={"Back to HOme"} title={"Add A Child"} />
      <AddChild />
    </div>
  );
};

export default AddChildView;
