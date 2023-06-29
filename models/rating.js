const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  reviewedAt: {
    type: Number,
    required: true,
  },
  //Comments
});

module.exports = ratingSchema;
