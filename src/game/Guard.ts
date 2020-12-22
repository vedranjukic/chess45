import { Game, GameState, Position } from "./Game";

export class Guard {
  static getPossibleMoves(position: Position, state: GameState) {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "G") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }

    const moves: Position[] = [];
    for (let top = position.top - 1; top <= position.top + 1; top++) {
        for (let left = position.left - 1; left <= position.left + 1; left++) {
            if (top === position.top && left === position.left) {
                continue
            }
            moves.push({
                left,
                top
            })
        }
    }
    return moves;
  }
}
