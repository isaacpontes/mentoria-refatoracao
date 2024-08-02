const { Router } = require("express");
const gamesRepository = require("../repositories/games-repository");

const router = Router();

// Get all games
router.get("/", async (req, res) => {
  try {
    const games = await gamesRepository.getAllGames();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new game
router.post("/", async (req, res) => {
  const game = {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
  };

  try {
    const newGame = await gamesRepository.createGame(game);
    res.status(201).json(newGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a review
router.post("/:_id/reviews", async (req, res) => {
  try {
    const game = await gamesRepository.addReview({
      gameId: req.params._id,
      rating: req.body.rating,
      comment: req.body.comment,
    });

    if (!game) return res.status(404).json({ message: "game not found" });
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a game
router.delete("/:_id", async (req, res) => {
  try {
    await gamesRepository.deleteGame(req.params._id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
