import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MDBInput, MDBBtn, MDBContainer } from "mdb-react-ui-kit";

const Registration = (props) => {
  const [registration, setRegistration] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const newSateObject = { ...registration };
  const navigate = useNavigate();
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
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };
  return (
    <MDBContainer className="border col-md-4 bm-4 pt-4 ">
      <form>
        {/* <div className="containerCol">
            <p>Email:</p>
            <p>User Name:</p>
            <p>Password:</p>
            <p>Confirm Password:</p>
          </div> */}

        <MDBInput
          className="mb-4"
          type="text"
          name="email"
          label="Email"
          value={registration.email}
          onChange={(e) => onChangeHandle(e)}
        />

        {errors.errors ? <p>{errors.errors.email.message}</p> : null}

        <MDBInput
          className="mb-4"
          type="text"
          label="Username"
          name="username"
          value={registration.userName}
          onChange={(e) => onChangeHandle(e)}
        />

        {errors.errors ? <p>{errors.errors.username.message}</p> : null}

        <MDBInput
          className="mb-4"
          type="password"
          label="Password"
          name="password"
          value={registration.password}
          onChange={(e) => onChangeHandle(e)}
        />

        {errors.errors ? <p>{errors.errors.password.message}</p> : null}

        <MDBInput
          className="mb-4"
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={registration.confirmPassword}
          onChange={(e) => onChangeHandle(e)}
        />

        {errors.errors ? <p>{errors.errors.confirmPassword.message}</p> : null}

        <MDBBtn type="submit" onClick={submitHandle} size="sm" className="mb-4">
          Submit
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default Registration;
