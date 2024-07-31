import React from "react";
import "./About.css";

function About() {
  return (
    <>
      <div className="About">
        <div className="Container">
          <h1 className="title" style={{ marginBottom: "30px" }}>
            Our Story
          </h1>
          <p className="Info">
            Launched in 2015, Exclusive is South Asia's premier online shopping
            marketplace with an active presence in Bangladesh. Supported by a
            wide range of tailored marketing, data, and service solutions,
            Exclusive has 10,500 sellers and 300 brands and serves 3 million
            customers across the region.
            <br />
            <br />
            Exclusive has more than 1 million products to offer, growing at a
            very fast rate. Exclusive offers a diverse assortment in categories
            ranging from consumer electronics to household items.
          </p>
        </div>
        <div className="Imgtag">
          <img
            className="Img"
            src="https://th.bing.com/th/id/OIP.L3nRdDxJ52HPH2u-LooaFAHaIR?rs=1&pid=ImgDetMain"
          />
        </div>
      </div>
      <div className="footer">
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src="s1.png" size={50} />
          <h3>10.5k</h3>
          <div>Sallers active our site</div>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src="s2.png"
            size={50}
            style={{
              backgroundColor: "black",
              color: "white",
              borderRadius: "50%",
            }}
          />
          <h3>33k</h3>
          <div>Monthly Product sale</div>
        </div>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img src="s4.png" size={50} />
          <h3>45k</h3>
          <div>Products</div>
        </div>
      </div>
    </>
  );
}

export default About;
