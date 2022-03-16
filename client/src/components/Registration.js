import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const Registration = (props) => {
  const [registration, setRegistration] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setErrors] = useState({});
  const newSateObject = { ...registration };
  const onChangeHandle = (e) => {
    newSateObject[e.target.name] = e.target.value;
    console.log("e.target.name =", e.target.name);
    console.log("e.target.value=", e.target.value);
    setRegistration(newSateObject);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/users/register", registration)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
        console.log("err.response", err.response);
        setErrors(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={registration.email}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="username"
            value={registration.userName}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={registration.password}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={registration.confirmPassword}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <button onClick={submitHandle}>Submit</button>
      </form>
    </div>
  );
};

export default Registration;
