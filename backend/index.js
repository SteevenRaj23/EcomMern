const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product = require('./db/Product');
const cartProduct = require('./db/cartProduct');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Prod=require('./db/Prod')
const cloudinary = require('cloudinary').v2;
const Jwt=require('jsonwebtoken');
const jwtKey="steve";

cloudinary.config({
    cloud_name: 'dhjdvfk3t',
    api_key: '383646353243778',
    api_secret: '8OfXx5QL4_CQOu561_P63HOR6g8'
});


const app = express();

app.use(express.json());
app.use(cors());


cloudinary.config({
    cloud_name: 'dhjdvfk3t',
    api_key: '383646353243778',
    api_secret: '8OfXx5QL4_CQOu561_P63HOR6g8'
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post("/login", async (req, resp) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({user},jwtKey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    return resp.send({result:"something went Wrong"})

                }
                resp.send({user,auth:token})
            })
            
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
            if(result){
                Jwt.sign({newUser},jwtKey,{expiresIn:"2h"},(err,token)=>{
                    if(err){
                        return res.send({result:"something went Wrong"})
                    }
                    res.send({user:result,auth:token})
                })
            }
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

app.get("/display/:id", verifyToken,async (req, resp) => {
    let _id = req.params.id;
    console.log({ _id });

    if (_id.length < 24) {
        return resp.json({ httpCode: 400, error: 'Error Not Found' });
    }
    const result = await Product.findOne({ _id });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "not found" });
    }
});

app.post("/cartProduct", async (req, resp) => {
    console.log(req.body);

    try {
        const { userId } = req.body;
        let cart = await cartProduct.findOne({ userId });

        if (cart) {
            const { title } = req.body;
            let cartTitle = await cartProduct.findOne({ title, userId });
            if (cart && cartTitle) {
                cartTitle.quantity += 1;
                const result = await cartTitle.save();
                resp.send(result);
            } else {
                const newCart = new cartProduct(req.body);
                const result = await newCart.save();
                resp.send(result);
            }
        } else {
            const newCart = new cartProduct(req.body);
            const result = await newCart.save();
            resp.send(result);
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        resp.status(500).send("Internal Server Error");
    }
});

app.get("/cartProduct/:id", async (req, resp) => {
    let userId = req.params.id;
    console.log(userId);

    if (userId.length < 24) {
        return resp.json({ httpCode: 400, error: 'Error Not Found' });
    }
    const result = await cartProduct.find({ userId });
    if (result) {
        resp.send(result);
    } else {
        resp.send({ result: "not found" });
    }
});

app.delete("/delete/:userId/:productId", async (req, resp) => {
    let userId = req.params.userId;
    let productId = req.params.productId;

    if (userId.length < 24) {
        return resp.json({ httpCode: 400, error: 'Error Not Found' });
    }

    const res = await cartProduct.deleteOne({ userId, productId });
    resp.send(res);
});

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


app.post('/addProduct', upload.single('image'), async (req, res) => {
    const { title, price, rating } = req.body;

    // Add CORS headers specifically for this route
    res.setHeader('Access-Control-Allow-Origin', 'https://ecom-mern-57xj.vercel.app'); // Replace '*' with your frontend domain if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    if (!title || !price || !rating) {
        return res.status(400).json({ error: 'Title, price, and rating are required' });
    }

    try {
        let imageUrl = null;

        if (req.file) {
            // Upload the image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "products", // Optional: specify a folder in your Cloudinary account
            });

            // Get the URL of the uploaded image
            imageUrl = result.secure_url;

            // Optionally, delete the file from the local server after uploading to Cloudinary
            fs.unlinkSync(req.file.path);
        }

        // Create a new product with the image URL
        const newProduct = new Product({
            title,
            price,
            rating,
            image: imageUrl,
        });

        const savedProduct = await newProduct.save();

        res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/AddproductAdmin',upload.single('image'),async(req,res)=>{
   
    try {
        const { title,price,rating } = req.body;
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Upload image to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'Ecomproducts' },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );
            uploadStream.end(file.buffer); // Use file.buffer with memoryStorage
        });

        // Create new product document
        const product = new Product({
            title,
            price,
            rating,
            image: uploadResponse.secure_url,
        });

        // Save product to database
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create package' });
    }
})



app.get("/searchProduct", async (req, res) => {
    const { title } = req.query;

    if (!title) {
        return res.status(400).json({ error: 'Title parameter is required' });
    }

    try {
    
        const products = await Product.find({ title: { $regex: title, $options: 'i' } });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found matching the search criteria' });
        }

        res.json(products);
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

function verifyToken(req,resp,next){
    let token=req.headers['authorization']
    
    
    if(token){
      token=token.split(' ')[1];
      Jwt.verify(token,jwtKey,(err,valid)=>{
       if(err){
         resp.status(401).send({result:"plz provide valid token"})
       }else{
        next();
       }
      })
    }else{
      resp.status(403).send({result:"plz add token"})
    }
  }
  
  app.listen(5000, () => {
    console.log("Server is running on port 5000");
}); 