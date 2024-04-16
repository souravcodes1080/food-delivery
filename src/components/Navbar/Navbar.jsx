import React from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
function Navbar() {
  return (
    <>
      <div className="navbar">
        <img src={assets.logo} className="logo" alt="logo" />
        <ul className="navbar-menu">
          <li>Home</li>
          <li>Menu</li>
          <li>Mobile App</li>
          <li>Contact Us</li>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <img src={assets.bag_icon} alt="" />
            <div className="dot"></div>
          </div>
          <button>Sign In</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
