const mongoose = require('mongoose');
const Product = require('./Product');

const ProductSchema = new mongoose.Schema({
    productId : String,
    qty: Number,
}) 

const OrderSchema = new mongoose.Schema({
    userId: String,
    userOrderNumber: { type: String, unique: true },
    products:[ProductSchema],
    status: { type: String, default: 'pending' }, 
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Order',OrderSchema); 