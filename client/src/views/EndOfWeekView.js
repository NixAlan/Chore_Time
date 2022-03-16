import React from "react";
import EndOfWeek from "../components/EndOfWeek";
import Header from "../components/Header";

const EndOFWeekView = (props) => {
  return (
    <div>
      <Header link={"/"} linkText={"Back to HOme"} title={"Current Status"} />
      <EndOfWeek />
    </div>
  );
};

export default EndOFWeekView;
