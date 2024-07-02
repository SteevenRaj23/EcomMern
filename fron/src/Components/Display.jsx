import React, { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Navbar from "./Navbar";

export default function Display({ cartvalue, setcartvalue,amount,setAmount }) {
  const [data, setdata] = useState();
  const [cart, setcart] = useState(0);
  const [success, setsuccess] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const sizes = ["XS", "S", "M", "L", "XL"];

  const { id } = useParams();

  let navi = useNavigate();

  useEffect(() => {
    axios
      .get(`https://ecom-mern-seven.vercel.app/display/${id}`)
      .then((res) => {
        console.log(res.data);
        setdata(res.data);
      });
  }, []);

  var rating = 0;
  if (data) {
    rating = data.rating;
  }

  const validRating = Math.min(Math.max(rating, 0), 5);
  const stars = Array.from({ length: 5 }, (v, i) => i < validRating);

  const getImage = (id) => {
    try {
      return require(`../Asset/${id}.png`);
    } catch (error) {
      return require("../Asset/66602d94694a904bfc6b9374.png");
    }
  };

  const imgSrc = getImage(id);

  function ADD() {
    let user = localStorage.getItem("user");
    user = JSON.parse(user);
    console.log(data);
    setsuccess(true);
    setTimeout(() => {
      setsuccess(false);
    }, 1000);
    axios
      .post("https://ecom-mern-seven.vercel.app/cartProduct", {
        userId: user.user._id,
        productId: data._id,
        title: data.title,
        price: data.price,
        rating: data.rating,
      })
      .then((res) => {
        console.log(res.data);
        setcart(cart + 1);
      });
  }

  useEffect(() => {
    function fetchdata() {
      let user = localStorage.getItem("user");
      user = JSON.parse(user);
      let iid = user.user._id;
      axios
        .get(`https://ecom-mern-seven.vercel.app/cartProduct/${iid}`)
        .then((res) => {
          console.log(res.data.length);
          setcartvalue(res.data.length);
        });
    }
    fetchdata();
  }, [cart]);

   function buyNow(){
    console.log(data.price.slice(1))
    setAmount(data.price.slice(1))
     navi("/billing")
   }
  return (
    <>
      {data && (
        <div
          style={{
            marginLeft: "50px",
            display: "flex",
            marginBottom: "50px",
            gap: "40px",
          }}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <img
              src={imgSrc}
              alt=""
              style={{ width: "130px", height: "110px" }}
            ></img>
            <img
              src={imgSrc}
              alt=""
              style={{ width: "130px", height: "110px" }}
            ></img>
            <img
              src={imgSrc}
              alt=""
              style={{ width: "130px", height: "110px" }}
            ></img>
            <img
              src={imgSrc}
              alt=""
              style={{ width: "130px", height: "110px" }}
            ></img>
          </div>
          <div>
            {success && (
              <div
                style={{
                  position: "absolute",
                  zIndex: "10",
                  marginTop: "200px",
                  marginLeft: "130px",
                }}
              >
                <Alert variant="filled" severity="success">
                  Successfully Added to Cart
                </Alert>
              </div>
            )}
            <img
              src={imgSrc}
              alt=""
              style={{
                position: "relative",
                zIndex: "-1",
                height: "470px",
                width: "500px",
              }}
            ></img>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>{data.title}</h4>
            <div>
              {stars.map((isFilled, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${isFilled ? "checked" : ""}`}
                  style={{ color: isFilled ? "#ffc107" : "#808080a3" }}
                ></span>
              ))}
            </div>
            <h4>{data.price}</h4>
            {data.dress && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginTop: "20px",
                  borderTop: "1px solid grey",
                }}
              >
                <h5 style={{ marginTop: "10px" }}>Size:</h5>
                {sizes.map((size) => (
                  <span
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      marginTop: "10px",
                      padding: "5px",
                      boxShadow:
                        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                      cursor: "pointer",
                      color: selectedSize === size ? "red" : "black",
                      border:
                        selectedSize === size
                          ? "1px solid red"
                          : "1px solid black",
                    }}
                  >
                    {size}
                  </span>
                ))}
              </div>
            )}
            <div style={{ margin: "20px", display: "flex", gap: "10px" }}>
              <button
                type="button"
                class="btn btn-danger"
                onClick={buyNow}
              >
                Buy Now
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => ADD()}
              >
                Add to Cart
              </button>
            </div>
            <div
              style={{
                border: "1px solid #afa8a8",
                padding: "10px",
                borderTopLeftRadius: "6px 6px",
                borderTopRightRadius: "6px 6px",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "15px" }}
              >
                <g clip-path="url(#clip0_261_4843)">
                  <path
                    d="M11.6673 31.6667C13.5083 31.6667 15.0007 30.1743 15.0007 28.3333C15.0007 26.4924 13.5083 25 11.6673 25C9.82637 25 8.33398 26.4924 8.33398 28.3333C8.33398 30.1743 9.82637 31.6667 11.6673 31.6667Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M28.3333 31.6667C30.1743 31.6667 31.6667 30.1743 31.6667 28.3333C31.6667 26.4924 30.1743 25 28.3333 25C26.4924 25 25 26.4924 25 28.3333C25 30.1743 26.4924 31.6667 28.3333 31.6667Z"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.33398 28.3335H7.00065C5.89608 28.3335 5.00065 27.4381 5.00065 26.3335V21.6668M3.33398 8.3335H19.6673C20.7719 8.3335 21.6673 9.22893 21.6673 10.3335V28.3335M15.0007 28.3335H25.0007M31.6673 28.3335H33.0007C34.1052 28.3335 35.0007 27.4381 35.0007 26.3335V18.3335M35.0007 18.3335H21.6673M35.0007 18.3335L30.5833 10.9712C30.2218 10.3688 29.5708 10.0002 28.8683 10.0002H21.6673"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8 28H6.66667C5.5621 28 4.66667 27.1046 4.66667 26V21.3333M3 8H19.3333C20.4379 8 21.3333 8.89543 21.3333 10V28M15 28H24.6667M32 28H32.6667C33.7712 28 34.6667 27.1046 34.6667 26V18M34.6667 18H21.3333M34.6667 18L30.2493 10.6377C29.8878 10.0353 29.2368 9.66667 28.5343 9.66667H21.3333"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 11.8182H11.6667"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M1.81836 15.4545H8.48503"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 19.0909H11.6667"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_261_4843">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                Free Delivery
              </span>
            </div>
            <div
              style={{
                border: "1px solid #afa8a8",
                borderTop: "none",
                padding: "10px",
                borderBottomLeftRadius: "6px 6px",
                borderBottomRightRadius: "6px 6px",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ marginLeft: "15px" }}
              >
                <g clip-path="url(#clip0_261_4865)">
                  <path
                    d="M33.3327 18.3334C32.9251 15.4004 31.5645 12.6828 29.4604 10.5992C27.3564 8.51557 24.6256 7.18155 21.6888 6.80261C18.752 6.42366 15.7721 7.02082 13.208 8.5021C10.644 9.98337 8.6381 12.2666 7.49935 15M6.66602 8.33335V15H13.3327"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66602 21.6667C7.07361 24.5997 8.43423 27.3173 10.5383 29.4009C12.6423 31.4845 15.3731 32.8185 18.3099 33.1974C21.2467 33.5764 24.2266 32.9792 26.7907 31.4979C29.3547 30.0167 31.3606 27.7335 32.4994 25M33.3327 31.6667V25H26.666"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_261_4865">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
                Return Delivery
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
