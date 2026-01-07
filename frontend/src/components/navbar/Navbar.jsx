import React from "react";
import "./navbar.css";
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
      <nav className="nav">
      
        <div className="heading">
            <h2>Quiz Karo</h2>
          </div>    
          <div className="btn-box">

         <NavLink className={({isActive})=> isActive ? "result-btn active": "result-btn"} to={'/result'}>


         Result</NavLink>

      <NavLink className={({isActive})=> isActive ? "login-btn active": "login-btn"} to={'/result'}>


         LogIn</NavLink>

        </div>
       
      </nav>
 
  );
};

export default Navbar;
