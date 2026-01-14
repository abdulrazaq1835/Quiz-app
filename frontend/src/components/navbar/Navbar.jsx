import React, { useState, useEffect } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ Check if user is logged in on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handlelogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userName");
      localStorage.clear();
      setLoggedIn(false);
      setMenuOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="nav">
      <div className="heading">
        <h2>Quiz Karo</h2>
      </div>
      
      <div className="btn-box">
        {/* Desktop Buttons */}
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
            Logout
          </button>
        ) : (
          <NavLink to={"/login"} className="login-btn">
            Login
          </NavLink>
        )}

        {/* Menu Icon */}
        {menuOpen ? (
          <X className="menu-icon" size={28} onClick={toggleMenu} />
        ) : (
          <MenuIcon className="menu-icon" size={28} onClick={toggleMenu} />
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mob-menu">
          <ul className="ul">
            <li>
              <NavLink
                className={({ isActive }) => isActive ? "active" : ""}
                onClick={closeMenu}
                to={"/result"}
              >
                My Result
              </NavLink>
            </li>
            <li>
              {loggedIn ? (
                <button onClick={handlelogout} className="logout-btn">
                  Logout
                </button>
              ) : (
                <NavLink
                  onClick={closeMenu}
                  to={"/login"}
                >
                  Login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;