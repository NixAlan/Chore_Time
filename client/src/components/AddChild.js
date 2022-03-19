import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import Header from "./Header";

const AddChild = (props) => {
  const [childName, setChildName] = useState("");
  const [error, setError] = useState("");

  const handleAddChild = (e) => {
    if (childName.length < 1) {
      setError("Child Name is Required");
    } else if (childName.length > 0 && childName.length < 4) {
      setError("Child Name Must be more than 3 letters");
    } else {
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
          navigate("/parentDashboard");
        })
        .catch((err) => {
          console.log("add Child Failed");
          console.log(err);
        });
    }
  };

  const handleName = (e) => {
    setChildName(e.target.value);
  };

  return (
    <div className="oneContainer">
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
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default AddChild;
