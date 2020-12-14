import { Game } from "../game/Game";

function Turn(props: { game: Game }) {
  return <div>{props.game.getTurn()}</div>;
}

export default Turn;
