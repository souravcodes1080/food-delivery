import React from "react";
import "./appDownload.css";
import { assets } from "../../assets/assets";
function AppDownload() {
  return (
    <>
      <div className="app-download" id="app-download">
        <p>For Better Experience Download<br />Tomato App</p> 
        
        <div className="app-download-platform">
          <img src={assets.play_store} alt="play store" />
          <img src={assets.app_store} alt="app store" />
        </div>
      </div>
    </>
  );
}

export default AppDownload;
