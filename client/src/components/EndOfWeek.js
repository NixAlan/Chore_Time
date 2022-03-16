import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const EndOfWeek = (props) => {
  const [childList, setChildList] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [aatw, setAatw] = useState(0);

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
      // console.log("devlog", tempChildList[1].creditEarned);
      for (let i = 0; i < tempChildList.length; i++) {
        tempTotalPoints = tempTotalPoints + tempChildList[i].creditEarned;
        console.log("devlog", tempChildList.length);
      }
      setChildList(tempChildList);
      setTotalPoints(tempTotalPoints);
    };
    getChildById();
  }, []);
  //   const handleChange = (e) => {
  //     e.preventDefault();
  //     setAatw(e.target.vaule);
  //   };

  return (
    <div>
      <table
        style={{
          width: "50%",
          margin: "0 auto",
        }}
      >
        <thead>
          <div>
            <label>Allowance Available This Week</label>
            <input
              type="Number"
              value={aatw}
              onChange={(e) => setAatw(e.target.value)}
            />
            {console.log(aatw)}
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
                <td>
                  {Math.floor((aatw / totalPoints) * child.creditEarned)}
                  {/* console.log(
                  {("devlog", aatw, totalPoints, child.creditEarned)}) */}
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
    </div>
  );
};

export default EndOfWeek;
