import React, { useState } from "react";
import OneChore from "../components/OneChore";
import Header from "../components/Header";

const OneChoreView = (props) => {
  const { id } = props;
  return (
    <div>
      <Header
        link={"/"}
        linkText={"Back to HOme"}
        title={"Asign Chore to Child who completed it"}
      />
      <OneChore id={id} />
    </div>
  );
};

export default OneChoreView;
