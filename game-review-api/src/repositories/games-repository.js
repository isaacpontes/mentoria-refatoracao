const Game = require("../models/Game");

const gamesRepository = {
  getAllGames: () => {
    return Game.find();
  },

  createGame: ({ title, imageUrl }) => {
    const newGame = new Game({ title, imageUrl });
    return newGame.save();
  },

  addReview: async ({ gameId, rating, comment }) => {
    const game = await Game.findById(gameId);

    if (!game) return null;

    game.reviews.unshift({ rating, comment });
    await game.save();

    return game;
  },

  deleteGame: (gameId) => {
    return Game.findByIdAndDelete(gameId);
  },
};

module.exports = gamesRepository;
