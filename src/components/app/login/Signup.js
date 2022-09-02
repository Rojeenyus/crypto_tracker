import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";

function Signup({
  setBody,
  setPassword,
  setEmail,
  email,
  password,
  setHeaders,
}) {
  const [repassword, setRepassword] = useState("");
  const url = "https://crypto-tracker-ada97.herokuapp.com/auth";
  let data = {};
  const cookies = new Cookies();

  function register(email, password, repassword) {
    data = {
      email: email,
      password: password,
      password_confirmation: repassword,
    };
  }

  let handleSubmit = async () => {
    register(email, password, repassword);
    console.log("loading please wait");
    try {
      const response = await axios.post(url, data);
      let datas = {
        "access-token": response.headers["access-token"],
        uid: response.headers.uid,
        client: response.headers.client,
        expiry: response.headers.expiry,
      };
      cookies.set("auth", datas);
      setHeaders(true);
      console.log(response.headers);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div className="login-body">
      <div>
        <h1>cryptracker</h1>
      </div>
      <div>
        <div className="login-form-title" style={{ width: "100%" }}>
          Your Crypto-Wallet Upgrade
        </div>
        <form
          className="login-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
