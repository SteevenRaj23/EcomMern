import React, { useState } from "react";
import axios from "axios";

const AddProductForm = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("price", price);
      formData.append("rating", rating);
      formData.append("image", image);

      const response = await axios.post(
        "http://localhost:5000/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setMessage(response.data.message);
      setTitle("");
      setPrice("");
      setRating("");
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product");
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>
        Add Product
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          marginBottom: "20px",
          margin: "0 auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          backgroundColor: "#f9f9f9",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="text"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          required
          style={{
            marginBottom: "10px",
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "3px",
            fontSize: "16px",
          }}
        />
        <br />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={{ marginBottom: "10px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "12px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Add Product
        </button>
      </form>
      {message && (
        <p
          style={{
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "3px",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProductForm;
