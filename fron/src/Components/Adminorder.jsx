import React, { useEffect, useState } from "react";
import "./Adminorder.css";
import Dropdown from '../Reuse/Dropdown'
import axios from "axios";

export default function Adminorder() {
  const [data,setdata]= useState();

  useEffect(()=>{
      axios.get('https://ecom-mern-seven.vercel.app/Allorders')
      .then((res)=>{setdata(res.data); console.log(res.data)})
  },[])


  return (
    <>
      <div>
        <div className="Title5">
          <h6 className="Title-p5">Order Id</h6>
          <h6>Products</h6>
          <h6>Date</h6>
          <h6 className="Title-s5">Status</h6>
        </div>
        {data && data.map((ele)=>(
        <div className="list5">
          <h6>{ele.userOrderNumber}</h6>
          <h6 style={{marginLeft:"50px"}}>{ele.products.length}</h6>
          <div>
          <h6 style={{marginLeft:"100px"}}>Date : {ele.createdAt.slice(0,8)}</h6>
          <h6 style={{marginLeft:"100px"}}>Time : {ele.createdAt.slice(10,22)}</h6>
          </div>
          <Dropdown status={ele.status} OrderNumber={ele.userOrderNumber} />
        </div>))
         }
      </div>
    </>
  );
}
