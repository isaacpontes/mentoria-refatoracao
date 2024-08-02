import { useContext } from "react";
import { GamesContext } from "../contexts/GamesContext";

/* eslint-disable react/prop-types */
const GameListItem = ({ game }) => {
  const { deleteGame, setSelectedGame, handleShowReviews } = useContext(GamesContext);

  const handleDeleteGame = async (game) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmation) {
      deleteGame(game._id);
    }
  };

  const getAverageRatings = () => {
    const ratingsSum = game.reviews.reduce((prev, curr) => prev + curr.rating, 0)
    const averageRating = (ratingsSum / game.reviews.length) || 0
    return averageRating.toFixed(2)
  }

  return (
    <div className="col-12 col-lg-6 col-xl-4">
      <article className="card">
        <div className="card-body">
          <h3 className="card-title">{game.title}</h3>
          <div className="card-subtitle mb-3 text-body-secondary">
            {`Average ratings: ${getAverageRatings()} / 10`}
          </div>
          <img
            src={game.imageUrl}
            alt={`${game.title} cover`}
            className="img-fluid img-thumbnail mb-3"
            style={{ objectFit: "cover" }}
          />
          <button
            className="btn btn-primary d-block w-100 mb-2"
            onClick={() => setSelectedGame(game)}
            data-bs-toggle="modal"
            data-bs-target="#reviewModal"
          >
            Add Review
          </button>
          <button
            className="btn btn-secondary d-block w-100 mb-2"
            onClick={() => handleShowReviews(game)}
            data-bs-toggle="modal"
            data-bs-target="#reviewsModal"
          >
            Show Reviews
          </button>
          <button
            className="btn btn-danger d-block w-100 mb-2"
            onClick={() => handleDeleteGame(game)}
            data-bs-toggle="modal"
            data-bs-target="#reviewsModal"
          >
            Delete Game
          </button>
        </div>
      </article>
    </div>
  );
};

export default GameListItem;
