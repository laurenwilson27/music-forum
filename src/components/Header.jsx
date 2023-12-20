import LoginPanel from "./LoginPanel";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header">
          <div className="titleblock">
            <h1 className="website-name">FOGTOWN ECHOES</h1>
            <blockquote className="slogan">
              “A LOCAL MUSIC FORUM FOR NEWFOUNDLAND SOUNDS”
            </blockquote>
          </div>
          <div className="btns-containerA">
            <Link to="/">
              <button className="btnA" type="button">
                Home
              </button>
            </Link>
            <button className="btnA" type="button">
              About
            </button>
            <button className="btnA" type="button">
              Contact
            </button>
          </div>
          <LoginPanel />
        </div>
      </div>
    </header>
  );
};

export default Header;
