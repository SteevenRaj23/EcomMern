import "./App.css";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import Login from "./Components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./Components/Signup";
import Home from "./Components/Home";
import About from "./Components/About";
import { useState } from "react";
import Display from "./Components/Display";
import Cart from "./Components/Cart"
import Checkout from "./Components/Checkout";
import Contact from "./Components/Contact";

function App() {
  const[cartvalue,setcartvalue]=useState();
 
 
  return (
    <>
      <BrowserRouter>
        <Header />
        <Navbar cartvalue={cartvalue} setcartvalue={setcartvalue}/>      
        <Routes> 
          <Route path='/' element={<Home />}/>
          <Route path="/login" element={<Login cartvalue={cartvalue} setcartvalue={setcartvalue}/>} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/display/:id" element={ <Display cartvalue={cartvalue} setcartvalue={setcartvalue} />} />
          <Route path="/cart" element={ <Cart cartvalue={cartvalue} setcartvalue={setcartvalue}/>} />
          <Route path="/billing" element={<Checkout/> } />
          <Route path="/Contact" element={  <Contact/> } />
        </Routes>
        <Footer />
      </BrowserRouter>
     

  </>
  );
}

export default App;
