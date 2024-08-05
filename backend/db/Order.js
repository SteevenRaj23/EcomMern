const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: String,
  qty: Number,
});

const OrderSchema = new mongoose.Schema({
  userId: String,
  userOrderNumber: { type: String, unique: true },
  products: [ProductSchema],
  status: { type: String, default: "pending" },
  createdAt: { type: String, default: "" },
});

// Middleware to format createdAt before saving
OrderSchema.pre("save", function (next) {
  const date = new Date();
  const options = {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata", // Set time zone to New Delhi, India
  };
  const timeString = date.toLocaleTimeString("en-US", options);
  const dateString = date.toLocaleDateString("en-US", { timeZone: "Asia/Kolkata" }); // Set time zone
  this.createdAt = `${dateString}, ${timeString}`;
  next();
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
