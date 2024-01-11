import { create } from "zustand";
import { START_POSITION_FEN } from "./lib/constants";
import { Chess } from "chess.js";

type T_ChessState = {
  positionFen: string;
  setPositionFen: (fen: string) => void;

  chess: Chess;
  setChess: (chess: Chess) => void;
};

export const useChessState = create<T_ChessState>((set) => ({
  positionFen: START_POSITION_FEN,
  setPositionFen: (fen: string) => set({ positionFen: fen }),

  chess: new Chess(),
  setChess: (chess: Chess) => set({ chess }),
}));
