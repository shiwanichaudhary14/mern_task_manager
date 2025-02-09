import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  return (
    <nav>
      <h1>Task Manager</h1>
      {token ? (
        <button onClick={handleLogout}>Logout</button>
      ) : location.pathname !== "/login" ? ( 
        <button onClick={() => navigate("/login")}>Login</button>
      ) : null}
    </nav>
  );
}

Navbar.propTypes = {
  token: PropTypes.string,
  setToken: PropTypes.func.isRequired,
};

export default Navbar;

