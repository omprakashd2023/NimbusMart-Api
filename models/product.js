const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    productName: {
        required: true,
        type: String,
        trim: true,
    },
    description:{
        required: true,
        type: String,
        trim: true,
    },
    images: [
        {
            type: String,
            required: true,
        }
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
    //Seller Id 
    //Ratings
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;