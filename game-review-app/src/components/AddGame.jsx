/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { GamesContext } from "../contexts/GamesContext";

const AddGame = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { createGame } = useContext(GamesContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createGame({ title, imageUrl });
      setTitle("");
      setImageUrl("");
    } catch (error) {
      console.error("Error adding game:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Add a Game</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          {imageUrl.length > 0 && (
            <div className="my-3">
              <div className="text-body-secondary mb-2">Preview:</div>
              <img
                src={imageUrl}
                alt="image preview"
                className="img-fluid img-thumbnail d-block mx-auto"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Add Game
        </button>
      </form>
    </div>
  );
};

export default AddGame;
