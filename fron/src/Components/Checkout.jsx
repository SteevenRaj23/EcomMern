import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Checkout.css";

export default function Checkout() {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    phoneNumber: "",
    city: "",
    emailAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navi = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form data submitted:", formData);
    if (formData) {
      navi("/payment");
    }
  };

  return (
    <div
      className="container"
      style={{ marginBottom: "100px", display: "flex" }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <h3>Billing Details</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>First Name</label>
            <input
              className="Label"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>Company Name</label>
            <input
              className="Label"
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>Street Address</label>
            <input
              className="Label"
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>
              Apartment, floor, etc (optional)
            </label>
            <input
              className="Label"
              type="text"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>Phone Number</label>
            <input
              className="Label"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>Town/City</label>
            <input
              className="Label"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label style={{ color: "#00000073" }}>Email Address</label>
            <input
              className="Label"
              type="text"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              style={{
                backgroundColor: "#F5F5F5",
                border: "none",
                height: "40px",
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#c42424",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
