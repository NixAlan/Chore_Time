import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const EndOfWeek = () => {
  const [childList, setChildList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [aatw, setAatw] = useState(15); // Allowance Available this week
  const [poinstPerChild, setPointsPerChild] = useState([]);
  // const [childAllowanceEearnedArr, setChildAllowanceEarnedArr] = useState([]);
  const [disable, setDisable] = useState(false);
  const [processError, setProcessError] = useState("");
  const [payment, setPayment] = useState(0);
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

      console.log(res.data.allowanceEarned);
      let tempPayment = res.data.allowanceEarned;
      tempPayment = tempPayment + payment;
      console.log("devlog", tempPayment);
      const res2 = await axios
        .put(`http://localhost:8000/api/children/${idFromBelow}`, {
          allowanceEarned: tempPayment,
        })
        .then((res) => {
          console.log(res.data);

          for (let i = 0; i < childList.length; i++) {
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
    <div className="oneContainer">
      <div className="containerRow">
        <div>
          <label>Allowance Available This Week:</label>
          <input
            name="aatw"
            type="Number"
            value={aatw}
            onChange={(e) => setAatw(e.target.value)}
            style={{ marginLeft: "5px" }}
          />
        </div>
        <div style={{ marginTop: "5px" }}>
          <label>Allowance Payment Amount:</label>
          <input
            type="number"
            value={parseInt(Math.abs(payment))}
            onChange={(e) => onSetPaymentAmount(e)}
            style={{ marginLeft: "22px" }}
          />
        </div>
      </div>
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
                  <button onClick={() => makePayment(child._id)}>
                    Make Allowance Payment
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={disable} onClick={onProcess}>
        Process Chore Week
      </button>
      {disable ? <p>{processError}</p> : <p></p>}
    </div>
  );
};

export default EndOfWeek;
