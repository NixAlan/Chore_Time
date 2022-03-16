import React, { useState } from "react";
import AddChore from "../components/AddChore";
import Header from "../components/Header";

const AddChoreView = (props) => {
  return (
    <div>
      <Header link={"/"} linkText={"Back to HOme"} title={"Add A Chore"} />
      <AddChore />
    </div>
  );
};

export default AddChoreView;
