import { Game, GameState, Position } from "./Game";

export class Pawn {
  static getPossibleMoves(position: Position, state: GameState) {
    const piece = Game.getSquarePiece(position, state);
    if (piece[1] !== "P") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }
    const moves: Position[] = [];
    switch (piece[0]) {
      case "b": {
        return this.calcMoves(position, state, 0, -1);
      }
      case "w": {
        return this.calcMoves(position, state, 0, 1);
      }
      case "r": {
        return this.calcMoves(position, state, -1, 0);
      }
      case "g": {
        return this.calcMoves(position, state, 1, 0);
      }
    }
    return moves;
  }

  private static calcMoves(
    position: Position,
    state: GameState,
    moveHorizontal: number,
    moveVertical: number
  ) {
    const moves: Position[] = [];
    //  one step forwad
    const moveOneFront = {
      left: position.left + moveHorizontal,
      top: position.top + moveVertical,
    };
    if (!Game.getSquarePiece(moveOneFront, state)) {
      moves.push(moveOneFront);
    }
    /*
    //  two step forwad
    //  TODO: check initial position
    const moveTwoFront = {
      left: position.left + moveHorizontal * 2,
      top: position.top + moveVertical * 2,
    };
    if (!Game.getSquarePiece(moveTwoFront, state)) {
      moves.push(moveTwoFront);
    }
    */
    //  take left
    const moveTakeLeft = {
      left: position.left + moveHorizontal + (moveHorizontal === 0 ? -1 : 0),
      top: position.top + moveVertical + (moveVertical === 0 ? -1 : 0),
    };
    if (Game.getSquarePiece(moveTakeLeft, state) && Game.getSquarePiece(moveTakeLeft, state)[0] !== state.playerTurn) {
      moves.push(moveTakeLeft);
    }
    //  take right
    const moveTakeRight = {
      left: position.left + moveHorizontal + (moveHorizontal === 0 ? 1 : 0),
      top: position.top + moveVertical + (moveVertical === 0 ? 1 : 0),
    };
    if (Game.getSquarePiece(moveTakeRight, state) && Game.getSquarePiece(moveTakeRight, state)[0] !== state.playerTurn) {
      moves.push(moveTakeRight);
    }

    return moves;
  }
}
