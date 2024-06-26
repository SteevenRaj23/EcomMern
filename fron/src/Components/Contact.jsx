import React, { useState } from "react";
import Alert from "@mui/material/Alert";

export default function Contact() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setsubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    setsubmit(true)
    setTimeout((()=>{
      setsubmit(false)   
    }),1000)
    setFormData(initialFormData);
  };

  return (
    <>
      {!submitted && (
        <>
          <div className="container" style={{ display: "flex" }}>
            <div style={{ backgroundColor: "white", padding: "20px" }}>
              <div>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="20" fill="#DB4444" />
                    <path
                      d="M18.5542 14.24L15.1712 10.335C14.7812 9.885 14.0662 9.887 13.6132 10.341L10.8312 13.128C10.0032 13.957 9.76623 15.188 10.2452 16.175C13.1069 22.1 17.8853 26.8851 23.8062 29.755C24.7922 30.234 26.0222 29.997 26.8502 29.168L29.6582 26.355C30.1132 25.9 30.1142 25.181 29.6602 24.791L25.7402 21.426C25.3302 21.074 24.6932 21.12 24.2822 21.532L22.9182 22.898C22.8484 22.9712 22.7565 23.0194 22.6566 23.0353C22.5567 23.0512 22.4543 23.0339 22.3652 22.986C20.1357 21.7021 18.2862 19.8502 17.0052 17.619C16.9573 17.5298 16.9399 17.4272 16.9558 17.3272C16.9717 17.2271 17.02 17.135 17.0932 17.065L18.4532 15.704C18.8652 15.29 18.9102 14.65 18.5542 14.239V14.24Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      marginLeft: "10px",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Call To Us
                  </span>
                  <p style={{ marginTop: "10px" }}>
                    We are available 24/7, 7 days a week.
                  </p>
                  <p>Phone: +8801611112222</p>
                </div>
                <hr></hr>
                <div>
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="40" height="40" rx="20" fill="#DB4444" />
                    <path
                      d="M10 13L20 20L30 13M10 27H30V13H10V27Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      marginLeft: "10px",
                      fontWeight: "600",
                      fontSize: "20px",
                    }}
                  >
                    Write To US
                  </span>
                  <p style={{ marginTop: "10px" }}>
                    We are available 24/7, 7 days a week.
                  </p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>
            </div>
            <div
              style={{
                marginLeft: "50px",
                backgroundColor: "white",
                padding: "20px",
              }}
            >
              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: "15px" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      padding: "10px",
                      color: "#7D8184",
                    }}
                    onChange={handleChange}
                    value={formData.name}
                  ></input>
                  <input
                    type="text"
                    name="email"
                    placeholder="Your Email"
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      padding: "10px",
                      color: "#7D8184",
                    }}
                    onChange={handleChange}
                    value={formData.email}
                  ></input>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Your Phone"
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      padding: "10px",
                      color: "#7D8184",
                    }}
                    onChange={handleChange}
                    value={formData.phone}
                  ></input>
                </div>
                <div class="form-group" style={{ marginTop: "35px" }}>
                  <textarea
                    class="form-control"
                    rows="5"
                    name="message"
                    placeholder="Your Message"
                    id="comment"
                    style={{
                      backgroundColor: "#F5F5F5",
                      border: "none",
                      width: "630px",
                      height: "200px",
                    }}
                    onChange={handleChange}
                    value={formData.message}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    marginTop: "20px",
                    backgroundColor: "#DB4444",
                    border: "none",
                    width: "150px",
                    marginLeft: "480px",
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </>
      )}
      {submitted && (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"200px",marginBottom:"200px"}}>
          <Alert variant="filled" severity="success">
             Thanks for contacting
          </Alert>
        </div>
      )}
    </>
  );
}
