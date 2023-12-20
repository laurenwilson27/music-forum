// Note - this component currently just displays a link to the registration page to test the Router
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div>
      <h2>Header</h2>
      <br />
      {user && (
        <>
          <img
            src={`/avatars/${user.avatar}`}
            alt="User avatar"
            className="headerAvatar"
          />
          <p>{user.username}</p>
        </>
      )}
      <Link to="/register">Click here to register an account</Link>
    </div>
  );
};

export default Header;
