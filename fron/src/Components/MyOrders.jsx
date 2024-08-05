import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import Dropdown from "../Reuse/Dropdown";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

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
      <div style={{marginBottom:"250px"}}>
        <h2 className="Title-8">My Order</h2>
        <div className="Title6">
          <h6 className="Title-p6">Order Id</h6>
          <h6>Products</h6>
          <h6>Date</h6>
          <h6>Time</h6>
          <h6 className="Title-s6">Status</h6>
        </div>
        {!data && (
          <CircularProgress style={{display:"flex",justifyContent:"center",width:"100%"}}/>
        )}
        {data &&
          data.map((ele,index) => (
            <div className="list6">
              <h6 className="Size-6">{ele.userOrderNumber.slice(4,-4)}</h6>
              <h6 className="Size-6 place" style={{ marginRight: "40px" }}>{ele.products.length}</h6>

              <h6 className="Size-6" style={{ marginLeft: "0px" }}>
                {ele.createdAt.slice(0, 8)}
              </h6>
              <h6 className="Size-6" style={{ marginLeft: "00px" }}>
                {ele.createdAt.slice(10, 22)}
              </h6 >
              {ele.status === "pending" ?(<h6 className="Size-6" style={{marginRight:"10px"}}>Arriving</h6>):(<h6 className="Size-6" style={{marginRight:"10px"}}>Shipped</h6>)}
            </div>
          ))}
      </div>
    </>
  );
}
