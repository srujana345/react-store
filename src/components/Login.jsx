import React, {  useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { appContext } from "../App";

export default function Login() {
  const Navigate = useNavigate();
  const { user, setUser } = useContext(appContext);
  const [msg, setMsg] = useState();
  const API = process.env.REACT_APP_API;

  const handleSubmit = async () => {
    try {
      const url = `${API}/api/user/login`;
      
      Navigate("/");
    } catch (err) {
      console.log(err);
      setMsg("Something went wrong");
    }
  };

  return (
    <div className="App-Login-Row">
      <div>
        <h2>Login Form</h2>
        {msg && <p style={{ color: "red" }}>{msg}</p>}
        <p>
          <input
            type="text"
            placeholder="Email address"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </p>
        <p>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, pass: e.target.value })}
          />
        </p>
        <p>
          <button onClick={handleSubmit}>Log In</button>
        </p>
        <p>
          <Link to="../register">New User? Register Here</Link>
        </p>
      </div>
    </div>
  );
}
