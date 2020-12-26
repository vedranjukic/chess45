import { Game, GameBoard, GameState, Position } from "./Game";

export class Rook {
  static getPossibleMoves(position: Position, state: GameState): Position[] {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "R") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }

    const moves: Position[] = [];
    return moves.concat(
      Rook.getMovesN(position, state),
      Rook.getMovesS(position, state),
      Rook.getMovesE(position, state),
      Rook.getMovesW(position, state)
    );
  }

  static getMovesN(position: Position, state: GameState) {
    const moves: Position[] = [];
    let top = position.top;
    while (top > 0) {
      top--;
      const piece = Game.getSquarePiece(
        {
          top,
          left: position.left,
        },
        state
      );
      moves.push({
        top,
        left: position.left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesS(position: Position, state: GameState) {
    const moves: Position[] = [];
    let top = position.top;
    while (top < GameBoard.length - 1) {
      top++;
      const piece = Game.getSquarePiece(
        {
          top,
          left: position.left,
        },
        state
      );
      moves.push({
        top,
        left: position.left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesW(position: Position, state: GameState) {
    const moves: Position[] = [];
    let left = position.left;
    while (left > 0) {
      left--;
      const piece = Game.getSquarePiece(
        {
          top: position.top,
          left,
        },
        state
      );
      moves.push({
        top: position.top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }

  static getMovesE(position: Position, state: GameState) {
    const moves: Position[] = [];
    let left = position.left;
    while (left < GameBoard.length - 1) {
      left++;
      const piece = Game.getSquarePiece(
        {
          top: position.top,
          left,
        },
        state
      );
      moves.push({
        top: position.top,
        left,
      });
      if (piece) {
        break;
      }
    }
    return moves;
  }
}
