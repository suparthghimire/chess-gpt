import { useEffect, useRef, useState } from "react";
import BoardCell from "./board-cell";
import { useChessState } from "./board.state";
import PlayerToolbar from "./player-toolbar";
import { IndicesToPGN } from "./lib/helpers";
import autoAnimate from "@formkit/auto-animate";

const BoardView = () => {
  const {
    chess,
    validMovesSquares,
    setValidMovesSquares,
    selectedSquare,
    setSelectedSquare,
  } = useChessState();
  const [_, setRerender] = useState(0);
  const [show, setShow] = useState(false);
  const reveal = () => setShow(!show);

  const parentDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    parentDiv.current && autoAnimate(parentDiv.current);
  }, [parent]);

  return (
    <div className="w-[800px]">
      <div className="flex gap-3 flex-col w-full items-center">
        <PlayerToolbar variant="dark" />
        <div
          ref={parentDiv}
          className="w-full h-[800px] grid grid-rows-8 grid-cols-8"
        >
          {chess.board().map((row, i) => {
            return row.map((cell, j) => {
              return (
                <BoardCell
                  variant={i % 2 === j % 2 ? "light" : "dark"}
                  key={`${i}-${j}`}
                  highlightValid={validMovesSquares.includes(
                    IndicesToPGN(i, j)
                  )}
                  highlightSelected={selectedSquare === cell?.square}
                  cellPeice={{
                    color: cell?.color,
                    type: cell?.type,
                  }}
                  onClick={() => {
                    if (cell?.square) {
                      setSelectedSquare(cell.square);
                      const validMoves = chess.moves({
                        square: cell.square,
                        verbose: true,
                      });

                      const validSquares = validMoves.map((move) => {
                        return move.to;
                      });
                      setValidMovesSquares(validSquares);
                    }
                  }}
                />
              );
            });
          })}
        </div>
        <PlayerToolbar variant="light" />
        <div>
          Fen: <span>{chess.fen()}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={() => {
            const allMoves = chess.moves();
            const randomMove =
              allMoves[Math.floor(Math.random() * allMoves.length)];
            console.log(randomMove);
            if (randomMove) chess.move(randomMove);
            setRerender((prev) => prev + 1);
            setSelectedSquare(null);
            setValidMovesSquares([]);
          }}
        >
          Random Move
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={() => {
            setValidMovesSquares([]);
            setSelectedSquare(null);
            chess.reset();
            setRerender((prev) => prev + 1);
          }}
        >
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default BoardView;
