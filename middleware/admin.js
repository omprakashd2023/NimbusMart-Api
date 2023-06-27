const jwt = require("jsonwebtoken");

const User = require("../models/user");

const admin = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied" });
    }
    const user = await User.findById(verified.id);
    if (user.type == "user" || user.type == "seller") {
      return res.status(401).json({ msg: "Not authorized" });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "Something went wrong!", reason: err.toString() });
  }
};

module.exports = admin;