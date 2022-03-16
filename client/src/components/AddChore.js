import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import axios from "axios";

const AddChore = (props) => {
  const [choreName, setChoreName] = useState("");
  const [error, setErrors] = useState({});
  const onChangeHandle = (e) => {
    setChoreName(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:8000/api/chore",
        {
          name: choreName,
          completedBy: "notcomplete",
          credit: 1,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        console.log("err.response", err.response);
        // setErrors(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <form>
        <div>
          <label>name:</label>
          <input
            type="text"
            name="name"
            value={choreName}
            onChange={(e) => onChangeHandle(e)}
          />
        </div>
        <button onClick={submitHandle}>Submit</button>
      </form>
    </div>
  );
};

export default AddChore;
