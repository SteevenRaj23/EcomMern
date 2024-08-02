import React from "react";
import "./Adminorder.css";
import Dropdown from '../Reuse/Dropdown'

export default function Adminorder() {
  return (
    <>
      <div>
        <div className="Title">
          <h6 className="Title-p">Order Id</h6>
          <h6>Products</h6>
          <h6>Date</h6>
          <h6 className="Title-s">Status</h6>
        </div>
        <div className="list5">
          <h6>ORD-1722509397093-3081</h6>
          <h6 style={{marginLeft:"50px"}}>4</h6>
          <h6 style={{marginLeft:"100px"}}>2024-08-01</h6>
          <Dropdown/>
        </div>
      </div>
    </>
  );
}
