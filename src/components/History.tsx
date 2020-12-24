import { useState } from "react";
import { Game, GameState } from "../game/Game";

function History(props: { game: Game }) {
  const [state, setGameState] = useState<GameState>(props.game.getState());

  props.game.on("move", (move) => {
    setGameState(props.game.getState());
  });
  return <div>{state.moves.join(", ")}</div>;
}

export default History;
