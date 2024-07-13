import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <>
      <div className="footer" id="contact-us">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo2} alt="logo" width={"290px"}/>
            <p>
              Mumbai style chinese restaurant. Order food online. We only have one branch currently and deliver within the radius of 10km only.
            </p>
            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="fb" />
              <img src={assets.linkedin_icon} alt="ln" />
              <img src={assets.twitter_icon} alt="tw" />
            </div>
          </div>
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
            </ul>
          </div>
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 67690 98264</li>
                <li>contact@thh.com</li>
                <li>Salbari, Sukna, Siliguri, West Bengal, IN - 734001</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 @ thh.com - All Right Reserved.
        </p>
        <p>This project is purely for educational purposes, no real business transactions are involved. All food data is owned by The Hungry Helper Group.</p>
      </div>
    </>
  );
}

export default Footer;
