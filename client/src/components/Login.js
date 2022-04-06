import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";

const Login = (props) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const newSateObject = { ...login };
  const onChangeHandle = (e) => {
    newSateObject[e.target.name] = e.target.value;
    console.log("e.target.name =", e.target.name);
    console.log("e.target.value=", e.target.value);
    setLogin(newSateObject);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/users/login",
        {
          email: newSateObject.email,
          password: newSateObject.password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/parentDashboard");
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data.message);
        setErrors(err.response.data);
      });
  };
  return (
    <form>
      {/* Email input */}
      <div className="form-outline mb-4">
        <input
          type="text"
          className="form-control"
          //style={{ width: "25%" }}
          name="email"
          value={login.email}
          onChange={(e) => onChangeHandle(e)}
        />
        <label className="form-label">Email: </label>
      </div>
      <div className="form-outline mb-4">
        <input
          className="form-control"
          type="text"
          name="password"
          value={login.password}
          onChange={(e) => onChangeHandle(e)}
        />
        <label className="form-label">Password: </label>
      </div>
      {errors ? <p>{errors.message}</p> : null}

      {/* <div class="form-outline mb-4">
        <input type="email" id="form1Example1" class="form-control" />
        <label class="form-label" for="form1Example1">
          Email address
        </label>
      </div>

      <div class="form-outline mb-4">
        <input type="password" id="form1Example2" class="form-control" />
        <label class="form-label" for="form1Example2">
          Password
        </label>
      </div> */}
      <button className="btn btn-primary" onClick={handleLogin}>
        Submit
      </button>
    </form>
  );
};

export default Login;
