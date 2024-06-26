import React, { useEffect, useState } from "react";
import Card from "../Reuse/Card";
import axios from "axios";
import {Navigate, useNavigate} from 'react-router-dom'
import Display from "./Display";

const Home = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get("https://ecom-mern-seven.vercel.app/displayProduct").then((res) => {
      console.log(res);
      setdata(res.data);
    });
  }, []);

  useEffect(() => {
    const carouselElement = document.getElementById(
      "carouselExampleIndicators"
    );
    if (carouselElement) {
      const carousel = new window.bootstrap.Carousel(carouselElement, {
        interval: 2000,
        wrap: true,
      });
    }
  }, []);
  
  let navigate=useNavigate();

  function display(ele){
    const user=localStorage.getItem('user')
    if(user){
    console.log(user)
    navigate(`/Display/${ele._id}`)
    }
    else{
      navigate('/login')
    }
  }

  return (
    <>
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="Untitled.png"
              alt="First slide"
              style={{ objectFit: "contain", width: "800px", height: "300px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?w=826"
              alt="Second slide"
              style={{ objectFit: "contain", width: "800px", height: "300px" }}
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?w=826&t=st=1718019966~exp=1718020566~hmac=c8d8bfc6b35fbe0ba4d6e7870d5e59fd90b5e84e5129c7f67d1b15d250b02fd1"
              alt="Third slide"
              style={{ objectFit: "contain", width: "800px", height: "300px" }}
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Previous</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      <div style={{ marginLeft: "80px", marginTop: "50px" }}>
        <svg
          width="10"
          height="40"
          viewBox="0 0 20 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="40" rx="4" fill="#DB4444" />
        </svg>
        <span
          style={{
            color: "#e25353",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          This Month
        </span>
        <h4>Best Selling Products</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "40px",
        }}
      >
        {data.slice(0, 4).map((ele, index) => (
          <Card
            img={`${index}.png`}
            title={ele.title}
            price={ele.price}
            rating={ele.rating} 
            onclick={()=>{display(ele)}}
          />
        ))}
      </div>
      <div style={{ marginLeft: "80px", marginTop: "50px" }}>
        <svg
          width="10"
          height="40"
          viewBox="0 0 20 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="20" height="40" rx="4" fill="#DB4444" />
        </svg>
        <span
          style={{
            color: "#e25353",
            fontSize: "12px",
            fontWeight: "bold",
            marginLeft: "10px",
          }}
        >
          Our Products
        </span>
        <h4>Explore Our Products</h4>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "40px",
        }}
      >
           {data.slice(4,8).map((ele, index) => (
          <Card
            img={`${index+4}.png`}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={()=>{display(ele)}}
          />
        ))}
       
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "50px",
          marginTop: "40px",
        }}
      >
           {data.slice(8).map((ele, index) => (
          <Card
            img={`${index+8}.png`}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={()=>{display(ele)}}
          />
        ))}
       
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "80px",
          marginBottom: "80px",
          cursor:"pointer"
        }}
      >
        <img src="support.png" alt="" style={{ width: "50%" }}></img>
      </div>
    </>
  );
};

export default Home;
