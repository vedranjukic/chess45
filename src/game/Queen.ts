import { Game, GameState, Position } from "./Game";
import { Rook } from "./Rook";

export class Queen {
  static getPossibleMoves(position: Position, state: GameState): Position[] {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "Q") {
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
}
