import "./App.css";
import Login from "./components/app/login/Login";
import Navbar from "./components/app/navbar/Navbar";
import React, { useState } from "react";
import Signup from "./components/app/login/Signup";

function App() {
  let [body, setBody] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="App">
      <Navbar />
      {body === "login" ? (
        <Login
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
        />
      ) : body === "signup" ? (
        <Signup
          setBody={setBody}
          setEmail={setEmail}
          setPassword={setPassword}
          email={email}
          password={password}
        />
      ) : (
        "ho"
      )}
    </div>
  );
}

export default App;
