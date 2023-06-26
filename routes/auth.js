const express = require("express");
const bcrpyt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const auth = require("../middleware/auth");

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
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, ...user._doc });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: e.toString() });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const isMatch = await bcrpyt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(200).json({ token, ...user._doc });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
});

authRouter.post("/verify", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.status(400).json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(400).json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.status(400).json(false);

    return res.status(200).json(true);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
});

authRouter.get("/user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user);
    res.status(200).json({ ...user._doc, token: req.token });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
});

module.exports = authRouter;
