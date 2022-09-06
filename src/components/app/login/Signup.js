import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Cookies from "universal-cookie";
import ReactLoading from "react-loading";

function Signup({
  setBody,
  setPassword,
  setEmail,
  email,
  password,
  setHeaders,
  loading,
  setLoading,
}) {
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState();
  const [error2, setError2] = useState(false);
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
    setLoading(true);
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
      setLoading(false);
      setError2(false);
    } catch (error) {
      setError(error.response.data.errors.full_messages[0]);
      setError2(true);
      setLoading(false);
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
            <label>Retype Password</label>
            <div className="j-field__input-wrapper">
              <input
                type="password"
                value={repassword}
                onChange={(e) => setRepassword(e.target.value)}
                required
              />
            </div>
            {error2 ? <div style={{ color: "red" }}>{error}</div> : ""}
          </div>
          {loading ? (
            <button disabled={true} className="j-button j-button--primary">
              <ReactLoading type="spin" height={"16px"} width={"16px"} />
            </button>
          ) : (
            <button type="submit" className="j-button j-button--primary">
              Create Account
            </button>
          )}
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
