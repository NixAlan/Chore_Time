import React from "react";
import Header from "../components/Header";
import OneChild from "../components/OneChild";

const OneChildView = (props) => {
  const { id } = props;
  return (
    <div>
      <Header title={""} />
      <OneChild id={id} />
    </div>
  );
};

export default OneChildView;
