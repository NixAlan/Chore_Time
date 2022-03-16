import React, { useState, useEffect } from "react";
import axios from "axios";
import { navigate } from "@reach/router";

const handleAddChild = () => {
  navigate("/addChildView");
};
const handleAddChore = () => {
  navigate("/addChoreView");
};
const handleNavigate = (idFromBelow) => {
  navigate(`/oneChildView/edit/${idFromBelow}`);
};
const handleLogOut = () => {
  axios
    .post("http://localhost:8000/api/users/logout")

    .then((res) => {
      console.log(res);
      console.log(res.data);
      navigate("/login");
    })
    .catch((err) => {
      console.log("log out unseccessful");
      console.log(err);
    });
};
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

  const handleRemoveChild = (idFromBelow) => {
    axios
      .delete(`http://localhost:8000/api/children/${idFromBelow}`)
      .then((res) => {
        console.log(res.data);
        setChildList(
          childList.filter((child, index) => child._id !== idFromBelow)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNavigateResults = () => {
    navigate("/endofweekvew");
  };

  return (
    <div>
      <div>
        <button onClick={handleNavigateResults}>Current Status</button>
      </div>
      <button onClick={handleAddChild}>Add Child</button>
      {childList
        ? childList.map((child, index) => {
            return (
              <div key={index}>
                <div>
                  <p>{child.name}</p>
                  <button onClick={() => handleRemoveChild(child._id)}>
                    Remove Child
                  </button>
                  <button onClick={() => handleNavigate(child._id)}>
                    {child.name} name
                  </button>
                </div>
              </div>
            );
          })
        : null}
      <div>
        <button onClick={handleAddChore}>Add Chore</button>
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
      <div>
        <button onClick={handleLogOut}>logout</button>
      </div>
    </div>
  );
};

export default Home;
