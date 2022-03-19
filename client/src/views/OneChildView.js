import Header from "../components/Header";
import OneChild from "../components/OneChild";
import React, { useEffect, useState } from "react";

const OneChildView = (props) => {
  const { id } = props;
  return (
    <div>
      <Header />
      <OneChild id={id} />
    </div>
  );
};

export default OneChildView;
