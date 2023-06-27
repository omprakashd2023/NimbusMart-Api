const express = require("express");

const admin = require("../middleware/admin");

const Product = require("../models/product");

const adminRouter = express.Router();

adminRouter.post("/add-product", admin, async (req, res) => {
  try {
    const { productName, price, description, images, quantity, category } =
      req.body;
    let product = new Product({
      productName: productName,
      price: price,
      description: description,
      images: images,
      quantity: quantity,
      category: category,
    });
    product = await product.save();
    res.status(200).json({ product: product });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
});

module.exports = adminRouter;
