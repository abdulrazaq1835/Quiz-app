import React from "react";
import "./navbar.css";
import {NavLink} from 'react-router-dom'

const Navbar = () => {
  return (
      <nav className="nav">
      
          <h2>Quiz Karo</h2>    
          <div className="btn-box">

         <NavLink className={({isActive})=> isActive ? "result-btn active": "result-btn"} to={'/result'}>


         Result</NavLink>
        </div>
       
      </nav>
 
  );
};

export default Navbar;
