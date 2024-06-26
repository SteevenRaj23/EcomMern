const mongoose=require('mongoose')

const cartProductSchema=new mongoose.Schema({
    userId:String,
    productId:String,
    title:String,
    price:String,
    rating:String,
    quantity: { type: Number, default: 1 } 
})


module.exports=mongoose.model("cartProduct",cartProductSchema);