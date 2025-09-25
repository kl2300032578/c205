import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.clear(); // ✅ clears email, role, isLoggedIn, etc.
    navigate("/login");
  };

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1); // go back if history exists
    } else {
      navigate("/"); // otherwise go home
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.leftLinks}>
        {/* Show Back button only if NOT on Home page */}
        {location.pathname !== "/" && (
          <button style={styles.btn} onClick={handleBack}>
            ⬅ Back
          </button>
        )}
      </div>

      <div style={styles.rightLinks}>
        {isLoggedIn ? (
          <>
            <Link style={styles.btn} to="/orders">
              Orders
            </Link>
            <button style={styles.btn} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link style={styles.btn} to="/">
            Home
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#007bff",
  },
  leftLinks: {
    display: "flex",
    gap: "15px",
  },
  rightLinks: {
    display: "flex",
    gap: "15px",
  },
  btn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100px",
    height: "40px",
    border: "none",
    borderRadius: "5px",
    background: "#fff",
    color: "#007bff",
    cursor: "pointer",
    fontWeight: "bold",
    textDecoration: "none",
    fontSize: "16px",
  },
};

export default Navbar;
