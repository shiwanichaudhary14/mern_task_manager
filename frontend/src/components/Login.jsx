import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      console.error(" Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>Don&apos;t have an account? <button onClick={() => navigate("/register")}>Register</button></p>
    </div>
  );
}

// Added PropTypes validation
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
