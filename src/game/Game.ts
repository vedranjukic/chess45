import { createNanoEvents } from "nanoevents";
import { Bishop } from "./Bishop";

import { Guard } from "./Guard";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export const GameBoard: SquareType[][] = [
  ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
  ["n", "n", "n", "w", "b", "w", "b", "w", "n", "n", "n"],
  ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
  ["b", "w", "b", "w", "b", "w", "b", "w", "b", "w", "b"],
  ["w", "b", "w", "b", "w", "b", "w", "b", "w", "b", "w"],
  ["b", "w", "b", "w", "b", "y", "b", "w", "b", "w", "b"],
  ["w", "b", "w", "b", "w", "b", "w", "b", "w", "b", "w"],
  ["b", "w", "b", "w", "b", "w", "b", "w", "b", "w", "b"],
  ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
  ["n", "n", "n", "w", "b", "w", "b", "w", "n", "n", "n"],
  ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
];

export type SquareType = "w" | "b" | "n" | "y";

export type Player = "w" | "r" | "b" | "g" | "y";

export type Piece =
  | ""
  | "wK"
  | "wR"
  | "wB"
  | "wN"
  | "wP"
  | "rK"
  | "rR"
  | "rB"
  | "rN"
  | "rP"
  | "bK"
  | "bR"
  | "bB"
  | "bN"
  | "bP"
  | "gK"
  | "gR"
  | "gB"
  | "gN"
  | "gP"
  | "yQ"
  | "yG";

export type Position = {
  top: number;
  left: number;
};

export type GameMove = {
  from: Position;
  to: Position;
};

export type GameHistory = GameMove[];

export type GameState = {
  board: Piece[][];
  playerTurn: Player;
  moves: string[];
};

export interface GameEvents {
  move: (move: GameMove) => void;
}

export class Game {
  constructor(private readonly history: GameHistory = []) {}

  private readonly emitter = createNanoEvents<GameEvents>();

  public on<E extends keyof GameEvents>(event: E, callback: GameEvents[E]) {
    return this.emitter.on(event, callback);
  }

  public static getPossibleMoves(
    position: Position,
    state: GameState
  ): Position[] {
    const piece = Game.getSquarePiece(position, state);
    const allMoves = (() => {
      switch (piece[1]) {
        case "P":
          return Pawn.getPossibleMoves(position, state);
        case "G":
          return Guard.getPossibleMoves(position, state);
        case "B":
          return Bishop.getPossibleMoves(position, state);
        case "N":
          return Knight.getPossibleMoves(position, state);
        case "R":
          return Rook.getPossibleMoves(position, state);
        case "Q":
          return Queen.getPossibleMoves(position, state);
        case "K":
          return King.getPossibleMoves(position, state);
      }
      throw new Error("Invalid piece");
    })();
    const filterOutOfBoardMoves = allMoves.filter(
      (moveTo) =>
        moveTo.left >= 0 &&
        moveTo.top >= 0 &&
        moveTo.left < GameBoard.length &&
        moveTo.top < GameBoard.length &&
        Game.getSquareType(moveTo) !== "n"
    );
    const filterOwnPiecesMoves = filterOutOfBoardMoves.filter((moveTo) => {
      const movePiece = Game.getSquarePiece(moveTo, state);
      return movePiece[0] !== state.playerTurn;
    });
    return filterOwnPiecesMoves;
  }

  public static getSquarePiece(position: Position, state: GameState) {
    const { top, left } = position;
    if (typeof state.board[top] === undefined) {
      throw new Error("Invalid top coordinate value");
    }
    if (typeof state.board[top][left] === undefined) {
      throw new Error("Invalid left coordinate value");
    }
    return state.board[top][left];
  }

  public static getSquareType(position: Position): SquareType {
    const { top, left } = position;
    if (top < 0 || top >= GameBoard.length) {
      throw new Error("Invalid top coordinate value");
    }
    if (left < 0 || left >= GameBoard[top].length) {
      throw new Error("Invalid left coordinate value");
    }
    return GameBoard[top][left];
  }

  public getHistory(): GameHistory {
    return this.history;
  }

  public getState(): GameState {
    const initialState: GameState = {
      board: [
        ["", "", "", "wR", "wN", "wK", "wB", "wR", "", "", ""],
        ["", "", "", "wP", "wP", "wP", "wP", "wP", "", "", ""],
        ["", "", "", "", "", "", "", "", "", "", ""],
        ["gR", "gP", "", "", "", "", "", "", "", "rP", "rR"],
        ["gB", "gP", "", "", "", "yG", "", "", "", "rP", "rN"],
        ["gK", "gP", "", "", "yG", "yQ", "yG", "", "", "rP", "rK"],
        ["gN", "gP", "", "", "", "yG", "", "", "", "rP", "rB"],
        ["gR", "gP", "", "", "", "", "", "", "", "rP", "rR"],
        ["", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "bP", "bP", "bP", "bP", "bP", "", "", ""],
        ["", "", "", "bR", "bB", "bK", "bN", "bR", "", "", ""],
      ],
      playerTurn: "w",
      moves: [],
    };

    return this.history.reduce(
      (prevState: GameState, move: GameMove, moveCount: number) => {
        Game.validateMove(move, prevState);
        const chessNotation = Game.moveInChessNotation(move, prevState);

        //  queen takes
        //  captured piece is converted to queen's guard and moved to yellow square
        const queenPawnTake =
          prevState.board[move.from.top][move.from.left][1] === "Q" &&
          prevState.board[move.to.top][move.to.left][1] !== "";

        const kingIsTaken =
          prevState.board[move.to.top][move.to.left][1] === "K";
        const queenIsTaken =
          prevState.board[move.to.top][move.to.left][1] === "Q";
        const playerLost =
          kingIsTaken || queenIsTaken
            ? prevState.board[move.to.top][move.to.left][0]
            : false;
        const movedPiece = prevState.board[move.from.top][move.from.left];

        const nextStateBoard =
          //  queen takes
          prevState.board
            .map((row, rowIndex) =>
              row.map((col, colIndex) => {
                if (rowIndex === 5 && colIndex === 5 && queenPawnTake) {
                  return "yG";
                }
                return col;
              })
            )
            //  player lost
            .map((row) =>
              row.map((col) => {
                if (playerLost && col[0] === playerLost) {
                  return "";
                }
                return col;
              })
            )
            //  move
            .map((row, rowIndex) =>
              row.map((col, colIndex) => {
                if (rowIndex === move.from.top && colIndex === move.from.left) {
                  return "";
                }
                if (rowIndex === move.to.top && colIndex === move.to.left) {
                  return movedPiece;
                }
                return col;
              })
            );

        return {
          board: nextStateBoard,
          playerTurn: Game.nextPlayerTurn(prevState.playerTurn, prevState),
          moves: [...prevState.moves, chessNotation],
        } as GameState;
      },
      initialState
    );
  }

  public static moveInChessNotation(move: GameMove, state: GameState) {
    const piece = state.board[move.from.top][move.from.left];
    //  TODO: figure taken
    //  TODO: promotion
    return (
      piece[1].replace("P", "") +
      String.fromCharCode(94 + move.from.left) +
      (state.board.length - move.from.top) +
      String.fromCharCode(94 + move.to.left) +
      (state.board.length - move.to.top)
    );
  }

  public makeMove(move: GameMove) {
    Game.validateMove(move, this.getState());
    this.history.push(move);
    this.emitter.emit("move", move);
  }

  public static validateMove(move: GameMove, state: GameState) {
    //  check is valid piece
    const piece = state.board[move.from.top][move.from.left];
    if (piece === "") {
      throw new Error("No piece selected");
    }
    //    check if player turn
    if (piece[0] !== state.playerTurn) {
      throw new Error("Can not move other player pieces");
    }
    //  TODO: check get Possible Moves
  }

  public static isPlayerInGame(player: Player, state: GameState) {
    return state.board.find((row) =>
      row.find((col) => col && col[0] === player)
    );
  }

  public static nextPlayerTurn(currentPlayer: Player, state: GameState) {
    function rotatePlayer(player: Player): Player {
      switch (player) {
        case "w":
          return "r";
        case "r":
          return "b";
        case "b":
          return "g";
        case "g":
          return "y";
        case "y":
          return "w";
        default:
          throw new Error("This should not have happend!");
      }
    }
    let nextTurnPlayer = rotatePlayer(currentPlayer);
    while (!Game.isPlayerInGame(nextTurnPlayer, state)) {
      nextTurnPlayer = rotatePlayer(nextTurnPlayer);
    }
    return nextTurnPlayer;
  }
}
