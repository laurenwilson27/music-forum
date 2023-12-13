import React, { useState, useEffect } from 'react';

function UserRegisterComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    console.log('Username:', username);
    console.log('Password:', password);
    const apiUrl = "./music-forum/src/components/userData.json";
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Data sent to the API:', data);
      })
      .catch(error => {
        console.error('Error sending data to the API:', error);
      });
  }, [username, password]);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

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
        <button class="btn" onclick="UserInputComponent">Log In</button>
    </div>
  );
}

export default UserRegisterComponent;