import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Signup.css';

export default function Signup() {
  const [User, setUser] = useState("");
  const [Name, SetName] = useState("");
  const [pass, setpassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function verify() {
    let valid = true;

    setNameError("");
    setUserError("");
    setPassError("");
    setSignupError("");

    if (!Name) {
      setNameError("Name is required.");
      valid = false;
    }

   
    if (!User) {
      setUserError("Email is required.");
      valid = false;
    } else if (!validateEmail(User)) {
      setUserError("Please enter a valid email.");
      valid = false;
    }

    if (!pass) {
      setPassError("Password is required.");
      valid = false;
    } else if (pass.length < 6) {
      setPassError("Password must be at least 6 characters long.");
      valid = false;
    }

    if (valid) {
      axios.post('https://ecom-mern-seven.vercel.app/register', { name: Name, email: User, password: pass })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data));
            navigate("/");
          }
        })
        .catch((error) => {
          setSignupError("An error occurred during registration. Please try again.");
          console.error("Signup error:", error);
        });
    }
  }

  return (
    <>
      <div className="box">
        <img
          src="image.png"
          alt="logo"
          className="Image"
        ></img>
        <div className="box2">
          <h1 style={{ marginBottom: "20px" }}>Create an account</h1>
          <span style={{ fontWeight: "500" }}>Enter your details below</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "20px" }}>
            <input
              type="text"
              placeholder="Name"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e) => SetName(e.target.value)}
              value={Name}
            ></input>
            {nameError && <span style={{ color: "red", marginLeft: "10px" }}>{nameError}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="text"
              placeholder="Email"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e) => setUser(e.target.value)}
              value={User}
            ></input>
            {userError && <span style={{ color: "red", marginLeft: "10px" }}>{userError}</span>}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="password"
              placeholder="Password"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e) => setpassword(e.target.value)}
              value={pass}
            ></input>
            {passError && <span style={{ color: "red", marginLeft: "10px" }}>{passError}</span>}
            <div style={{ marginLeft: "10px", marginTop: "20px" }}>
              <button type="button" className="btn btn-danger" style={{ width: "300px" }} onClick={verify}>Create Account</button>
              <h6 style={{ marginLeft: "120px", marginTop: "10px", cursor: "pointer" }} onClick={() => { navigate("/login") }}>Log In</h6>
            </div>
            {signupError && <span style={{ color: "red", marginTop: "20px" }}>{signupError}</span>}
          </div>
        </div>
      </div>
    </>
  );
}
