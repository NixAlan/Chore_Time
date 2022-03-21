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
  const [errors, setErrors] = useState({});
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
        console.log(
          "err.response",
          err.response.data.errors.confirmPassword.message
        );
        setErrors(err.response.data);
      });
  };
  return (
    <div className="oneContainer">
      <form>
        <div className="containerReg">
          <div className="containerCol">
            <p>Email:</p>
            <p>User Name:</p>
            <p>Password:</p>
            <p>Confirm Password:</p>
          </div>
          <div className="containerCol">
            <p>
              {" "}
              <input
                type="text"
                name="email"
                value={registration.email}
                onChange={(e) => onChangeHandle(e)}
              />
            </p>
            {errors.errors ? <p>{errors.errors.email.message}</p> : null}
            <p>
              <input
                type="text"
                name="username"
                value={registration.userName}
                onChange={(e) => onChangeHandle(e)}
              />
            </p>
            {errors.errors ? <p>{errors.errors.username.message}</p> : null}
            <p>
              <input
                type="password"
                name="password"
                value={registration.password}
                onChange={(e) => onChangeHandle(e)}
              />
            </p>
            {errors.errors ? <p>{errors.errors.password.message}</p> : null}
            <p>
              <input
                type="password"
                name="confirmPassword"
                value={registration.confirmPassword}
                onChange={(e) => onChangeHandle(e)}
              />
            </p>
            {errors.errors ? (
              <p>{errors.errors.confirmPassword.message}</p>
            ) : null}
          </div>
          {/* <div>
           

          </div>
          <div>
           

          </div> */}
        </div>
        <button onClick={submitHandle}>Submit</button>
      </form>
    </div>
  );
};

export default Registration;
