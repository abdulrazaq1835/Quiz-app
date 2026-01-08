import React, { useState } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { MenuIcon, X } from "lucide-react";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handlelogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.clear();
    } catch (error) {}
  };

 const toggleMenu = ()=>{
 setMenuOpen(!menuOpen)

 }
 const closeMenu =()=>{
  setMenuOpen(false)
 }

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

  {/* // menu iccon */}

       {menuOpen ? (
        <X className="menu-icon" size={28} onClick={toggleMenu}/>
       ):(
        <MenuIcon className="menu-icon" size={28} onClick={toggleMenu}/> 
       )}

{/* moblile menu */}













      </div>
    </nav>
  );
};

export default Navbar;
