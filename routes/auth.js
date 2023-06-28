const express = require("express");

const auth = require("../middleware/auth");

const authController = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/signup", authController.signUpController);

authRouter.post("/signin", authController.signInController);

authRouter.post("/verify", authController.verifyController);

authRouter.get("/user", auth, authController.getUserController);

module.exports = authRouter;
