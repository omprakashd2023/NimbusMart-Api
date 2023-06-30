const Product = require("../models/product");
const Rating = require("../models/rating");

module.exports.searchProductController = async (req, res) => {
  try {
    const products = await Product.find({
      productName: { $regex: req.params.productName, $options: "i" },
    });

    res.status(200).json({ searchResults: products });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports.getProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports.rateProductController = async (req, res) => {
  try {
    const { rating, productId, reviewedAt, avgRating } = req.body;
    let product = await Product.findById(productId);
    const index = product.rating.findIndex((item) => item.userId == req.user);
    if (index == -1) {
      const ratingSchema = {
        userId: req.user,
        rating: rating,
        reviewedAt: reviewedAt,
      };
      product.rating.push(ratingSchema);
    } else {
      product.rating[index].rating = rating;
    }
    product.avgRating = avgRating;
    product = await product.save();
    res.status(200).json({
      product: product,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports.getDealOfTheDay = async (req, res) => {
  try {
    let products = await Product.find()
      .sort({ avgRating: -1, "rating.lenth": -1 })
      .limit(1);
    console.log(products);
    res.status(200).json({ product: products[0] });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};
