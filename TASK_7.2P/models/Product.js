const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productName: String,
  imageURL: String,
  category: String,
  description: String,
  pros: [String],
  cons: [String],
  recommendation: String,
  rating: Number
});

module.exports = mongoose.model("Product", ProductSchema);