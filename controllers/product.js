const Product = require("../models/product");

module.exports.searchProductController = async (req, res) => {
  try {
    const products = await Product.find({
      name: { $regex: req.params.productName, $options: "i" },
    });

    res.status(200).json({ searchResults: products });
  } catch (e) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};
