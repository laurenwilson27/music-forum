function LogIn() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('music-forum/src/db.json/users')
    .then(response => response.json())
    .then(users => {
      var isValidUser = users.some(user => user.username === username && user.password === password);

      if (isValidUser) {
        alert('Login successful!');
      } else {
        alert('Invalid username or password. Please try again.');
      }
    })
    .catch(error => console.error('Error fetching users:', error));
}

return (
  <div className="LogIn">
    <form id="loginForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required>
      </input>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required>
      </input>

      <button type="button" onclick="login()">Login</button>
    </form>
  </div>
);

export default LogIn;
