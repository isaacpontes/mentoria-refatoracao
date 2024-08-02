import GameList from "./components/GameList";
import AddGame from "./components/AddGame";
import { GamesContextProvider } from "./contexts/GamesContext";

const App = () => {
  return (
    <main className="container mt-4">
      <h1 className="text-center mb-4">Game Review App</h1>
      <GamesContextProvider>
        <div className="row mb-5">
          <div className="col col-12 col-md-6 col-xl-4">
            <AddGame />
          </div>
          <div className="col col-12 col-md-6 col-xl-8">
            <GameList />
          </div>
        </div>
      </GamesContextProvider>
    </main>
  );
};

export default App;
