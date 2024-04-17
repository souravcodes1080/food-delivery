import React from "react";
import "./footer.css";
import { assets } from "../../assets/assets";
function Footer() {
  return (
    <>
      <div className="footer" id="contact-us">
        <div className="footer-content">
          <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Perspiciatis earum eum libero iure voluptatem. Placeat omnis
              necessitatibus amet pariatur numquam?
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
                <li>tomato.contact@gmail.com</li>
            </ul>
          </div>
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 @ Tomato.com - All Right Reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
