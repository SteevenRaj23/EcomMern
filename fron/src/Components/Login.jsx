import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Login.css";

export default function Login({ cartvalue, setcartvalue }) {
  const [User, setUser] = useState("");
  const [pass, setpassword] = useState("");
  const [show, hide] = useState(false);
  const [userError, setUserError] = useState("");
  const [passError, setPassError] = useState("");

  const navi = useNavigate();

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function verify() {
    let valid = true;

    setUserError("");
    setPassError("");

    if (!User) {
      setUserError("Email or phone number is required.");
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
      axios
        .post("https://ecom-mern-seven.vercel.app/login", {
          email: User,
          password: pass,
        })
        .then((res) => {
          console.log(res);
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data));
            navi("/");
            axios
              .get(
                `https://ecom-mern-seven.vercel.app/cartProduct/${res.data.user._id}`
              )
              .then((res) => {
                console.log(res.data.length);
                setcartvalue(res.data.length);
              });
          } else {
            hide(true);
            setTimeout(() => {
              hide(false);
            }, 2000);
          }
        });
    }
  }

  function Signup() {
    navi("/Signup");
  }

  return (
    <>
      <div className="Main">
        <img className="Main-imgg" src="image.png" alt="logo"></img>

        <div className="Login">
          <h1 style={{ marginBottom: "20px" }}>Log in to Exclusive</h1>
          <span style={{ fontWeight: "500" }}>Enter your details below</span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              marginTop: "20px",
            }}
          >
            <input
              type="text"
              placeholder="Email or Phone Number"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e) => setUser(e.target.value)}
              value={User}
            ></input>
            {userError && (
              <span style={{ color: "red", marginLeft: "10px" }}>
                {userError}
              </span>
            )}
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
            {passError && (
              <span style={{ color: "red", marginLeft: "10px" }}>
                {passError}
              </span>
            )}
            <div style={{ marginLeft: "10px", marginTop: "20px" }}>
              <button
                type="button"
                className="btn btn-danger"
                style={{ width: "100px" }}
                onClick={verify}
              >
                Log in
              </button>
              <span className="Forget" style={{}}>
                Forget Password?
              </span>

              {show && (
                <div
                  style={{
                    marginTop: "60px",
                    position: "absolute",
                    marginLeft: "50px",
                  }}
                >
                  <Alert severity="error">Invalid credentials</Alert>
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="btn btn-danger size"
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: "white",
              color: "red",
            }}
            onClick={Signup}
          >
            Create Account
          </button>
        </div>
      </div>
    </>
  );
}
