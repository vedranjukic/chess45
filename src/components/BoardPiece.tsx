import React from "react";
import { Game, Piece, Position } from "../game/Game";
import { useDrag } from "react-dnd";

type PlayerColor = "w" | "r" | "b" | "g" | "y";
type PieceClass = "P" | "K" | "N" | "B" | "R" | "Q" | "G";

const PLAYER_COLORS = {
  w: "white",
  r: "red",
  b: "black",
  g: "green",
  y: "yellow",
};

const PIECE_CLASSES = {
  P: "pawn",
  K: "king",
  N: "knight",
  B: "bishop",
  R: "rook",
  Q: "queen",
  G: "pawn",
};

function BoardPiece(props: {
  game: Game;
  piece: Piece;
  position: Position;
  onBeginDrag: (position: Position) => void;
  onEndDrag: (position: Position) => void;
}) {
  const { piece, position } = props;

  const [{ opacity }, dragRef] = useDrag({
    item: { type: "piece", piece },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
    begin: () => {
      props.onBeginDrag(position);
    },
    end: () => {
      props.onEndDrag(position);
    },
  });

  return (
    <div
      ref={dragRef}
      className={`piece-field ${
        piece[0] === props.game.getState().playerTurn ? "turn" : ""
      }`}
    >
      <div
        className={`piece ${PLAYER_COLORS[piece[0] as PlayerColor]} ${
          PIECE_CLASSES[piece[1] as PieceClass]
        }`}
      >
        <i
          className={`fas fa-chess-${PIECE_CLASSES[piece[1] as PieceClass]}`}
          style={{ opacity }}
        />
      </div>
    </div>
  );
}

export default BoardPiece;
