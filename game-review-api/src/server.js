const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Game = require("./models/Game");

const app = express();
const port = process.env.PORT || 5000;

// Global middlewares
app.use(cors());
app.use(express.json());

// Get all games
app.get("/api/games", async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new game
app.post("/api/games", async (req, res) => {
  const game = new Game({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
  });

  try {
    const newGame = await game.save();
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a review
app.post("/api/games/:_id/reviews", async (req, res) => {
  const game = await Game.findById(req.params._id);
  const review = {
    rating: req.body.rating,
    comment: req.body.comment,
  };

  if (!game) {
    res.status(404).json({ message: "game not found" });
  } else {
    try {
      game.reviews.unshift(review);
      await game.save();
      res.status(201).json(game);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
});

// Delete a game
app.delete("/api/games/:_id", async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params._id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

mongoose
  .connect("mongodb://localhost:27017/game-review-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () => {
  console.log(`Server running on <http://localhost>:${port}`);
});
