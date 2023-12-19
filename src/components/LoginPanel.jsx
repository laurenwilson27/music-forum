import useUser from "../hooks/useUser";

import { useState } from "react";
// CryptoJS is no longer maintained, but it's very easy to use
import CryptoJS from "crypto-js";

const LoginPanel = () => {
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logout = () => {
    setUsername("");
    setPassword("");
    setUser({ loggedIn: false, userId: 0, userName: "", userAvatar: "" });
  };

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
    }
  };

  return (
    <div>
      {user.loggedIn === true ? (
        <button onClick={logout}>Log Out</button>
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
          <button type="submit">Log In</button>
        </form>
      )}
    </div>
  );
};

export default LoginPanel;
