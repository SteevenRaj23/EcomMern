const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    title:String,
    price:String,
    rating:String
})


module.exports=mongoose.model("products",productSchema);

// const mongoose = require('mongoose');

// const productSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   imageUrl: { type: String, required: true } // Path to the uploaded image
// });

// const Product = mongoose.model('Product', productSchema);

// module.exports = Product;
