import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate, Link } from "@reach/router";
// 900 lines
const Home = (props) => {
  const [childList, setChildList] = useState([]);
  const [user, setUser] = useState("");
  const [choreList, setChoreList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/users/secure", {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res);
        console.log(res.data);
        setUser(res.data);
        //console.log("devlog", user.username);
        localStorage.setItem("username", res.data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/api/children/fromuser/${user.username}`, {
          withCredentials: true,
        })
        .then((res) => {
          //console.log(res);
          //console.log(res.data);
          setChildList(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:8000/api/chore/fromuser/${user.username}`, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
          console.log("devlog", choreList);
          setChoreList(
            res.data.filter(
              (chore, index) =>
                chore.completedBy === "notcomplete" || chore.completedBy === ""
            )
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);
  const handleAssign = (idFromBelow) => {
    navigate(`oneChoreView/edit/${idFromBelow}`);
  };

  // const handleRemoveChild = (idFromBelow) => {
  //   axios
  //     .delete(`http://localhost:8000/api/children/${idFromBelow}`)
  //     .then((res) => {
  //       console.log(res.data);
  //       setChildList(
  //         childList.filter((child, index) => child._id !== idFromBelow)
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
