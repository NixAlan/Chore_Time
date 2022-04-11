import React from "react";
import Login from "../components/Login";
import { Link } from "react-router-dom";

const LogInView = (props) => {
  return (
    <div>
      <div className="headerrow">
        <h1>Welcome to Chore Time</h1>
        <Link to="/reg">Register</Link>
      </div>
      <Login />
    </div>
  );
};

export default LogInView;
