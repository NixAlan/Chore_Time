import React, { useState } from "react";
import AddChore from "../components/AddChore";
import Header from "../components/Header";

const AddChoreView = (props) => {
  return (
    <div>
      <Header title={"Add A Chore to the chore list"} />
      <AddChore />
    </div>
  );
};

export default AddChoreView;
