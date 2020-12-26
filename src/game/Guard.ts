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
    ];

    const takeMoves: Position[] = [
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
        top: position.top + 1,
        left: position.left - 1,
      },
    ].filter((takeMove) => {
      const piece = Game.getSquarePiece(takeMove, state);
      return piece && piece[0] !== state.playerTurn;
    });

    return moves.concat(takeMoves);
  }
}
