import React, { useContext, useState } from "react";
import "./navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
function Navbar({ setShowLogin }) {
  const [menu, setMenu] = useState("home");
  const {getTotalCartAmount} = useContext(StoreContext)
  return (
    <>
      <div className="navbar">
        <Link to={"/"}>
          <img onClick={()=>setMenu('home')} src={assets.logo} className="logo" alt="logo" />
        </Link>
        <ul className="navbar-menu">
          <Link
            to="/"
            className={menu === "home" ? "active" : ""}
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
          <a
            href="#explore-menu"
            className={menu === "menu" ? "active" : ""}
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
          <a
            href="#app-download"
            className={menu === "mobileapp" ? "active" : ""}
            onClick={() => setMenu("mobileapp")}
          >
            Mobile App
          </a>
          <a
            href="#contact-us"
            className={menu === "contactus" ? "active" : ""}
            onClick={() => setMenu("contactus")}
          >
            Contact Us
          </a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" />
          <div className="navbar-search-icon">
            <Link to={"/cart"}>
              <img  onClick={() => setMenu("cart")} src={assets.bag_icon} alt="" />
            </Link>
            <div className={getTotalCartAmount() > 0 ?'dot': ''}></div>
          </div>
          <button onClick={() => setShowLogin(true)}>Sign In</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
