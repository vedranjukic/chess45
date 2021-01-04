import React from "react";
import "./App.css";
import Board from "./components/Board";
import Turn from "./components/Turn";
import History from "./components/History";
import { Game, GameHistory } from "./game/Game";

//  const history = [{"from":{"top":1,"left":5},"to":{"top":2,"left":5}},{"from":{"top":5,"left":9},"to":{"top":5,"left":8}},{"from":{"top":9,"left":6},"to":{"top":8,"left":6}}]
const historyTakeKing = [{"from":{"top":1,"left":5},"to":{"top":2,"left":5}},{"from":{"top":5,"left":9},"to":{"top":5,"left":8}},{"from":{"top":9,"left":6},"to":{"top":8,"left":6}},{"from":{"top":6,"left":1},"to":{"top":6,"left":2}},{"from":{"top":5,"left":4},"to":{"top":4,"left":4}},{"from":{"top":1,"left":6},"to":{"top":3,"left":6}},{"from":{"top":6,"left":9},"to":{"top":6,"left":7}},{"from":{"top":9,"left":5},"to":{"top":7,"left":5}},{"from":{"top":5,"left":0},"to":{"top":6,"left":1}},{"from":{"top":4,"left":5},"to":{"top":3,"left":5}},{"from":{"top":0,"left":5},"to":{"top":1,"left":5}}]
//  const history: GameHistory = []

function App() {
  const game = new Game(historyTakeKing);
  return (
    <div className="App">
      <Board game={game} />
      <Turn game={game} />
      <History game={game} />
      <button onClick={() => console.log(JSON.stringify(game.getHistory()))}>History</button>
    </div>
  );
}

export default App;
