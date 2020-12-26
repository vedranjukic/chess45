import { Game, GameState, Position } from "./Game";

export class King {
  static getPossibleMoves(position: Position, state: GameState) {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "K") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }

    const moves: Position[] = [
      {
        top: position.top - 1,
        left: position.left,
      },
      {
        top: position.top,
        left: position.left + 1,
      },
      {
        top: position.top + 1,
        left: position.left,
      },
      {
        top: position.top,
        left: position.left - 1,
      },
      {
        top: position.top - 1,
        left: position.left - 1,
      },
      {
        top: position.top + 1,
        left: position.left + 1,
      },
      {
        top: position.top + 1,
        left: position.left - 1,
      },
      {
        top: position.top - 1,
        left: position.left + 1,
      },
    ];

    return moves;
  }
}
