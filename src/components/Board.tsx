import React from "react";
import "./Board.css";
import { Game, Piece } from "../game/Game";
import BoardPiece from "./BoardPiece";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function Board(props: { game: Game }) {
  const { game } = props;

  const handleBeginDrag = (piece: Piece) => {
    console.log('BEGIN DRAG', piece)
  }

  const handleEndDrag = (piece: Piece) => {
    console.log('END DRAG', piece)
  }

  const drawPiece = (top: number, left: number) => {
    const piece = game.getSquarePiece({ top, left });
    if (piece === "") {
      return <div />;
    }
    return <BoardPiece game={game} piece={piece} onBeginDrag={handleBeginDrag} onEndDrag={handleEndDrag} />;
  };

  const drawSquare = (top: number, left: number) => {
    return (
      <div
        className={"square " + props.game.getSquareType(top, left)}
        key={top * 100 + left}
      >
        {drawPiece(top, left)}
      </div>
    );
  };

  const rows = [];

  for (let row = 0; row < 11; row++) {
    const squares = [];
    for (let square = 0; square < 11; square++) {
      squares.push(drawSquare(row, square));
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
