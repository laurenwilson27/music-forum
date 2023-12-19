// Note - this component currently just displays a link to the registration page to test the Router
import LoginPanel from "./LoginPanel";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <Link to="/">
        <img src="/banner.png" alt="Fogtown Echoes banner" />
      </Link>
      <LoginPanel />
    </header>
  );
};

export default Header;
