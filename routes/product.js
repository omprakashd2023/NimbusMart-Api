const express = require("express");

const auth = require("../middleware/auth");

const productController = require("../controllers/product");

const productRouter = express.Router();

productRouter.get(
  "/search/:productName",
  auth,
  productController.searchProductController
);

productRouter.get(
  "/get-products",
  auth,
  productController.getProductsController
);

productRouter.post(
  "/rate-product",
  auth,
  productController.rateProductController
);

productRouter.get("/deal-of-the-day", auth, productController.getDealOfTheDay);

module.exports = productRouter;
