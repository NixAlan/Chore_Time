import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
//900
const Home = (props) => {
  const [childList, setChildList] = useState([]);
  const [user, setUser] = useState("");
  const [choreList, setChoreList] = useState([]);

  useEffect(() => {
    const getAppInfo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/secure", {
          withCredentials: true,
        });
        console.log(res);
        setUser(res.data);
        console.log(user);

        const res2 = await axios.get(
          `http://localhost:8000/api/children/fromuser/${res.data.username}`,
          {
            withCredentials: true,
          }
        );
        console.log("devlog", res2);
        console.log(res2);
        setChildList(res2.data);

        const res3 = await axios.get(
          `http://localhost:8000/api/chore/fromuser/${res.data.username}`,
          {
            withCredentials: true,
          }
        );

        console.log(res3);
        setChoreList(
          res3.data.filter(
            (chore, index) =>
              chore.completedBy === "notcomplete" || chore.completedBy === ""
          )
        );
      } catch (error) {
        console.log(error);
      }
    };
    getAppInfo();
  }, []);
  const handleAssign = (idFromBelow) => {
    navigate(`oneChoreView/edit/${idFromBelow}`);
  };

  return (
    <div>
      <div className="dashboardContainer">
        <div className="childListContainer">
          <p>Select a Child to check which chores they have completed</p>
          {childList
            ? childList.map((child, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Link
                        style={{ color: "lightgray" }}
                        to={`/oneChildView/edit/${child._id}`}
                      >
                        {" "}
                        {child.name}
                      </Link>
                      {/* <button onClick={() => handleRemoveChild(child._id)}>
                        Remove Child
                      </button> */}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
        <div className="choreListContainer">
          {choreList
            ? choreList.map((chore, index) => {
                return (
                  <div key={index}>
                    <div>
                      <p>{chore.name}</p>
                      <button onClick={() => handleAssign(chore._id)}>
                        Asign to Child
                      </button>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
