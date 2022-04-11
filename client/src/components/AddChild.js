import React, { useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

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
    <MDBContainer className="border">
      <form>
        <MDBContainer className="col-md-4">
          <MDBInput
            className="mb-4"
            type="text"
            name="name"
            label="Child Name"
            value={childName}
            onChange={handleName}
          />
        </MDBContainer>
      </form>
      <MDBBtn color="info" className="mb3" onClick={handleAddChild}>
        Add Child
      </MDBBtn>
      {error ? <p>{error}</p> : null}
    </MDBContainer>
  );
};

export default AddChild;
