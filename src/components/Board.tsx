import React, { useState } from "react";
import "./Board.css";
import { Game, GameState, Position } from "../game/Game";
import BoardPiece from "./BoardPiece";
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";

function Board(props: { game: Game }) {
  const { game } = props;
  const [state, setGameState] = useState<GameState>(game.getState());

  props.game.on("move", (move) => {
    setGameState(props.game.getState());
  });

  const [possibleMoves, setPossibleMoves] = useState<Position[]>([]);

  const handleBeginDrag = (position: Position) => {
    setPossibleMoves(Game.getPossibleMoves(position, state));
  };

  const handleCancelDrag = () => {
    setPossibleMoves([]);
  }

  const handleEndDrag = (from: Position, to: Position) => {
    if (
      possibleMoves.find(
        (possibleMove) =>
          possibleMove.left === to.left && possibleMove.top === to.top
      )
    ) {
      game.makeMove({
        from,
        to,
      });
    }
    setPossibleMoves([]);
  };

  const drawPiece = (position: Position) => {
    const piece = Game.getSquarePiece(position, state);
    if (piece === "") {
      return <div />;
    }
    return <BoardPiece game={game} piece={piece} position={position} />;
  };

  const drawSquare = (position: Position) => {
    const { top, left } = position;
    const possibleMove = possibleMoves.find(
      (move) => move.left === left && move.top === top
    );
    return (
      <Droppable
        key={top * 100 + "," + left}
        droppableId={position.top + "," + position.left}
        isDropDisabled={!possibleMove}
      >
        {(provided: DroppableProvided) => (
          <div
            key={top * 100 + "," + left}
            className={`square ${Game.getSquareType(position)} ${
              possibleMove ? "allow-move" : ""
            }`}
            ref={provided ? provided.innerRef : undefined}
          >
            {drawPiece(position)}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
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
    <DragDropContext
      onDragEnd={(result, provided) => {
        const [sourceTop, sourceLeft] = result.source.droppableId.split(",");
        if (!result.destination) {
          handleCancelDrag();
          return;
        }
        const [
          destinationTop,
          destinationLeft,
        ] = result.destination.droppableId.split(",");
        handleEndDrag(
          { top: Number(sourceTop), left: Number(sourceLeft) },
          { top: Number(destinationTop), left: Number(destinationLeft) }
        );
      }}
      onDragStart={(initial, provider) => {
        const [top, left] = initial.draggableId.split(",");
        handleBeginDrag({ top: Number(top), left: Number(left) });
      }}
    >
      <div className="board">{rows}</div>
    </DragDropContext>
  );
}

export default Board;
