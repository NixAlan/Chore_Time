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
      <div className="headerrow">
        <h1>{title}</h1>
        <nav>
          <Link to="/parentDashboard">Dashboard</Link>
          <Link to="/addChildView">Add Child</Link>
          <Link to="/addChoreView">Add Chore</Link>
          <Link to="/endOfWeekView">End Of Week</Link>
        </nav>
        <div>
          <button onClick={handleLogOut}>logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
