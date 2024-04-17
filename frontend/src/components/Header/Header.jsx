import React from "react";
import "./header.css";
function Header() {
  return (
    <>
      <div className="header">
        <div className="header-content">
          <h2>Order your favourite food here.</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nesciunt
            nulla voluptates iusto ullam quae. Explicabo fuga possimus expedita
            odio molestias. Quaerat, repellendus? Voluptate delectus architecto
            vero nostrum laborum? Ducimus, magnam.
          </p>
          <a href="#explore-menu"><button>View Menu &nbsp; &rarr;</button></a>
        </div>
      </div>
    </>
  );
}

export default Header;
