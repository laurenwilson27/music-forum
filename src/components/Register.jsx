import { useEffect } from 'react';

function Register() {
  useEffect(() => {
    const getUser = async() => {
      const userFromServer = await fetchUser();
      setUser(userFromServer);
    };
    getUser();
  }, []);

    const fetchUser = async(id) => {
      const res = await fetch(`http://localhost:5000/user/${id}`);
      const data = await res.json();
      return data;
    }

  setUser(
    users.map((user) => 
    user.id === id ? {...user, reminder: !user.reminder} : user
    )
  )
};

const addUser = async (user) => {
  const res = await fetch("http://localhost:5000/user", 
    {method: 'POST', headers:{"Content-type":"application/json"},
    body: JSON.stringify(user),
  });

  const data = await res.json();
  setUsers([...user, data]);
}

return (
  <div className="loginbox">
      <h2>Register</h2>
      <div className="userbox">
          <label htmlFor="username">Username:</label>
          <input type="text"
              id="username" 
              value={username} 
              onChange={handleUsernameChange} 
              placeholder="Enter your username" />
      </div>
      <div className="passbox">
          <label htmlFor="password">Password:</label>
          <input type="password" 
              id="password" 
              value={password} 
              onChange={handlePasswordChange} 
              placeholder="Enter your password" />
      </div>
      <button class="btn" onclick={addUser}>Log In</button>
  </div>
);


export default Register;
