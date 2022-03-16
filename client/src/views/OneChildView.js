import Header from "../components/Header";
import OneChild from "../components/OneChild";
import React, { useEffect, useState } from "react";

const OneChildView = (props) => {
  const { id } = props;
  return (
    <div>
      <Header
        link={"/"}
        linkText={"Back to HOme"}
        title={"Cedit Earned this week for chores completed"}
      />
      <OneChild id={id} />
    </div>
  );
};

export default OneChildView;
