import React from "react";
import "./header.css";
function Header() {
  return (
    <>
      <div className="header">
        <div className="header-backdrop">
          <div className="header-content">
          <h2>Mumbai style chinese restaurant.</h2>
          <p>
          Order your favourite food here.
           Explicabo fuga possimus expedita
            odio molestias. Quaerat, repellendus? Voluptate delectus architecto
            vero nostrum laborum? Ducimus, magnam.
          </p>
          <a href="#explore-menu"><button>View Menu &nbsp; &rarr;</button></a>
        </div> 
        </div>
       
      </div>
    </>
  );
}

export default Header;
