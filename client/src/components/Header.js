import { Link } from "@reach/router";
import axios from "axios";
import { navigate } from "@reach/router";

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
      <div className="headerContainer">
        <div className="headerCol1">
          <h1>{title}</h1>
        </div>
        <div className="headerCol2">
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
          </div>
          <div className="headerRow">
            <button onClick={handleLogOut}>logout</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
