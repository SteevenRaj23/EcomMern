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
import Payment from "./Components/Payment";
import Add from "./Components/Add"

function App() {
  const[cartvalue,setcartvalue]=useState();
  const [amount, setAmount] = useState(0); 
 
 
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
          <Route path="/display/:id" element={ <Display cartvalue={cartvalue} setcartvalue={setcartvalue} amount={amount} setAmount={setAmount}/>} />
          <Route path="/cart" element={ <Cart cartvalue={cartvalue} setcartvalue={setcartvalue}  amount={amount} setAmount={setAmount}/>} />
          <Route path="/billing" element={<Checkout/> } />
          <Route path="/Contact" element={  <Contact/> } />
          <Route path="/Payment" element={  <Payment amount={amount} setAmount={setAmount}/> } />
          <Route path="/admin" element={<Add></Add>}/>
        </Routes>
        <Footer />
      </BrowserRouter>
     

  </>
  );
}

export default App;
