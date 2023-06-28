const Product = require("../models/product");

module.exports.addProductController = async (req, res) => {
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

module.exports.deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.status(200).json({ product });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};
