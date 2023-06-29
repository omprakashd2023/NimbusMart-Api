const mongoose = require("mongoose");

const ratingSchema = require("./rating");

const productSchema = mongoose.Schema({
  productName: {
    required: true,
    type: String,
    trim: true,
  },
  description: {
    required: true,
    type: String,
    trim: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: [ratingSchema],
  avgRating: {
    type: Number,
    default: 0,
  },

  //Seller Id
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
