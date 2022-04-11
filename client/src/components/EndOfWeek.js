import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

const EndOfWeek = () => {
  const [childList, setChildList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [aatw, setAatw] = useState(""); // Allowance Available this week
  const [poinstPerChild, setPointsPerChild] = useState([]);
  const [disable, setDisable] = useState(false);
  const [processError, setProcessError] = useState("");
  const [payment, setPayment] = useState();
  const [loading, setLoadding] = useState(true);

  useEffect(() => {
    const getChildById = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/children/fromuser/${localStorage.getItem(
          "username"
        )}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      console.log(res.data);

      const tempChildList = res.data;
      let tempTotalPoints = 0;
      let tempPointsEarnedPerChild = [];
      for (let i = 0; i < tempChildList.length; i++) {
        tempTotalPoints = tempTotalPoints + tempChildList[i].creditEarned;
      }
      setPointsPerChild(tempPointsEarnedPerChild);
      setChildList(tempChildList);
      setTotalPoints(tempTotalPoints);
    };
    getChildById();
  }, []);

  const onProcess = async () => {
    if (totalPoints < 1) {
      setDisable(true);
      setProcessError(
        "Update a child's points for this week before processing"
      );
    } else {
      var tempChildList = [...childList];
      for (let i = 0; i < tempChildList.length; i++) {
        tempChildList[i].allowanceEarned =
          tempChildList[i].allowanceEarned +
          Math.floor((aatw / totalPoints) * childList[i].creditEarned);
        tempChildList[i].creditEarned = 0;
      }
      setChildList(tempChildList);
      console.log(childList, tempChildList);
      setTotalPoints(0);

      for (let j = 0; j < childList.length; j++) {
        //update each childs convert cedits to allowance earned
        console.log(childList[j]._id);
        axios
          .put(`http://localhost:8000/api/children/${childList[j]._id}`, {
            allowanceEarned: childList[j].allowanceEarned,
            creditEarned: childList[j].creditEarned,
          })
          .then((res) => {
            console.log(res);
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const onSetPaymentAmount = (e) => {
    let tempPayment = e.target.value;
    tempPayment = -1 * Math.abs(tempPayment);
    setPayment(tempPayment);
  };
  const makePayment = async (idFromBelow) => {
    if (loading) {
      const res = await axios.get(
        `http://localhost:8000/api/children/${idFromBelow}`
      );

      //console.log(res.data.allowanceEarned);
      let tempPayment = res.data.allowanceEarned;
      tempPayment = tempPayment + payment;
      const res2 = await axios
        .put(`http://localhost:8000/api/children/${idFromBelow}`, {
          allowanceEarned: tempPayment,
        })
        .then((res) => {
          console.log(res.data);

          for (let i = 0; i < childList.length; i++) {
            // update allowanceEarned after allowance payment
            if (childList[i]._id === idFromBelow) {
              childList[i].allowanceEarned = res.data.allowanceEarned;
              return;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(res2);
      let tempLoad = false;
      setLoadding(tempLoad);
    } else {
      let tempLoad = true;
      setLoadding(tempLoad);
    }
  };
  return (
    <MDBContainer className="border">
      <MDBRow className="mt-4 d-flex justify-content-center">
        <MDBCol size="4">
          <MDBInput
            className="mb-4"
            label="Total Allowance Available"
            name="aatw"
            type="Number"
            value={aatw}
            onChange={(e) => setAatw(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
          <MDBInput
            className="mb-4"
            label="Allowance Payment Amount"
            type="Number"
            value={parseInt(Math.abs(payment))}
            onChange={(e) => onSetPaymentAmount(e)}
          />
        </MDBCol>
      </MDBRow>
      <table
        style={{
          width: "100%",
          margin: "0 auto",
        }}
      >
        <thead>
          <tr>
            <th>Chore Name:</th>
            <th>Points Earned This Week:</th>
            <th>Allowance Earned this week:</th>
            <th>Total Allowance Owed</th>
            <th>Make Allowance Payment </th>
          </tr>
        </thead>
        <tbody>
          {childList.map((child, index) => {
            return (
              <tr key={index}>
                <td>{child.name}</td>
                <td>{child.creditEarned}</td>
                <td>
                  {totalPoints < 1
                    ? 0
                    : Math.floor((aatw / totalPoints) * child.creditEarned)}
                </td>
                <td>{child.allowanceEarned}</td>
                <td>
                  <MDBBtn
                    size="sm"
                    color="info"
                    onClick={() => makePayment(child._id)}
                  >
                    Make Allowance Payment
                  </MDBBtn>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <MDBBtn size="sm" color="info" disabled={disable} onClick={onProcess}>
        Process Chore Week
      </MDBBtn>
      {disable ? <p>{processError}</p> : <p></p>}
    </MDBContainer>
  );
};

export default EndOfWeek;
