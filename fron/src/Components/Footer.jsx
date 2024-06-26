import React from "react";
import "./Footer.css";
export default function footer() {
  return (
    <>
      <div className="footer-container" style={{backgroundColor:"black"}}>
        <footer className="py-5 " style={{paddingRight:"40px",paddingLeft:"40px"}}>
          <div className="row" style={{justifyContent: "center"}}>
            <div className="col-2 text-white">
              <h5>Exclusive</h5>
              <ul className="nav flex-column ">
                <li className="nav-item mb-2 ">
                  <a href="#" className="nav-link p-0 text-white">
                    Subscribe
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a href="#" className="nav-link p-0 text-white">
                    Get 10% off your first order
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2 text-white">
              <h5>Support</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                  111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                  exclusive@gmail.com
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                  +88015-88888-9999
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2 text-white">
              <h5>Account</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    my Account
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Login/Register
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-2 text-white">
              <h5>Quick Link</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-2 text-white">
              <h5>Download</h5>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Home
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Features
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    Pricing
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>

         
          </div>

          <div className="d-flex justify-content-center py-4 my-4 border-top text-white">
            <p>© 2024 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex">
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#twitter"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-dark" href="#">
                  <svg className="bi" width="24" height="24">
                    <use xlinkHref="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}
