import { create } from "zustand";
import { START_POSITION_FEN } from "./lib/constants";
import { Chess, Square } from "chess.js";

type T_ChessState = {
  positionFen: string;
  setPositionFen: (fen: string) => void;

  validMovesSquares: Square[];

  setValidMovesSquares: (squares: Square[]) => void;

  selectedSquare: Square | null;

  setSelectedSquare: (square: Square | null) => void;

  chess: Chess;
  setChess: (chess: Chess) => void;
};

export const useChessState = create<T_ChessState>((set) => ({
  positionFen: START_POSITION_FEN,
  setPositionFen: (fen: string) => set({ positionFen: fen }),

  validMovesSquares: [],
  setValidMovesSquares: (squares: Square[]) =>
    set({ validMovesSquares: squares }),

  selectedSquare: null,
  setSelectedSquare: (square: Square | null) => set({ selectedSquare: square }),

  chess: new Chess(),
  setChess: (chess: Chess) => set({ chess }),
}));
