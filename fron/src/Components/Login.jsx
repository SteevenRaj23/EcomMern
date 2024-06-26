import React from "react";
import { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';


export default function Login({cartvalue,setcartvalue}) {
    const[User,setUser]=useState([]);
    const[pass,setpassword]=useState([]);
    const[show,hide]=useState(false)

    const navi=useNavigate();
    function verify(){
       axios.post('https://ecom-mern-seven.vercel.app/login',{email:User,password:pass})
       .then((res)=>{

        console.log(res.data.user._id)
        if(res.data.user){
          localStorage.setItem('user',JSON.stringify(res.data))
          navi('/')
             axios.get(`https://ecom-mern-seven.vercel.app/cartProduct/${res.data.user._id}`).then((res) => {
             console.log(res.data.length);
             setcartvalue(res.data.length);
            });  
        }
        else
        {
         
          hide(true)
          setTimeout(()=>{hide(false)},2000)
        }
       })
    }
    


  return (
    <>
      <div style={{ marginTop: "50px", marginBottom: "60px", display: "flex" }}>
        <img
          src="image.png"
          alt="logo"
          style={{ height: "481px", width: "605px" }}
        ></img>
          
        <div style={{ margin: "80px" }}>
        
          <h1 style={{marginBottom:"20px"}}>Log in to Exclusive</h1>
          <span style={{ fontWeight: "500"}}>Enter your details below</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px",marginTop:"20px" }}>
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
            <button type="button" class="btn btn-danger" style={{width:"100px"}} onClick={verify}>Log in</button>
            <span style={{marginLeft:"100px",color:"#DB4444"}}>Forget Password?</span>
            {show &&
            <div style={{marginTop:"30px",position:"absolute",marginLeft:"50px"}}>
              <Alert severity="error">Invalid credentials</Alert>
            </div>
             }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
