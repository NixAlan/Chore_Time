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
    <div className="oneContainer">
      <form>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={login.email}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={login.password}
            onChange={(e) => onChangeHandle(e)}
          />
          {errors ? <p>{errors.message}</p> : null}
        </div>
        <button onClick={handleLogin}>Submit</button>
      </form>
    </div>
  );
};

export default Login;
