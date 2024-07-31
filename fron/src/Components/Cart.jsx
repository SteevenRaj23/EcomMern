import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "./Cart.css";

export default function Cart({ cartvalue, setcartvalue, amount, setAmount }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user.user._id;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `https://ecom-mern-seven.vercel.app/cartProduct/${userId}`
        );
        setCartItems(response.data);
        setcartvalue(response.data.length);
        const initialQuantities = response.data.reduce((acc, item) => {
          acc[item.productId] = item.quantity;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    fetchData();
  }, [userId, setcartvalue]);

  const getImage = useCallback((id) => {
    try {
      return require(`../Asset/${id}.png`);
    } catch (error) {
      return "https://via.placeholder.com/40";
    }
  }, []);

  const navigate = useNavigate();

  const handleShop = () => {
    navigate("/");
  };

  const handleCheckout = (val) => {
    setAmount(val);
    navigate("/billing");
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Number(newQuantity) >= 1 ? Number(newQuantity) : 1,
    }));
  };

  const updateCart = async () => {
    try {
      const updatedItems = cartItems.map((item) => ({
        productId: item.productId,
        quantity: quantities[item.productId] || item.quantity,
      }));

      console.log(updatedItems);
      const response = await axios.post(
        `https://ecom-mern-seven.vercel.app/updateCart/${userId}`,
        {
          cartItems: updatedItems,
        }
      );

      console.log("Cart updated successfully:", response.data);

      const refetchedData = await axios.get(
        `https://ecom-mern-seven.vercel.app/cartProduct/${userId}`
      );
      setCartItems(refetchedData.data);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const result = await axios.delete(
        `https://ecom-mern-seven.vercel.app/delete/${userId}/${id}`
      );
      console.log(result);

      const updatedData = await axios.get(
        `https://ecom-mern-seven.vercel.app/cartProduct/${userId}`
      );
      setCartItems(updatedData.data);
      setcartvalue(updatedData.data.length);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const calculateSubtotal = () => {
    return cartItems
      .reduce((total, item) => {
        return (
          total +
          item.price.slice(1) * (quantities[item.productId] || item.quantity)
        );
      }, 0)
      .toFixed(2);
  };

  return (
    <>
      <div>
        <div className="Title">
          <h6 className="Title-p">Product</h6>
          <h6>Price</h6>
          <h6>Quantity</h6>
          <h6 className="Title-s">Subtotal</h6>
        </div>

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="list"
          >
            <div
              style={{
                width: "220px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={getImage(`${item.productId}`)}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
              <h6
                className="ProductName"
                style={{
                  fontWeight: "500",
                  padding: "8px",
                  marginLeft: "10px",
                  marginBottom: "0px",
                }}
              >
                {item.title}
              </h6>
            </div>
            <h6
              style={{
                paddingRight: "10px",
                width: "174px",
                fontWeight: "500",
              }}
            >
              {item.price}
            </h6>
            <div style={{ width: "170px" }}>
              <input
                type="number"
                style={{
                  width: "50px",
                  border: "2px solid black",
                  borderRadius: "5px",
                }}
                value={quantities[item.productId] || item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.productId, e.target.value)
                }
              />
              <DeleteIcon
                style={{
                  marginLeft: "10px",
                  marginBottom: "5px",
                  cursor: "pointer",
                }}
                onClick={() => deleteItem(item.productId)}
              />
            </div>
            <h6
              style={{ paddingRight: "20px", fontWeight: "500", width: "70px" }}
            >
              $
              {item.price.slice(1) *
                (quantities[item.productId] || item.quantity)}
            </h6>
          </div>
        ))}
      </div>
      <div className="Update">
        <button
          type="button"
          className="btn btn-primary"
          style={{
            marginTop: "10px",
            backgroundColor: "#FFFFFF",
            color: "black",
            fontWeight: "500",
            border: "1px solid black",
            width: "220px",
            height: "50px",
            marginLeft: "40px",
          }}
          onClick={handleShop}
        >
          Return to Shop
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{
            marginTop: "10px",
            backgroundColor: "#FFFFFF",
            color: "black",
            fontWeight: "500",
            border: "1px solid black",
            width: "220px",
            height: "50px",
            marginLeft: "40px",
          }}
          onClick={updateCart}
        >
          Update Cart
        </button>
      </div>
      <div className="Checkout">
        <div className="Coupon">
          <input
            type="text"
            placeholder="Coupon Code"
            style={{
              padding: "10px",
              border: "1px solid black",
              fontWeight: "400",
              width: "250px",
              borderRadius: "5px",
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{
              backgroundColor: "#DB4444",
              border: "none",
              width: "220px",
              height: "48px",
              marginLeft: "40px",
            }}
          >
            Apply Coupon
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            border: "2px solid black",
            width: "350px",
            height: "270px",
            marginBottom: "10px",
            gap: "3px",
            padding: "10px",
            marginLeft: "10px",
          }}
        >
          <h5 style={{ padding: "10px", paddingTop: "20px" }}>Cart Total</h5>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
              paddingLeft: "10px",
              borderBottom: "1px solid grey",
              paddingBottom: "8px",
            }}
          >
            <h6 style={{}}>Subtotal:</h6>
            <h6>${calculateSubtotal()}</h6>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
              paddingLeft: "10px",
              borderBottom: "1px solid grey",
              paddingBottom: "8px",
              paddingTop: "8px",
            }}
          >
            <h6 style={{}}>Shipping:</h6>
            <h6>Free Shipping</h6>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingRight: "10px",
              paddingLeft: "10px",
              paddingTop: "10px",
            }}
          >
            <h6 style={{}}>Total:</h6>
            <h6>${calculateSubtotal()}</h6>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              marginTop: "10px",
              backgroundColor: "#DB4444",
              border: "none",
              width: "220px",
              marginLeft: "40px",
            }}
            onClick={() => handleCheckout(calculateSubtotal())}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
