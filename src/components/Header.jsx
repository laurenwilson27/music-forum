// Note - this component currently just displays a link to the registration page to test the Router
import { Link } from "react-router-dom";
import LoginPanel from "./LoginPanel";

const Header = () => {
  return (
    <header>
      <img src="/banner.png" alt="Fogtown Echoes banner" />
      <LoginPanel />
    </header>
  );
};

export default Header;
