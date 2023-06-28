const express = require("express");

const admin = require("../middleware/admin");

const adminController = require("../controllers/admin");

const adminRouter = express.Router();

adminRouter.post("/add-product", admin, adminController.addProductController);

adminRouter.get("/get-products", admin, adminController.getProductsController);

adminRouter.delete(
  "/delete-product/:id",
  admin,
  adminController.deleteProductController
);

module.exports = adminRouter;