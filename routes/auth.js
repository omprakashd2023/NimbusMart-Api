const express = require("express");
const bcrpyt = require("bcryptjs");

const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrpyt.hash(password, 10);

    let user = new User({
      name: name,
      email: email,
      password: hashedPassword,
    });

    user = await user.save();
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: e.toString() });
  }
});

module.exports = authRouter;
