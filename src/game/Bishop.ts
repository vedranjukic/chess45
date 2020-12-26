import { Game, GameBoard, GameState, Position } from "./Game";

export class Bishop {
  static getPossibleMoves(position: Position, state: GameState): Position[] {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "B") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }

    const moves: Position[] = [];
    return moves.concat(
      Bishop.getMovesNE(position, state),
      Bishop.getMovesSE(position, state),
      Bishop.getMovesNW(position, state),
      Bishop.getMovesSW(position, state)
    );
  }

  static getMovesNE(position: Position, state: GameState) {
    const moves: Position[] = [];
    let { top, left } = position;
    while (top > 0 && left < GameBoard.length - 1) {
      top--;
      left++;
      const squareType = Game.getSquareType({
        top,
        left,
      });
      if (squareType === "n") {
        break;
      }
      const piece = Game.getSquarePiece(
        {
          top,
          left,
        },
        state
      );
      moves.push({
        top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesSE(position: Position, state: GameState) {
    const moves: Position[] = [];
    let { top, left } = position;
    while (top < GameBoard.length - 1 && left < GameBoard.length - 1) {
      top++;
      left++;
      const squareType = Game.getSquareType({
        top,
        left,
      });
      if (squareType === "n") {
        break;
      }
      const piece = Game.getSquarePiece(
        {
          top,
          left,
        },
        state
      );
      moves.push({
        top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesNW(position: Position, state: GameState) {
    const moves: Position[] = [];
    let { left, top } = position;
    while (left > 0 && top > 0) {
      left--;
      top--;
      const squareType = Game.getSquareType({
        top,
        left,
      });
      if (squareType === "n") {
        break;
      }
      const piece = Game.getSquarePiece(
        {
          top,
          left,
        },
        state
      );
      moves.push({
        top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesSW(position: Position, state: GameState) {
    const moves: Position[] = [];
    let { top, left } = position;
    while (top < GameBoard.length - 1 && left > 0) {
      left--;
      top++;
      const squareType = Game.getSquareType({
        top,
        left,
      });
      if (squareType === "n") {
        break;
      }
      const piece = Game.getSquarePiece(
        {
          top,
          left,
        },
        state
      );
      moves.push({
        top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }
}
