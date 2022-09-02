import React, { useEffect, useState } from "react";
import "./Navbar.css";
import Cookies from "js-cookie";
import Overview from "../dashboard/Overview";

function Navbar({ setHeaders, headers }) {
  let [string, setString] = useState("Login");
  let [logout, setLogout] = useState(false);

  let handleLogout = () => {
    setLogout(!logout);
  };

  useEffect(() => {
    if (Cookies.get("auth") !== undefined) {
      setString(JSON.parse(Cookies.get("auth")).uid);
    } else setString("Login");
  }, [headers]);

  return (
    <header>
      <div className="top-nav-container">
        <div className="nav-flex">
          <div className="logo">
            <h1>cryptracker</h1>
          </div>
          <div className="account-dropdown">
            <a
              className="name-dropdown"
              onClick={() => {
                handleLogout();
              }}
            >
              <span className="account-name">{string}</span>
              <b className="caret"></b>
            </a>
            {logout === true ? (
              <ul className="dropdown-menu" id="dropdown-menu">
                <li
                  className="logout"
                  id="logout"
                  onClick={() => {
                    Cookies.remove("auth");
                    setHeaders(false);
                    window.location.reload(false);
                  }}
                >
                  Logout
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="bot-nav-container"></div>
      </div>
    </header>
  );
}

export default Navbar;
