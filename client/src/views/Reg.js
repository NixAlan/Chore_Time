import React from "react";
import Registration from "../components/Registration";
import Header from "../components/Header";

const RegView = (props) => {
  return (
    <div>
      <Header link={""} linkText={""} title={"Registration"} />
      <Registration />
    </div>
  );
};

export default RegView;
