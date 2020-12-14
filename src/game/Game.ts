export type SquareType = "w" | "b" | "n";

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

type History = GameMove[];

export type GameState = {
  board: Piece[][];
  playerTurn: Player;
  moves: string[];
};

export class Game {
  private readonly history: History = [
    {
      from: {
        top: 1,
        left: 5,
      },
      to: {
        top: 2,
        left: 5,
      },
    },
    {
      from: {
        top: 4,
        left: 9,
      },
      to: {
        top: 4,
        left: 8,
      },
    },
  ];
  private readonly board: SquareType[][] = [
    ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
    ["n", "n", "n", "w", "b", "w", "b", "w", "n", "n", "n"],
    ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
    ["b", "w", "b", "w", "b", "w", "b", "w", "b", "w", "b"],
    ["w", "b", "w", "b", "w", "b", "w", "b", "w", "b", "w"],
    ["b", "w", "b", "w", "b", "w", "b", "w", "b", "w", "b"],
    ["w", "b", "w", "b", "w", "b", "w", "b", "w", "b", "w"],
    ["b", "w", "b", "w", "b", "w", "b", "w", "b", "w", "b"],
    ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
    ["n", "n", "n", "w", "b", "w", "b", "w", "n", "n", "n"],
    ["n", "n", "n", "b", "w", "b", "w", "b", "n", "n", "n"],
  ];

  public getPossibleMoves(position: Position): Position[] {
    const piece = this.getSquarePiece(position);
    switch (piece[1]) {
      case 'P':
        return this.possibleMovesPawn(position)
    }
    throw new Error('Invalid piece')
  }

  public getTurn(): Player {
    return this.getState().playerTurn;
  }

  public getSquarePiece(position: Position) {
    const { top, left } = position;
    if (top < 0 || top >= this.board.length) {
      throw new Error("Invalid top coordinate value");
    }
    if (left < 0 || left >= this.board[top].length) {
      throw new Error("Invalid left coordinate value");
    }
    const state = this.getState();
    return state.board[top][left];
  }

  public getSquareType(position: Position): SquareType {
    const { top, left } = position;
    if (top < 0 || top >= this.board.length) {
      throw new Error("Invalid top coordinate value");
    }
    if (left < 0 || left >= this.board[top].length) {
      throw new Error("Invalid left coordinate value");
    }
    return this.board[top][left];
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
        ["gR", "gP", "", "", "", "", "", "", "", "rP", "rK"],
        ["", "", "", "", "", "", "", "", "", "", ""],
        ["", "", "", "bP", "bP", "bP", "bP", "bP", "", "", ""],
        ["", "", "", "bR", "bB", "bK", "bN", "bR", "", "", ""],
      ],
      playerTurn: "w",
      moves: [],
    };
    return this.history.reduce(
      (prevState: GameState, move: GameMove, moveCount: number) => {
        this.validateMove(move, prevState);
        const chessNotation = this.moveInChessNotation(move, prevState);
        // move
        prevState.board[move.to.top][move.to.left] =
          prevState.board[move.from.top][move.from.left];
        prevState.board[move.from.top][move.from.left] = "";
        //  turn
        const nextTurn = (() => {
          switch (prevState.playerTurn) {
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
        })();
        return {
          board: prevState.board,
          playerTurn: nextTurn,
          moves: [...prevState.moves, chessNotation],
        } as GameState;
      },
      initialState
    );
  }

  private possibleMovesPawn(position: Position): Position[] {
    const state = this.getState();
    const piece = this.getSquarePiece(position);
    if (piece[1] !== "P") {
      throw new Error("Invalid piece");
    }
    if (piece[0] !== state.playerTurn) {
      throw new Error("Player is not on turn");
    }
    const moves: Position[] = [];
    switch (piece[0]) {
      case "b": {
        if (
          !this.getSquarePiece({
            left: position.left,
            top: position.top - 1,
          })
        ) {
          moves.push({
            left: position.left,
            top: position.top - 1,
          });
        }
        if (
          !this.getSquarePiece({
            left: position.left,
            top: position.top - 2,
          })
        ) {
          moves.push({
            left: position.left,
            top: position.top - 2,
          });
        }
        break;
      }
    }
    return moves;
  }

  private moveInChessNotation(move: GameMove, state: GameState) {
    const piece = state.board[move.from.top][move.from.left];
    //  TODO: figure taken
    //  TODO: promotion
    return (
      piece[1].replace("P", "") +
      String.fromCharCode(94 + move.from.left) +
      (this.board.length - move.from.top) +
      String.fromCharCode(94 + move.to.left) +
      (this.board.length - move.to.top)
    );
  }

  private validateMove(move: GameMove, state: GameState) {
    //  check is valid piece
    const piece = state.board[move.from.top][move.from.left];
    if (piece === "") {
      throw new Error("No piece selected");
    }
    //    check if player turn
    if (piece[0] !== state.playerTurn) {
      throw new Error("Can not move other player pieces");
    }
  }
}
