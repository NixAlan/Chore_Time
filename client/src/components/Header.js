import React from "react";
import { Link } from "@reach/router";
import axios from "axios";
import { navigate } from "@reach/router";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";

const Header = (props) => {
  const { link, linkText, title } = props;

  const handleLogOut = () => {
    axios
      .post("http://localhost:8000/api/users/logout")

      .then((res) => {
        console.log(res);
        console.log(res.data);
        localStorage.removeItem("username");
        navigate("/");
      })
      .catch((err) => {
        console.log("log out unseccessful");
        console.log(err);
      });
  };
  return (
    <header>
      <MDBContainer
        className="border p-1"
        style={{ backgroundColor: "#e0f2f1" }}
      >
        <MDBRow around>
          <MDBCol className="">
            <h5>{title}</h5>
          </MDBCol>
          <MDBCol className="">
            <div className="headerRow">
              <Link
                style={{ fontSize: "small", marginRight: "5px" }}
                to="/parentDashboard"
              >
                Dashboard
              </Link>
              <Link
                style={{ fontSize: "small", marginRight: "5px" }}
                to="/addChildView"
              >
                Add Child
              </Link>
              <Link
                style={{ fontSize: "small", marginRight: "5px" }}
                to="/addChoreView"
              >
                Add Chore
              </Link>
              <Link
                style={{ fontSize: "small", marginRight: "5px" }}
                to="/endOfWeekView"
              >
                End Of Week
              </Link>
              <MDBBtn
                color="light"
                //className="ms-2"
                size="sm"
                onClick={handleLogOut}
              >
                logout
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </header>
  );
};

export default Header;
