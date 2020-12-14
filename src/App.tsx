import React from "react";
import "./App.css";
import Board from "./components/Board";
import Turn from "./components/Turn";
import History from "./components/History";
import { Game } from "./game/Game";

function App() {
  const game = new Game();
  return (
    <div className="App">
      <Board game={game} />
      <Turn game={game} />
      <History game={game} />
    </div>
  );
}

export default App;
