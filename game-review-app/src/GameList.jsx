/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";

const GameList = ({ games, setGames }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

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
  }, [setGames]);

  const handleAddReview = async () => {
    if (selectedGame) {
      try {
        await axios.post(
          `http://localhost:5000/api/games/${selectedGame._id}/reviews`,
          { rating, comment }
        );
        setRating(0);
        setComment("");
        setSelectedGame(null);
        const response = await axios.get("http://localhost:5000/api/games");
        setGames(response.data);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  const handleShowReviews = async (game) => {
    setSelectedGame(game);
    setReviews(game.reviews);
  };

  const handleDeleteGame = async (game) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this game?"
    );
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/games/${game._id}`);
        setGames((prevGames) => prevGames.filter((g) => g._id !== game._id));
      } catch (error) {
        console.error("Error deleting game:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Game Reviews</h2>
      <section className="row g-2">
        {games.map((game) => (
          <div key={game._id} className="col-12 col-lg-6 col-xl-4">
            <article className="card">
              <div className="card-body">
                <h3 className="card-title">{game.title}</h3>
                <div className="card-subtitle mb-3 text-body-secondary">
                  Average rating:{" "}
                  {(
                    game.reviews.reduce(
                      (prev, curr) => prev + curr.rating,
                      0
                    ) / game.reviews.length || 0
                  ).toFixed(2)}
                  {" / 10"}
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
        ))}
      </section>

      {/* Add Review Modal */}
      <div
        className="modal fade"
        id="reviewModal"
        tabIndex="-1"
        aria-labelledby="reviewModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reviewModalLabel">
                Add Review
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedGame && (
                <>
                  <h5>{selectedGame.title}</h5>
                  <div className="mb-3">
                    <label className="form-label">Rating</label>
                    <input
                      type="number"
                      className="form-control"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                      min="0"
                      max="10"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows="3"
                      required
                    ></textarea>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddReview}
                data-bs-dismiss="modal"
              >
                Save Review
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Show Reviews Modal */}
      <div
        className="modal fade"
        id="reviewsModal"
        tabIndex="-1"
        aria-labelledby="reviewsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="reviewsModalLabel">
                Reviews for {selectedGame && selectedGame.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {reviews.length > 0 ? (
                <ul className="list-group">
                  {reviews.map((review, index) => (
                    <li key={index} className="list-group-item">
                      <strong>Rating:</strong> {review.rating} / 10
                      <br />
                      <strong>Comment:</strong> {review.comment}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameList;
