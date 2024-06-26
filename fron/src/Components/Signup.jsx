import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


export default function Signup() {
    const[User,setUser]=useState([]);
    const[Name,SetName]=useState();
    const[pass,setpassword]=useState([]);
    const navigate=useNavigate();

    function verify(){
       axios.post('https://ecom-mern-seven.vercel.app/register',{name:Name,email:User,password:pass})
       .then((res)=>{
        console.log(res.data)
        if(res.data){
          localStorage.setItem('user',JSON.stringify(res.data))
          navigate("/")
        }
       })
    }
    
  

  return (
    <>
      <div style={{ marginTop: "50px", marginBottom: "50px", display: "flex" }}>
        <img
          src="image.png"
          alt="logo"
          style={{ height: "481px", width: "605px",marginTop: "60px" }}
        ></img>
        <div style={{ margin: "100px" }}>
          <h1 style={{marginBottom:"20px"}}>Create an account</h1>
          <span style={{ fontWeight: "500"}}>Enter your details below</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px",marginTop:"20px" }}>
            <input
              type="text"
              placeholder="Name"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e)=>SetName(e.target.value)}
              value={Name}
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="text"
              placeholder="Email or Phone Number"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e)=>setUser(e.target.value)}
              value={User}
            ></input>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <input
              type="text"
              placeholder="Password"
              style={{
                padding: "10px",
                border: "none",
                borderBottom: "2px solid black",
                margin: "10px",
              }}
              onChange={(e)=>setpassword(e.target.value)}
              value={pass}
            ></input>
            <div style={{marginLeft:"10px",marginTop:"20px"}}>
            <button type="button" class="btn btn-danger" style={{width:"300px"}} onClick={verify}>Create Account</button>
             <h6 style={{marginLeft:"120px",marginTop:"10px",cursor:"pointer"}} onClick={()=>{navigate("/login")}}>Log In</h6>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
