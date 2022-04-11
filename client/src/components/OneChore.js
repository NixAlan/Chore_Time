import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";

const OneChore = (props) => {
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const [childList, setChildList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/chore/${id}`)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setChore(res.data);
      })
      .catch((err) => {
        console.log("get one chore did not work in OneChore", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://localhost:8000/api/children/fromuser/${localStorage.getItem(
          "username"
        )}
        `,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setChildList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (e) => {
    const tempChore = { ...chore };
    tempChore.completedBy = e.target.value;
    setChore(tempChore);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/chore/${id}`, chore)
      .then((res) => {
        console.log(res);
        console.log(res.data);
        navigate("/parentDashboard");
      })
      .catch((err) => {
        console.log("update chore failed", err);
      });
  };
  return (
    <MDBContainer className="border">
      <p>Completed By:</p>

      {childList.length > 0 ? (
        <select onChange={handleChange}>
          <option value=""></option>
          {childList.map((child, index) => {
            return (
              <option key={child._id} value={child.name}>
                {child.name}
              </option>
            );
          })}
        </select>
      ) : null}
      <button onClick={handleSubmit}>Submit</button>
    </MDBContainer>
  );
};
export default OneChore;
