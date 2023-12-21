import useUser from "../hooks/useUser";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
// CryptoJS is no longer maintained, but it's very easy to use
import CryptoJS from "crypto-js";

const LoginPanel = () => {
  const navigate = useNavigate();
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(undefined);

  // Logs the user out, resets the login form
  const logout = () => {
    setUsername("");
    setPassword("");
    setUser({ loggedIn: false, userId: 0, userName: "", userAvatar: "" });

    // Refresh the page so all other elements reload
    navigate(0);
  };

  // Sets an error message - it is cleared after 5 seconds
  const doError = (msg) => {
    setError(msg);

    setTimeout(() => {
      setError(undefined);
    }, 5000);
  };

  // Attempts to log in based on the information in the form
  const tryLogin = async (e) => {
    e.preventDefault();

    const hashPW = CryptoJS.SHA1(password).toString();
    const res = await fetch(
      `http://localhost:7000/users?name=${username}&password=${hashPW}`
    );
    const json = await res.json();

    // If the cretentials match, the response is a single object in an array
    if (json.length === 1) {
      setUser({
        loggedIn: true,
        userId: json[0].id,
        userName: json[0].name,
        userAvatar: json[0].avatar,
      });

      // Refresh the page so all other elements reload
      navigate(0);
    } else doError("Login failed - check your username and password");
  };

  return (
    <div className="btns-containerB">
      {error ? (
        <div className="error">{error}</div>
      ) : user.loggedIn === true ? (
        // Display these elements when logged in
        <div className="loggedInUser">
          <img
            src={`/avatars/${user.userAvatar}`}
            className="headerAvatar"
            alt="Your user avatar"
          />
          <span className="tableFont1">{user.userName}</span>
          <button onClick={logout} className="btnB">
            Sign Out
          </button>
        </div>
      ) : (
        // Display this form when logged out
        <form id="loginform" title="Login Form" onSubmit={tryLogin}>
          <input
            type="text"
            placeholder="Name"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="btnB">
            Sign In
          </button>
          <Link to="/register">
            <button className="btnB" type="text">
              Register
            </button>
          </Link>
        </form>
      )}
    </div>
  );
};

export default LoginPanel;
