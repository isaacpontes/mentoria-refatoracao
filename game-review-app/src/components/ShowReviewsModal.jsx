import { useContext } from "react";
import { GamesContext } from "../contexts/GamesContext";

const ShowReviewsModal = () => {
  const { selectedGame, openReviews } = useContext(GamesContext);

  return (
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
            {openReviews.length > 0 ? (
              <ul className="list-group">
                {openReviews.map((review, index) => (
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
  );
};

export default ShowReviewsModal;
