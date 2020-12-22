import React from "react";
import { Game, Piece, Position } from "../game/Game";
import { Draggable } from "react-beautiful-dnd";

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
}) {
  const { piece, position } = props;
  const id = position.top + "," + position.left;

  const movable = piece[0] === props.game.getState().playerTurn

  if (movable) {
    return (
      <Draggable
        key={id}
        draggableId={id}
        index={position.top * 100 + position.left}
      >
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`piece ${PLAYER_COLORS[piece[0] as PlayerColor]} ${
              PIECE_CLASSES[piece[1] as PieceClass]
            } ${movable ? "turn" : ""}`}
          >
            <i
              className={`fas fa-chess-${
                PIECE_CLASSES[piece[1] as PieceClass]
              }`}
            />
          </div>
        )}
      </Draggable>
    );
  } else {
    return (
      <div
        className={`piece ${PLAYER_COLORS[piece[0] as PlayerColor]} ${
          PIECE_CLASSES[piece[1] as PieceClass]
        }`}
      >
        <i
          className={`fas fa-chess-${PIECE_CLASSES[piece[1] as PieceClass]}`}
        />
      </div>
    );
  }
}

export default BoardPiece;
