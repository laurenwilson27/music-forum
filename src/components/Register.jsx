import { useState } from "react";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import AvatarSelect from "./AvatarSelect";

import CryptoJS from "crypto-js";

function Register() {
  const navigate = useNavigate();
  const [, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [avatar, setAvatar] = useState("");

  const [error, setError] = useState(undefined);

  // Leave the page if the user is logged in already
  // useEffect(() => {
  //   if (user.loggedIn === true) navigate("/");
  // }, [username]);

  // useEffect(() => {
  //   if (user.loggedIn) {
  //     return;
  //   }

  //   const storedUser = localStorage.getItem("user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, [user.loggedIn]);

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  // const handlePasswordChange = (event) => {
  //   setPassword(event.target.value);
  // };

  // Shows an error message for 5 seconds
  const showError = (msg) => {
    setError(msg);
    setTimeout(() => setError(undefined), 5000);
  };

  // Attempts to add a user
  const addUser = async (e) => {
    e.preventDefault();

    // Very basic input checking (all fields must be filled, passwords must match)
    if (username === "") showError("You must enter a name");
    else if (email === "") showError("You must enter an email address");
    else if (avatar === "") showError("You must select an avatar");
    else if (password === "" || password !== password2) {
      showError("Passwords must match");
      setPassword("");
      setPassword2("");
    } else {
      const hashPW = CryptoJS.SHA1(password).toString();

      // Check if a user with this name already exists
      const check = await fetch(`http://localhost:7000/users?name=${username}`);
      const checkData = await check.json();
      console.log("check: " + JSON.stringify(checkData));

      if (checkData.length > 0) showError(`User "${username}" already exists`);
      else {
        // If successful, POST the new user
        const res = await fetch("http://localhost:7000/users", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: username,
            password: hashPW,
            avatar: avatar,
            email: email,
          }),
        });

        const data = await res.json();
        console.log("post: " + JSON.stringify(data));

        const newUser = {
          loggedIn: true,
          userId: data.id,
          userName: data.name,
          userAvatar: data.avatar,
        };

        console.log(JSON.stringify(newUser));

        setUser(newUser);
        navigate(0);
      }
    }
  };

  return (
    <div className="outer-container">
      <div className="inner-container">
        <form>
          <div className="container">
            <h1>Register</h1>
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              required
              type="text"
              placeholder="Username"
              className="regInput"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              required
              type="text"
              placeholder="Enter Email"
              className="regInput"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              required
              type="password"
              placeholder="Enter Password"
              className="regInput"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password2">
              <b>Repeat Password</b>
            </label>
            <input
              required
              type="password"
              placeholder="Repeat Password"
              className="regInput"
              id="password2"
              name="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
            <AvatarSelect avatar={avatar} setAvatar={setAvatar} />
            {error && <div class="registerError">{error}</div>}
            <p>
              By creating an account you agree to our{" "}
              <span className="pretendLink">
                Terms of Service & Privacy Policy
              </span>
            </p>
            <button type="button" className="registerbtn" onClick={addUser}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
