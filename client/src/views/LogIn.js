import React from "react";
import Login from "../components/Login";
import { Link } from "@reach/router";

const LogInView = (props) => {
  return (
    <div>
      <div className="headerrow">
        <h1>Welcome</h1>
        <Link to="/reg">Register</Link>
      </div>
      <Login />
    </div>
  );
};

export default LogInView;
