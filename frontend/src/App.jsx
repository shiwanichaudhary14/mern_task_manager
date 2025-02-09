import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";  //  Import Register Component
import Tasks from "./components/Tasks";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <Router>
      {token && <Navbar token={token} setToken={setToken} />}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} /> {/*  Add Register Route */}
        <Route path="/" element={token ? <Tasks token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
