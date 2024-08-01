const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
  reviews: [
    {
      rating: { type: Number, required: true },
      comment: { type: String },
    },
  ],
});

module.exports = mongoose.model("Game", GameSchema);
