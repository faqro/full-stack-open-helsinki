import PropTypes from 'prop-types'

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password
}) => (
  <div>
    <h2>Login</h2>

    <form onSubmit={handleSubmit}>
      <div>
                username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          id="username"
        />
      </div>
      <div>
                password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          id="password"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
}

export default LoginForm