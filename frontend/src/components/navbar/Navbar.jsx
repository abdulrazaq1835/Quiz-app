import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlelogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.clear();
    } catch (error) {}
  };

  return (
    <nav className="nav">
      <div className="heading">
        <h2>Quiz Karo</h2>
      </div>
      <div className="btn-box">
        <NavLink
          className={({ isActive }) =>
            isActive ? "result-btn active" : "result-btn"
          }
          to={"/result"}
        >
          Result
        </NavLink>

        {loggedIn ? (
          <button onClick={handlelogout} className="login-btn">
            Loguot
          </button>
        ) : (
          <NavLink to={"/login"} className="login-btn">
            Login
          </NavLink>
        )}
      </div>

      <div>
        
      </div>
    </nav>
  );
};

export default Navbar;
