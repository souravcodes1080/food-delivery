import React, { useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
function Navbar() {
  const [menu, setMenu] = useState("home");
  return (
    <>
      <div className="navbar">
        <img src={assets.logo} className="logo" alt="logo" />
        <ul className="navbar-menu">
          <li
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </li>
          <li
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            Menu
          </li>
          <li
            className={menu === "mobileapp" ? "active" : ""}
            onClick={() => setMenu("mobileapp")}
          >
            Mobile App
          </li>
          <li
            className={menu === "contactus" ? "active" : ""}
            onClick={() => setMenu("contactus")}
          >
            Contact Us
          </li>
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
