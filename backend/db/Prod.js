const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    price: String,
    rating: String,
    image: String // Assuming you will store the image path as a string
});

module.exports = mongoose.model("prod", productSchema);
