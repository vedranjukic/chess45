import React, { useState } from "react";
import "./Board.css";
import { Game, Position } from "../game/Game";
import BoardPiece from "./BoardPiece";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Board(props: { game: Game }) {
  const { game } = props;
  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleBeginDrag = (position: Position) => {
    setPossibleMoves(game.getPossibleMoves(position));
  };

  const handleEndDrag = (position: Position) => {
    setPossibleMoves([]);
  };

  const drawPiece = (position: Position) => {
    const piece = game.getSquarePiece(position);
    if (piece === "") {
      return <div />;
    }
    return (
      <BoardPiece
        game={game}
        piece={piece}
        position={position}
        onBeginDrag={handleBeginDrag}
        onEndDrag={handleEndDrag}
      />
    );
  };

  const drawSquare = (position: Position) => {
    const { top, left } = position;
    return (
      <div
        className={`square ${props.game.getSquareType(position)} ${
          possibleMoves.find((move) => move.left === left && move.top === top)
            ? "allow-move"
            : ""
        }`}
        key={top * 100 + left}
      >
        {drawPiece(position)}
      </div>
    );
  };

  const rows = [];

  for (let row = 0; row < 11; row++) {
    const squares = [];
    for (let square = 0; square < 11; square++) {
      squares.push(
        drawSquare({
          top: row,
          left: square,
        })
      );
    }
    rows.push(
      <div className="row" key={row}>
        {squares}
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">{rows}</div>
    </DndProvider>
  );
}

export default Board;
