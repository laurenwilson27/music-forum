// Note - this element currently just displays a link to the registration page to test the Router
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      Header
      <br />
      <Link to="/register">Click here to register an account</Link>
    </div>
  );
};

export default Header;
