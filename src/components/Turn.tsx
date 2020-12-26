import { useState } from "react";
import { Game, GameState } from "../game/Game";

function Turn(props: { game: Game }) {
  const [state, setGameState] = useState<GameState>(props.game.getState());

  props.game.on("move", (move) => {
    setGameState(props.game.getState());
  });
  return <div>{state.playerTurn}</div>;
}

export default Turn;
