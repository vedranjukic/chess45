import { Game } from "../game/Game";

function Turn(props: { game: Game }) {
  return <div>{props.game.getState().playerTurn}</div>;
}

export default Turn;
