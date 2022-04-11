import React, { useState } from "react";
import { navigate } from "@reach/router";
import axios from "axios";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";

const AddChore = (props) => {
  const [choreName, setChoreName] = useState("");
  const [error, setError] = useState("");
  const onChangeHandle = (e) => {
    setChoreName(e.target.value);
  };

  const submitHandle = (e) => {
    e.preventDefault();
    if (choreName.length < 1) {
      setError("Chore Name is Required");
    } else if (choreName.length > 0 && choreName.length < 4) {
      setError("Chore Name Must be more than 3 letters");
    } else {
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
          navigate("/parentDashboard");
        })
        .catch((err) => {
          console.log(err);
          console.log("err.response", err.response);
        });
    }
  };
  return (
    <MDBContainer className="border">
      <form>
        <MDBContainer className="col-md-4">
          <MDBInput
            className="mb-4"
            type="text"
            name="name"
            label="Chore Name"
            value={choreName}
            onChange={(e) => onChangeHandle(e)}
          />
          <MDBBtn color="info" className="mb-3" onClick={submitHandle}>
            Submit
          </MDBBtn>
          {error ? <p>{error}</p> : null}
        </MDBContainer>
      </form>
    </MDBContainer>
  );
};

export default AddChore;
