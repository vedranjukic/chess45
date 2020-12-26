import { Game, GameBoard, GameState, Position } from "./Game";

export class Knight {
  static getPossibleMoves(position: Position, state: GameState) {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "N") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }

    const moves: Position[] = [
      {
        top: position.top + 1,
        left: position.left + 2,
      },
      {
        top: position.top + 1,
        left: position.left - 2,
      },
      {
        top: position.top - 1,
        left: position.left + 2,
      },
      {
        top: position.top - 1,
        left: position.left - 2,
      },
      {
        top: position.top - 2,
        left: position.left - 1,
      },
      {
        top: position.top - 2,
        left: position.left + 1,
      },
      {
        top: position.top + 2,
        left: position.left - 1,
      },
      {
        top: position.top + 2,
        left: position.left + 1,
      },
    ];

    return moves
  }
}
