import { Game } from "../game/Game";

function History(props: { game: Game }) {
  return <div>{props.game.getState().moves.join(', ')}</div>;
}

export default History;
