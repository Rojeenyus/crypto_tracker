import "./App.css";
import Login from "./components/app/login/Login";
import Navbar from "./components/app/navbar/Navbar";
import React, { useState, useEffect } from "react";
import Signup from "./components/app/login/Signup";
import Cookies from "js-cookie";
import Dashboard from "./components/app/dashboard/Dashboard";

function App() {
  let [body, setBody] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [headers, setHeaders] = useState(false);

  useEffect(() => {
    if (Cookies.get("auth") !== undefined) {
      setBody("dashboard");
    } else setBody("login");
  }, [headers]);

  return (
    <div className="App">
      <Navbar setHeaders={setHeaders} headers={headers} />
      {body === "login" ? (
        <Login
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          setHeaders={setHeaders}
        />
      ) : body === "signup" ? (
        <Signup
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
          setHeaders={setHeaders}
        />
      ) : body === "dashboard" ? (
        <Dashboard />
      ) : body === "wallet" ? (
        ""
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
