import { Link } from "@reach/router";

const Header = (props) => {
  const { link, linkText, title } = props;
  return (
    <header>
      <div className="headerrow">
        <h1>{title}:</h1>
        <p>
          {" "}
          <Link to={link}>{linkText}</Link>
        </p>
      </div>
    </header>
  );
};

export default Header;
