import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

function Register() {
  const [user, setUser] = useUser();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    if (user.loggedIn) {
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [user.loggedIn]);

  //   const getUser = async () => {
  //     const userFromServer = await fetchUser();
  //     setUser(userFromServer);
  //   };
  //   getUser();
  // }, [user.loggedIn]);

  // const fetchUser = async () => {
  //   const res = await fetch(`http://localhost:7000/users`);
  //   const data = await res.json();
  //   return data;
  // };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const addUser = async () => {
    const newUser = { username, password, avatar };

    const res = await fetch("http://localhost:7000/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    console.log("Data from server:", data);

    const updatedUser = {
      loggedIn: true,
      userId: data.id,
      userName: data.username,
      userAvatar: data.avatar,
    };
    console.log("Updated user object:", updatedUser);

    setUser(updatedUser);

    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // console.log(user.userName);

  return (
    <div>
      <form className="add-comment">
        {avatar !== "" && (
          <img
            src={`avatars/${avatar}`}
            alt="User avatar"
            width="128px"
            height="128px"
          />
        )}
        <select
          id="avatarSelect"
          title="Avatar Selection"
          value={avatar}
          onChange={(e) => {
            setAvatar(e.target.value);
          }}
        >
          <option value="">Select an avatar!</option>
          <option value="acoustic.png">Acoustic</option>
          <option value="georgestreet.png">George Street Festival</option>
          <option value="metal.png">Metal Concert</option>
          <option value="rapids.png">Rapids</option>
          <option value="rockstar.png">Rockstar</option>
          <option value="signalhill.png">Signal Hill</option>
          <option value="stage.png">Stage</option>
          <option value="doge.png">Doge</option>
          <option value="treble.png">Treble Clef</option>
        </select>
      </form>

      <div className="loginbox">
        <h2>Register</h2>
        <div className="userbox">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="passbox">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
          />
        </div>
        <button className="btn" onClick={addUser}>
          Log In
        </button>
      </div>
      <div className="loggedInUser">
        <img
          src={`/avatars/${user.userAvatar}`}
          className="headerAvatar"
          alt="Your user avatar"
        />
        <h2>{user.userName}</h2>
      </div>
    </div>
  );
}

export default Register;
