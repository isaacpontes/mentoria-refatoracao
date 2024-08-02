/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const GamesContext = createContext({});

export const GamesContextProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [openReviews, setOpenReviews] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  // add game
  const createGame = async ({ title, imageUrl }) => {
    const response = await axios.post("http://localhost:5000/api/games", {
      title,
      imageUrl,
    });
    setGames((prev) => [...prev, response.data]);
  };

  // add review
  const addReview = async ({ gameId, rating, comment }) => {
    const response = await axios.post(
      `http://localhost:5000/api/games/${gameId}/reviews`,
      { rating, comment }
    );
    setGames((currentArray) => {
      const updatedArray = currentArray.filter((game) => game._id !== gameId);
      updatedArray.unshift(response.data);
      return updatedArray;
    });
  };

  // delete game
  const deleteGame = async (gameId) => {
    try {
      await axios.delete(`http://localhost:5000/api/games/${gameId}`);
      setGames((prevGames) => prevGames.filter((game) => game._id !== gameId));
    } catch (error) {
      console.error("Error deleting game:", error);
    }
  };

  const handleShowReviews = async (game) => {
    setSelectedGame(game);
    setOpenReviews(game.reviews);
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        createGame,
        addReview,
        deleteGame,
        handleShowReviews,
        selectedGame,
        setSelectedGame,
        openReviews
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};
