import React, { useState } from "react";
import "./loginPopup.css";
import { assets } from "../../assets/assets";
function LoginPopup({ setShowLogin }) {
  const [currState, setCurrState] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(true);
  
  return (
    <>
      <div className="login">
        <form className="login-container">
          <div className="login-title">
            <h2>{currState}</h2>
            <img
              onClick={() => setShowLogin(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <div className="login-inputs">
            {currState === "Sign Up" ? (
              <input type="text" placeholder="Your name" required />
            ) : (
              <></>
            )}

            <input type="email" placeholder="Your email" required />
            <div className="password">
              <input
                type={showPassword ? 'password' : 'text'}
                placeholder={
                  currState === "Sign Up"
                    ? "Set your password"
                    : "Your password"
                }
                required
              />
              <p onClick={()=>setShowPassword(!showPassword)}>{showPassword? 'show' : 'hide'}</p>
            </div>
          </div>
          <button>
            {currState === "Sign Up" ? "Create account" : "Login"}
          </button>
          <div className="login-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to terms of use & privacy policy.</p>
          </div>
          {currState === "Sign Up" ? (
            <p>
              Already have an account?
              <span onClick={() => setCurrState("Login")}>Login</span>
            </p>
          ) : (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Sign up</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPopup;
