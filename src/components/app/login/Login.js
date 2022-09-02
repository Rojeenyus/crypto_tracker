import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";

function Login({
  setBody,
  setPassword,
  setEmail,
  email,
  password,
  setHeaders,
}) {
  const url = "https://crypto-tracker-ada97.herokuapp.com/auth/sign_in";
  let data = {};
  const cookies = new Cookies();

  function login(email, password) {
    data = {
      email: email,
      password: password,
    };
  }

  let handleSubmit = async () => {
    login(email, password);
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
      <div className="login-details-container">
        <div className="login-details-flex">
          <div className="login-form-title">Welcome Back!</div>
          <form
            className="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="j-field j-field--error">
              <label>Email or Mobile Number</label>
              <div className="j-field__input-wrapper">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
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
            </div>
            <div id="account-match" style={{ color: "red", display: "none" }}>
              account/password does not match
            </div>
            <div id="no-input" style={{ color: "red", display: "none" }}>
              please fill the inputs
            </div>
            <button
              type="submit"
              className="j-button j-button--primary"
              id="submit-button"
            >
              Sign In
            </button>
          </form>
          <div className="login-form__footer">
            <div>
              <span> Don't have an Account? </span>
              <a
                className="link"
                onClick={() => {
                  setBody("signup");
                }}
              >
                {" "}
                Sign Up.{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
