import { useEffect, useState } from "react";

function Register() {
  const [users, setUsers] = useState([]);
  // var [users, setUsers] = useState(users.id);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const userFromServer = await fetchUser();
      setUsers(userFromServer);
    };
    getUser();
  }, []);

  const fetchUser = async (id) => {
    const res = await fetch(`http://localhost:7000/users`);
    const data = await res.json();
    return data;
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const addUser = async () => {
    const newUser = { username, password };

    const res = await fetch("http://localhost:7000/users", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newUser),
    });

    const data = await res.json();
    setUsers((prevUsers) => [...prevUsers, data]);
  };

  return (
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
  );
}

export default Register;
