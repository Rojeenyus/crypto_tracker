import React, { useState } from "react";
import "./Login.css";

function Signup({ setBody, setPassword, setEmail, email, password }) {
  const [repassword, setRepassword] = useState("");
  return (
    <div className="login-body">
      <div>
        <h1>cryptracker</h1>
      </div>
      <div>
        <div className="login-form-title" style={{ width: "100%" }}>
          Your Crypto-Wallet Upgrade
        </div>
        <form className="login-form">
          <div className="j-field">
            <label>Email address</label>
            <div className="j-field__input-wrapper">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div id="account-match" style={{ color: "red", display: "none" }}>
            email already taken
          </div>
          <div id="mobile-match" style={{ color: "red", display: "none" }}>
            mobile number already taken
          </div>
          <div className="j-field">
            <label>Password</label>
            <div className="j-field__input-wrapper">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div id="pw-match" style={{ color: "red", display: "none" }}>
              password doesnt match
            </div>
            <label>Retype Password</label>
            <div className="j-field__input-wrapper">
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                required
              />
            </div>
            <div id="req-match" style={{ color: "red", display: "none" }}>
              please fill the required fields properly
            </div>
          </div>
          <button
            id="submit-button"
            type="submit"
            className="j-button j-button--primary"
          >
            Create account
          </button>
        </form>
        <div className="login-form__footer">
          <span>
            Already have an account?
            <a
              className="link"
              onClick={() => {
                setBody("login");
              }}
            >
              {" "}
              Click here to login
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
