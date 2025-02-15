import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Ensure backend URL is correctly set
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const handleLogin = async (e) => {
    e.preventDefault(); //  Prevents page reload
    try {
      const response = await axios.post(`${backendURL}/api/auth/login`, 
        { username, password },  
        { withCredentials: true } // Ensure cookies are sent
    );

      const token = response.data.token;
      if (!token) throw new Error("No token received from backend");

      setToken(token);
      localStorage.setItem("token", token);
      console.log("Token stored successfully:");

      navigate("/"); // Redirect after login
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
      <input
        id="username"
        name="username"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        autoComplete="username"
      />
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />
      <button type="submit">Login</button>
     </form>
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

