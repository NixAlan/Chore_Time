import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const OneChild = (props) => {
  const { id } = props;
  const [child, setChild] = useState({});
  const [choreList, setChoreList] = useState([]);
  const [credit, setCredit] = useState(0);
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    const getChildById = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/children/${id}`);
        console.log(res);
        console.log(res.data);
        setChild(res.data);
        const childName = res.data.name;
        const res2 = await axios.get(
          `http://localhost:8000/api/chore/fromuser/${localStorage.getItem(
            "username"
          )}`,
          {
            withCredentials: true,
          }
        );

        const tempChoreList = res2.data.filter(
          (chore, index) => chore.completedBy === childName
        );

        let tempCredit = 0;
        for (let i = 0; i < tempChoreList.length; i++) {
          tempCredit = tempCredit + tempChoreList[i].credit;
        }
        console.log("devlog", tempCredit);
        setChoreList(tempChoreList);
        setCredit(tempCredit);
      } catch (err) {
        console.log(err);
      }
    };

    getChildById();
  }, []);

  const handleUpdate = async () => {
    if (credit < 1) {
      setDisable(true);
    } else {
      const res = await axios.put(`http://localhost:8000/api/children/${id}`, {
        creditEarned: credit,
      });

      console.log(res);
      console.log(res.data);

      const res2 = await axios.delete(
        `http://localhost:8000/api/chore/${child.name}`
      );
      console.log(res2);
      console.log(res2.data);
      navigate("/");
    }
  };

  return (
    <div>
      <div>
        <h3>{child.name}</h3>
        <h3>Points Earned this week: {credit}</h3>
      </div>
      <table
        style={{
          width: "50%",
          margin: "0 auto",
        }}
      >
        <thead>
          <th>Chore Name:</th>
          <th>Points:</th>
          <th>Date Completed:</th>
        </thead>
        <tbody>
          {choreList.map((chore, index) => {
            return (
              <tr key={index}>
                <td>{chore.name}</td>
                <td>{chore.credit}</td>
                <td>{chore.updatedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button disabled={disable} onClick={handleUpdate}>
        Update Points
      </button>
      {disable ? <p>Points Must be greater then 0 to Update</p> : null}
    </div>
  );
};

export default OneChild;
