import "./App.css";
import Login from "./components/app/login/Login";
import Navbar from "./components/app/navbar/Navbar";
import React, { useState, useEffect } from "react";
import Signup from "./components/app/login/Signup";
import Cookies from "js-cookie";
import Dashboard from "./components/app/dashboard/Dashboard";
import Wallet from "./components/app/wallet/Wallet";
import Loading from "./components/app/loading/Loading";

function App() {
  let [body, setBody] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [headers, setHeaders] = useState(false);
  let [walletNumber, setWalletNumber] = useState();
  let [loading, setLoading] = useState(false);
  let [loadPage, setLoadPage] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth") !== undefined) {
      setBody("dashboard");
    } else setBody("login");
  }, [headers]);

  return (
    <div className="App">
      <Navbar setHeaders={setHeaders} headers={headers} />
      {loadPage ? <Loading /> : ""}
      {body === "login" ? (
        <Login
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          setHeaders={setHeaders}
          loading={loading}
          setLoading={setLoading}
        />
      ) : body === "signup" ? (
        <Signup
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          setHeaders={setHeaders}
          loading={loading}
          setLoading={setLoading}
        />
      ) : body === "dashboard" ? (
        <Dashboard
          setBody={setBody}
          setWalletNumber={setWalletNumber}
          loading={loading}
          setLoading={setLoading}
          setLoadPage={setLoadPage}
        />
      ) : body === "wallet" ? (
        <Wallet
          setBody={setBody}
          walletNumber={walletNumber}
          loading={loading}
          setLoading={setLoading}
          setLoadPage={setLoadPage}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
