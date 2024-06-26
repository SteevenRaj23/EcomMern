import React from "react";
import "./Card.css";

export default function Card({ img, title, price, rating,onclick }) {
  const validRating = Math.min(Math.max(rating, 0), 5);
  const stars = Array.from({ length: 5 }, (v, i) => i < validRating);


  return (
    <>
      <div class="card" onClick={onclick}  style={{ width: "16rem", border: "none",cursor:"pointer" }}>
        <img src={img} class="card-img-top" alt="..." />

        <div class="card-body">
          <h6 class="card-title" style={{ fontWeight: "bold" }}>
            {title}
          </h6>
          <p class="card-text" style={{ color: "#e25353", fontWeight: "500" }}>
            {price}
          </p>
          <div>
            <div>
              {stars.map((isFilled, index) => (
                <span
                  key={index}
                  className={`fa fa-star ${isFilled ? "checked" : ""}`}
                  style={{ color: isFilled ? "#ffc107" : "#808080a3" }}
                ></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
