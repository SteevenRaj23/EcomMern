import React, { useEffect, useState } from "react";
import Card from "../Reuse/Card";
import axios from "axios";
import "./Home.css";
import { Navigate, useNavigate } from "react-router-dom";
import Display from "./Display";

const Home = () => {
  const [data, setdata] = useState([]);

console.log(JSON.parse(localStorage.getItem('auth')))

  useEffect(() => {
    axios
      .get("https://ecom-mern-seven.vercel.app/displayProduct")
      .then((res) => {
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

  let navigate = useNavigate();

  function display(ele) {
    const user = localStorage.getItem("user");
    if (user) {
      console.log(user);
      navigate(`/Display/${ele._id}`);
    } else {
      navigate("/login");
    }
  }

  const getImage = (id) => {
    try {
      return require(`../Asset/${id}.png`);
    } catch (error) {
      return require("../Asset/66602d94694a904bfc6b9374.png");
    }
  };

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
              className="d-block w-100 Img"
              src="Untitled.png"
              alt="First slide"
            />
          </div>
          <div className="carousel-item ">
            <img
              className="d-block w-100 Img"
              src="https://img.freepik.com/premium-vector/best-season-sale-banner-design-template_2239-1175.jpg?w=826"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100 Img"
              src="https://img.freepik.com/free-vector/flat-horizontal-sale-banner-template-with-photo_23-2149000923.jpg?w=826&t=st=1718019966~exp=1718020566~hmac=c8d8bfc6b35fbe0ba4d6e7870d5e59fd90b5e84e5129c7f67d1b15d250b02fd1"
              alt="Third slide"
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
      <div className="Heading">
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
      <div className="carddetails">
        {data.slice(0, 4).map((ele, index) => (
          <Card
            img={getImage(ele._id)}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={() => {
              display(ele);
            }}
          />
        ))}
      </div>
      <div className="Heading">
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
      <div className="carddetails">
        {data.slice(4, 8).map((ele, index) => (
          <Card
            img={getImage(ele._id)}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={() => {
              display(ele);
            }}
          />
        ))}
      </div>
      <div className="carddetails">
        {data.slice(8,12).map((ele, index) => (
          <Card
            img={getImage(ele._id)}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={() => {
              display(ele);
            }}
          />
        ))}
      </div>
      <div className="carddetails">
        {data.slice(12).map((ele, index) => (
          <Card
            img={ele.image}
            title={ele.title}
            price={ele.price}
            rating={ele.rating}
            onclick={() => {
              display(ele);
            }}
          />
        ))}
      </div>
      <div className="Support">
        <img src="support.png" alt="" style={{ width: "50%" }}></img>
      </div>
    </>
  );
};

export default Home;
