import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart({ cartvalue, setcartvalue }) {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  let userId = user.user._id;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`http://localhost:5000/cartProduct/${userId}`);
        setCartItems(response.data);
        setcartvalue(response.data.length)
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
  }, [deleteitem]);

  const getImage = (id) => {
    try {
      return require(`../Asset/${id}.png`);
    } catch (error) {
      return require("../Asset/66602d94694a904bfc6b9374.png");
    }
  };

  const navigate = useNavigate();

  const handleShop = () => {
    navigate('/');
  };

  const handleCheckout = () => {
    navigate('/billing');
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Number(newQuantity) >= 1 ? Number(newQuantity) : 1  
    }));
  };

  const updateCart = async () => {
    try {
      const updatedItems = cartItems.map(item => ({
        productId: item.productId,
        quantity: quantities[item.productId] || item.quantity
      }));

      const response = await axios.post(`http://localhost:5000/updateCart/${userId}`, {
        cartItems: updatedItems
      });

      console.log("Cart updated successfully:", response.data);

      const refetchedData = await axios.get(`http://localhost:5000/cartProduct/${userId}`);
      setCartItems(refetchedData.data);

    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
   async function deleteitem(id){
    console.log(userId)
    console.log(id)

    const result=await axios.delete(`http://localhost:5000/delete/${userId}/${id}`)
    console.log(result)
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: "100px",
            marginLeft: "100px",
            marginBottom: "20px",
            padding: "10px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}
        >
          <h6 style={{ marginLeft: "48px" }}>Product</h6>
          <h6>Price</h6>
          <h6>Quantity</h6>
          <h6 style={{marginRight: "17px"}}>Subtotal</h6>
        </div>

        {cartItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginRight: "100px",
              marginLeft: "100px",
              marginBottom: "20px",
              padding: "15px",
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            }}
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
              ></img>
              <h6
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
            <div style={{width: "170px"}}>
            <input
              type='number'
              style={{ width:"50px",border:"2px solid black",borderRadius:"5px" }}
              value={quantities[item.productId] || item.quantity}
              onChange={(e) => handleQuantityChange(item.productId, e.target.value)}
            />
              <DeleteIcon style={{marginLeft:"10px",marginBottom:"5px"}} onClick={()=>deleteitem(item.productId)}/>
            </div>
            <h6 style={{ paddingRight: "20px", fontWeight: "500", width: "70px" }}>
              ${item.price.slice(1) * (quantities[item.productId] || item.quantity)}
            </h6>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "60px",
          marginRight: "100px",
        }}
      >
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
      <div
        style={{
          marginTop: "50px",
          display: "flex",
          justifyContent: "space-between",
          marginLeft: "100px",
          marginRight: "100px",
          marginBottom: "50px"
        }}
      >
        <div>
          <input
            type="text"
            placeholder="Coupon Code"
            style={{
              padding: "10px",
              border: "1px solid black",
              fontWeight: "400",
              width: "250px",
              borderRadius: "5px"
            }}
          ></input>
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
            <h6>{/* Calculate subtotal */}</h6>
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
            <h6>{/* Calculate shipping cost */}</h6>
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
            <h6>{/* Calculate total cost */}</h6>
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
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
