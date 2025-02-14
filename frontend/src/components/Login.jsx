import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // To show login errors
  const navigate = useNavigate();

  // Set backend URL from environment variables
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, {
        username,
        password,
      });

      const token = response.data.token;
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/"); // Redirect to home after login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
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
      <p>
        Don&apos;t have an account?{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </p>
    </div>
  );
}

// PropTypes validation
Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
