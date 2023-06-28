const express = require("express");

const auth = require("../middleware/auth");

const productController = require("../controllers/product");

const productRouter = express.Router();

productRouter.get(
  "/search/:productName",
  auth,
  productController.searchProductController
);

module.exports = productRouter;
