import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <header>
      <div className="top-nav-container">
        <div className="nav-flex">
          <div className="logo">
            <h1>cryptracker</h1>
          </div>
          <div className="account-dropdown">
            <a className="name-dropdown">
              <span className="account-name">Login</span>
            </a>
          </div>
        </div>
        <div className="bot-nav-container"></div>
      </div>
    </header>
  );
}

export default Navbar;
