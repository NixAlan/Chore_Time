import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Header from "./Header";

const AddChild = (props) => {
  const [childName, setChildName] = useState("");

  const handleAddChild = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/children",

        {
          name: childName,
          allowanceEarned: 0,
          creditEarned: 0,
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
        console.log("add Child Failed");
        console.log(err);
      });
  };

  const handleName = (e) => {
    setChildName(e.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <label>Child Name:</label>
          <input
            type="text"
            name="name"
            value={childName}
            onChange={handleName}
          />
        </div>
      </form>
      <button onClick={handleAddChild}>Add Child</button>
    </div>
  );
};

export default AddChild;
