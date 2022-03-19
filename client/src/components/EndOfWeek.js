import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const EndOfWeek = () => {
  const [childList, setChildList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [aatw, setAatw] = useState(15); // Allowance Available this week
  const [poinstPerChild, setPointsPerChild] = useState([]);
  const [childAllowanceEearnedArr, setChildAllowanceEarnedArr] = useState([]);
  const credits = useRef();

  useEffect(() => {
    console.log(credits);
    const getChildById = async () => {
      const log = await console.log(credits);
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
      var allowanceEarnedPerChildArr = [];
      for (let i = 0; i < childList.length; i++) {
        var tempAllowanceEarned = 0;
        tempAllowanceEarned = Math.floor(
          (aatw / totalPoints) * childList[i].creditEarned
        );
        console.log("devlog arr fire");
        allowanceEarnedPerChildArr.push(tempAllowanceEarned);
      }
      console.log(allowanceEarnedPerChildArr);
      setChildAllowanceEarnedArr(allowanceEarnedPerChildArr);

      //   console.log(
      //     "devlog",
      //     allowanceEarnedPerChildArr,
      //     tempAllowanceEarned,
      //     aatw,
      //     totalPoints,
      //     childList[1].creditEarned,
      //     childList.length
      //   );
    };
    getChildById();
  }, []);
  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     setAatw(e.target.vaule);
  //   };

  // const handleUpdate = async () => {
  //     const res = await axios.put(`http://localhost:8000/api/children/${id}`, {
  //         allowanceEarned:
  //       });

  //       console.log(res);
  //       console.log(res.data);
  // }

  //   const handleUpdate = (e) => {
  //     e.preventDefault();

  //   };

  //   const newChildSateObject =

  //   newChildSateObject[e.target.name] = e.target.value;
  //   setChildList[i] = newChildSateObject;

  const onProcess = async () => {
    // try {
    // var allowanceEarnedPerChildArr = [];
    // for (let i = 0; i < childList.length; i++) {
    //   var tempAllowanceEarned = 0;
    //   tempAllowanceEarned = Math.floor(
    //     (aatw / totalPoints) * childList[i].creditEarned
    //   );
    //   console.log("devlog arr fire");
    //   allowanceEarnedPerChildArr.push(tempAllowanceEarned);
    // }
    // setChildAllowanceEarnedArr(allowanceEarnedPerChildArr);
    // {
    //   for (let j = 0; j < childList.length; j++) {}
    //   const res = await axios.put();
  };
  //     catch (err) {}
  //   };
  //};
  return (
    <div className="oneContainer">
      <table
        style={{
          width: "50%",
          margin: "0 auto",
        }}
        className="table-borderless"
      >
        <thead>
          <div>
            <label>Allowance Available This Week</label>
            <input
              name="aatw"
              type="Number"
              value={aatw}
              onChange={(e) => setAatw(e.target.value)}
            />
          </div>
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
                <td ref={credits}>
                  {" "}
                  {Math.floor((aatw / totalPoints) * child.creditEarned)}
                </td>
                <td>{child.allowanceEarned}</td>
                <td>
                  <button>Make Allowance Payment</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onProcess}>Process Chore Week</button>
    </div>
  );
};

export default EndOfWeek;
