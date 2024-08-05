import React, { useState,useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";

import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Navbar({cartvalue,setcartvalue}) {
  const [isopen, setisopen] = useState(false);
  const [count,setcount]=useState(0);
  
  
  const auth = localStorage.getItem("user");

  let navigate = useNavigate();

  function handle() {
    localStorage.clear();
    navigate("/");
    setcartvalue(0)
  }
  function opencart() {
    if(auth){
      navigate("/cart");
    }
    else{
      navigate("/login");
    }
  }



  useEffect(()=>{
    function fetchdata(){
      if(auth){
      console.log(JSON.parse(auth).user._id)
      const _id=JSON.parse(auth).user._id;
      axios.get(`https://ecom-mern-seven.vercel.app/cartProduct/${_id}`)
      .then((res)=>{
          console.log(res.data.length)
          setcount(res.data.length)
      })
     }} 
    fetchdata();   
  },[])
  
 

  function myOrder(){
    navigate("/MyOrders");
  }

  return (
    <>
      <div>
        <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-around py-3 mb-4 border-bottom">
          <h6
            style={{ fontWeight: "bolder", fontSize: "20px", marginTop: "5px" }}
          >
            Exclusive
          </h6>

          <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link to="/" class="nav-link px-2 link-dark">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Contact" class="nav-link px-2 link-dark">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/About" class="nav-link px-2 link-dark">
                About
              </Link>
            </li>
            <li>
              {!auth && (
                <Link to="/SignUp" class="nav-link px-2 link-dark">
                  Sign Up
                </Link>
              )}
            </li>
            <li>
              {auth && (
                <Link to="/" class="nav-link px-2 link-dark" onClick={handle}>
                  Log out
                </Link>
              )}
            </li>
          </ul>
          {/* <Search style={{ backgroundColor: "#FEFAF1" }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          <div
            className="add-to-cart"
            style={{
              position: "relative",
              top: 0,
              right: 20,
              zIndex: 20,
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <i
              className="fa fa-shopping-cart"
              style={{ fontSize: "24px", color: "#000" }}
            ></i> */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              onClick={() => opencart()}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M8.25 20.25C8.66421 20.25 9 19.9142 9 19.5C9 19.0858 8.66421 18.75 8.25 18.75C7.83579 18.75 7.5 19.0858 7.5 19.5C7.5 19.9142 7.83579 20.25 8.25 20.25Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.75 20.25C19.1642 20.25 19.5 19.9142 19.5 19.5C19.5 19.0858 19.1642 18.75 18.75 18.75C18.3358 18.75 18 19.0858 18 19.5C18 19.9142 18.3358 20.25 18.75 20.25Z"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M2.25 3.75H5.25L7.5 16.5H19.5"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.5 12.5H19.1925C19.2792 12.5001 19.3633 12.4701 19.4304 12.4151C19.4975 12.3601 19.5434 12.2836 19.5605 12.1986L20.9105 5.44859C20.9214 5.39417 20.92 5.338 20.9066 5.28414C20.8931 5.23029 20.8679 5.18009 20.8327 5.13717C20.7975 5.09426 20.7532 5.05969 20.703 5.03597C20.6528 5.01225 20.598 4.99996 20.5425 5H6"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            <span
              className="cart-count"
              style={{
                marginLeft: "5px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={() => opencart()}
            >
              {cartvalue == null ? count : cartvalue}
           
            </span>
            {auth && (
              <>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "10px" }}
                  // onMouseOver={() => setisopen(true)}
                  // onMouseLeave={() => setisopen(false)}
                  onClick={()=>{myOrder()}}
                >
                  <rect width="32" height="32" rx="16" fill="#DB4444" />
                  <path
                    d="M21 23V21.3333C21 20.4493 20.691 19.6014 20.1408 18.9763C19.5907 18.3512 18.8446 18 18.0667 18H12.9333C12.1554 18 11.4093 18.3512 10.8592 18.9763C10.309 19.6014 10 20.4493 10 21.3333V23"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 15C17.6569 15 19 13.6569 19 12C19 10.3431 17.6569 9 16 9C14.3431 9 13 10.3431 13 12C13 13.6569 14.3431 15 16 15Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <h6 style={{marginLeft:"8px",marginTop:"4px",textTransform:"capitalize"}}>{JSON.parse(auth).user.name}</h6>
                { isopen &&(
                  <>
                    <div
                      style={{
                        position: "absolute",
                        top: "40px",
                        right: "5px",
                        color: "white",
                        width: "200px",
                        background: "white",
                        background:
                          "linear-gradient(rgb(42 42 42 / 47%) 0%, rgb(52 48 48 / 61%) 50%, rgb(39 37 40 / 64%) 100%)",
                       
                      }}
                    >
                      <ul style={{padding:"8px",display:"flex",flexDirection:"column",gap:"5px"}}>
                        <li style={{ listStyleType: "none" }}>
                          <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{marginRight:"2px",marginBottom: 0}}
                          >
                            <path
                              d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Manage My Account
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{marginRight:"5px",marginLeft:"3px"}}
                          >
                            <path
                              d="M3 6.3V20.5C3 20.7652 3.10536 21.0196 3.29289 21.2071C3.48043 21.3946 3.73478 21.5 4 21.5H20C20.2652 21.5 20.5196 21.3946 20.7071 21.2071C20.8946 21.0196 21 20.7652 21 20.5V6.3H3Z"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M21 6.3L18.1665 2.5H5.8335L3 6.3M15.7775 9.6C15.7775 11.699 14.0865 13.4 12 13.4C9.9135 13.4 8.222 11.699 8.222 9.6"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          My Order
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{marginRight:"5px",marginLeft:"3px"}}
                          >
                            <g clip-path="url(#clip0_803_458)">
                              <path
                                d="M8 16L12 12M16 8L11.9992 12M11.9992 12L8 8M12 12L16 16"
                                stroke="#FAFAFA"
                                stroke-width="1.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <circle
                                cx="12"
                                cy="12"
                                r="11.25"
                                stroke="white"
                                stroke-width="1.5"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_803_458">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                          My Cancellations
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{marginRight:"5px",marginLeft:"3px"}}
                          >
                            <path
                              d="M19.8284 9.93621C20.4517 9.93621 20.7176 10.7286 20.2205 11.1046L16.8905 13.6234C16.1688 14.1693 15.8661 15.1087 16.1334 15.9732L17.3864 20.0261C17.5735 20.6312 16.8729 21.1193 16.3701 20.7341L13.3075 18.3879C12.536 17.7969 11.464 17.7969 10.6925 18.3879L7.61357 20.7466C7.11152 21.1312 6.41161 20.645 6.59677 20.0403L7.83243 16.0046C8.09532 15.146 7.79694 14.2145 7.08413 13.6684L3.73432 11.1022C3.24111 10.7244 3.50831 9.93621 4.12961 9.93621H8.12744C9.07024 9.93621 9.90305 9.32198 10.1815 8.42125L11.379 4.5479C11.5678 3.93721 12.4322 3.93722 12.621 4.5479L13.8185 8.42124C14.0969 9.32198 14.9298 9.93621 15.8726 9.93621H19.8284Z"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                            />
                          </svg>
                          My Reviews
                        </li>
                        <li style={{ listStyleType: "none" }}>
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{marginRight:"5px",marginLeft:"3px"}}
                          >
                            <path
                              d="M4 12H13.5M6 15L3 12L6 9M11 7V6C11 5.46957 11.2107 4.96086 11.5858 4.58579C11.9609 4.21071 12.4696 4 13 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H13C12.4696 20 11.9609 19.7893 11.5858 19.4142C11.2107 19.0391 11 18.5304 11 18V17"
                              stroke="#FAFAFA"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          Logout
                        </li>
                      </ul>
                    </div>
                  </>
                )}
              </>
            )}
            {!auth && (
              <>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "10px" }}
                >
                  <path
                    d="M24 27V24.3333C24 22.9188 23.5224 21.5623 22.6722 20.5621C21.8221 19.5619 20.669 19 19.4667 19H11.5333C10.331 19 9.17795 19.5619 8.32778 20.5621C7.47762 21.5623 7 22.9188 7 24.3333V27"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16.5 14C18.9853 14 21 11.9853 21 9.5C21 7.01472 18.9853 5 16.5 5C14.0147 5 12 7.01472 12 9.5C12 11.9853 14.0147 14 16.5 14Z"
                    stroke="black"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </>
            )}
          </div>
        </header>
      </div>
    </>
  );
}
