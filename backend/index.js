const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product = require('./db/Product');
const cartProduct = require('./db/cartProduct');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello from Express!');
  });
  

app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            resp.send({ user });
        } else {
            resp.send({ result: "user not found" });
        }
    } else {
        resp.send({ result: "user not found" });
    }
});


app.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (name && email && password) {
        try {
            const newUser = new User({ name, email, password });
            let result = await newUser.save();
            result = result.toObject();
            delete result.password;
            res.send({ user:result });
        } catch (error) {
            console.error(error);
            res.status(500).send({ result: "Internal server error" });
        }
    } else {
        res.send({ result: "Name, email, and password are required" });
    }
});


app.get("/displayProduct", async (req, resp) => {
    let product = await Product.find();
    if (product.length > 0) {
        resp.send(product);
    } else {
        resp.send({ result: "No Products found" });
    }
});

app.get("/display/:id",async(req,resp)=>{
    let _id= req.params.id
    console.log({_id})
    
    if(_id.length<24){
      return resp.json({httpCode:400,error:'Error Not Found'})
    }
    const result=await Product.findOne({_id});
   if(result){
      resp.send(result)
   }else
   {
    resp.send({result:"not found"})
   }
})

app.post("/cartProduct",async(req,resp)=>{
    console.log(req.body)

    try{
        const {userId}= req.body;
        let cart=await cartProduct.findOne({userId});

        if(cart){
            const {title} = req.body;
            let carttitle=await cartProduct.findOne({title,userId})
            if(cart && carttitle){
            carttitle.quantity += 1;
            const result = await carttitle.save();
            resp.send(result);
            }else{
                const newcart=new cartProduct(req.body);
                const result =await newcart.save();
                resp.send(result); 
            }
        } else{
            const newcart=new cartProduct(req.body);
            const result =await newcart.save();
            resp.send(result); 
        }

    }
    catch(error){
        console.error("Error adding product to cart:", error);
        resp.status(500).send("Internal Server Error");
    }
})

app.get("/cartProduct/:id",async(req,resp)=>{
    let userId= req.params.id   
    console.log(userId)
        
    if(userId.length<24){
        return resp.json({httpCode:400,error:'Error Not Found'})
      }
      const result=await cartProduct.find({userId});
     if(result){
        resp.send(result)
     }else
     {
      resp.send({result:"not found"})
     }

})

app.delete("/delete/:userId/:productId",async(req,resp)=>{
    let userId= req.params.userId;
    let productId= req.params.productId;
 
    if(userId.length<24){
        return resp.json({httpCode:400,error:'Error Not Found'})
      }
      
    const res=await cartProduct.deleteOne({userId,productId})
    resp.send(res)
   
})


app.post("/updateCart/:userId", async (req, res) => {
    const userId = req.params.userId;
    const { cartItems } = req.body; 

    if (userId.length < 24) {
        return res.status(400).json({ error: 'Invalid user ID' });
    }

    try {
        for (const item of cartItems) {
            const { productId, quantity } = item;

            if (productId.length < 24) {
                return res.status(400).json({ error: 'Invalid product ID' });
            }

            if (quantity <= 0) {
               
                await cartProduct.deleteOne({ userId, productId });
            } else {
                
                const existingCartItem = await cartProduct.findOne({ userId, productId });
                if (existingCartItem) {
                    existingCartItem.quantity = quantity;
                    await existingCartItem.save();
                } else {
                  
                    const newCartItem = new cartProduct({
                        userId,
                        productId,
                        quantity
                    });
                    await newCartItem.save();
                }
            }
        }

        res.json({ message: "Cart updated successfully" });
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


app.listen(5000, () => {
    console.log("Server is running on port 5000");
});




