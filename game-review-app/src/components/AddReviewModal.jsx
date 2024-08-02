import { useContext, useState } from "react";
import { GamesContext } from "../contexts/GamesContext";

/* eslint-disable react/prop-types */
const AddReviewModal = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { addReview, selectedGame, setSelectedGame } = useContext(GamesContext);

  const handleAddReview = async () => {
    if (selectedGame) {
      try {
        await addReview({
          gameId: selectedGame._id,
          rating,
          comment,
        });
        setRating(0);
        setComment("");
        setSelectedGame(null);
      } catch (error) {
        console.error("Error adding review:", error);
      }
    }
  };

  return (
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
  );
};

export default AddReviewModal;
