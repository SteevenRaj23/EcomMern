import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import Dropdown from "../Reuse/Dropdown";
import axios from "axios";

export default function MyOrders() {
  const [data, setdata] = useState();

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user.user._id;
    axios.get(`https://ecom-mern-seven.vercel.app/Orders/${userId}`).then((res) => {
      setdata(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <>
      <div>
        <h2 style={{ marginLeft: "100px", marginBottom: "30px" }}>My Order</h2>
        <div className="Title6">
          <h6 className="Title-p6">Order Id</h6>
          <h6>Products</h6>
          <h6>Date</h6>
          <h6>Time</h6>
          <h6 className="Title-s6">Status</h6>
        </div>
        {data &&
          data.map((ele) => (
            <div className="list6">
              <h6>{ele.userOrderNumber}</h6>
              <h6 style={{ marginRight: "40px" }}>{ele.products.length}</h6>

              <h6 style={{ marginLeft: "0px" }}>
                {ele.createdAt.slice(0, 8)}
              </h6>
              <h6 style={{ marginLeft: "00px" }}>
                {ele.createdAt.slice(10, 22)}
              </h6>
              {ele.status === "pending" ?(<h6 style={{marginRight:"10px"}}>Arriving</h6>):(<h6 style={{marginRight:"10px"}}>Shipped</h6>)}
            </div>
          ))}
      </div>
    </>
  );
}
