import { Link } from "@reach/router";

const Header = (props) => {
  const { link, linkText, title } = props;
  return (
    <header>
      <div className="headerrow">
        <h1>{title}:</h1>
        <p>
          {" "}
          <nav>
            <Link to="/parentDashbord">Dashboard</Link>
            <Link to="/addChildView">Add Child</Link>
            <Link to="/addChoreView">Add Chore</Link>
            <Link to="/endOfWeekView">End Of Week</Link>
          </nav>
        </p>
      </div>
    </header>
  );
};

export default Header;
