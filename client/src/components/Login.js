import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

const Login = (props) => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const newSateObject = { ...login };
  const navigate = useNavigate();

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
      {/* <MDBInput
        className="mb-4"
        type="email"
        id="form1Example1"
        label="Email address"
      />
      <MDBInput
        className="mb-4"
        type="password"
        id="form1Example2"
        label="Password"
      />

      <MDBRow className="mb-4">
        <MDBCol className="d-flex justify-content-center">
          <MDBCheckbox id="form1Example3" label="Remember me" defaultChecked />
        </MDBCol>
        <MDBCol>
          <a href="#!">Forgot password?</a>
        </MDBCol>
      </MDBRow>

      <MDBBtn type="submit" block>
        Sign in
      </MDBBtn> */}

      <div className="container col-md-4 border mb-4 pt-4 ">
        <MDBInput
          className="mb-4"
          type="email"
          label="Email"
          name="email"
          value={login.email}
          onChange={(e) => onChangeHandle(e)}
        />

        <MDBInput
          className="mb-4"
          type="password"
          label="password"
          name="password"
          value={login.password}
          onChange={(e) => onChangeHandle(e)}
        />
        <MDBBtn size="sm" type="submit" onClick={handleLogin}>
          Submit
        </MDBBtn>
        {errors ? <p>{errors.message}</p> : null}
      </div>
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
      </div> 
      <button className="btn btn-primary" onClick={handleLogin}>
        Submit
      </button> */}
    </form>
  );
};

export default Login;
