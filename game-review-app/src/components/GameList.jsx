/* eslint-disable react/prop-types */
import { useContext } from "react";
import ShowReviewsModal from "./ShowReviewsModal";
import AddReviewModal from "./AddReviewModal";
import { GamesContext } from "../contexts/GamesContext";
import GameListItem from "./GameListItem";

const GameList = () => {
  const { games } = useContext(GamesContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Game Reviews</h2>
      <section className="row g-2">
        {games.map((game) => (
          <GameListItem key={game._id} game={game} />
        ))}
      </section>

      {/* Add Review Modal */}
      <AddReviewModal />

      {/* Show Reviews Modal */}
      <ShowReviewsModal />
    </div>
  );
};

export default GameList;
