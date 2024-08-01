import GameList from "./GameList";
import AddGame from "./AddGame";
import { useState } from "react";

const App = () => {
  const [games, setGames] = useState([]);

  return (
    <main className="container mt-4">
      <h1 className="text-center mb-4">Game Review App</h1>
      <div className="row mb-5">
        <div className="col col-12 col-md-6 col-xl-4">
          <AddGame setGames={setGames} />
        </div>
        <div className="col col-12 col-md-6 col-xl-8">
          <GameList games={games} setGames={setGames} />
        </div>
      </div>
    </main>
  );
};

export default App;
