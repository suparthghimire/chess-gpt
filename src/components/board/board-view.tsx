import { useEffect, useRef, useState } from "react";
import BoardCell from "./board-cell";
import { useChessState } from "./board.state";
import PlayerToolbar from "./player-toolbar";
import { Convert1DTo2D, IndicesToPGN } from "./lib/helpers";
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

  const [changeSelectedSquare, setChangeSelectedSquare] = useState(false);

  const parentDiv = useRef<HTMLDivElement>(null);

  const [pieces, setPieces] = useState(
    chess.board().flatMap((row) => {
      return row.map((cell) => {
        return {
          color: cell?.color,
          type: cell?.type,
        };
      });
    })
  );

  const reorderPeices = () => {
    const newPieces = chess.board().flatMap((row) => {
      return row.map((cell) => {
        return {
          color: cell?.color,
          type: cell?.type,
        };
      });
    });
    // setPieces(newPieces);

    setPieces((prev) => {
      // compare prev array with newPieces array
      // find indices of differences
      const idxes = prev.reduce((acc, curr, idx) => {
        if (curr.color !== newPieces[idx].color) {
          acc.push(idx);
        }
        return acc;
      }, [] as number[]);

      // replace only the differing indices
      idxes.forEach((idx) => {
        prev[idx] = newPieces[idx];
      });

      // return the modified prev array
      return prev;
    });
  };

  useEffect(() => {
    parentDiv.current && autoAnimate(parentDiv.current);
  }, [parent]);

  return (
    <div className="w-[800px]">
      <div className="flex gap-3 flex-col w-full items-center">
        <PlayerToolbar variant="dark" />
        <div className="relative w-full h-[800px]">
          <div className="w-full h-[800px] grid grid-rows-8 grid-cols-8">
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
                  />
                );
              });
            })}
          </div>
          <div
            ref={parentDiv}
            className="absolute top-0 w-full h-[800px] grid grid-rows-8 grid-cols-8"
          >
            {pieces.map((peice, pidx) => (
              <button
                key={`peice-${peice.color ?? ""}-${peice.type ?? ""}-${pidx}`}
                className="w-full h-full text-black grid place-items-center"
                onClick={() => {
                  const [i, j] = Convert1DTo2D(pidx, 8);
                  const square = IndicesToPGN(i, j);
                  try {
                    if (selectedSquare !== null) {
                      // a move is needed to be made
                      const move = chess.move({
                        from: selectedSquare,
                        to: square,
                        promotion: "q",
                      });
                      // check is move is not undefined and if it is valid

                      if (move) {
                        setRerender((prev) => prev + 1);
                        setSelectedSquare(null);
                        setValidMovesSquares([]);
                        reorderPeices();
                      }
                      setSelectedSquare(null);
                      setValidMovesSquares([]);
                    } else {
                      // check if the square is empty
                      if (!peice?.color || !peice?.type) return;
                      // check if price color is same as turn
                      if (peice.color !== chess.turn()) return;

                      // change selected square
                      setSelectedSquare(square);
                      const validMoves = chess.moves({
                        square: square,
                        verbose: true,
                      });
                      const validSquares = validMoves.map((move) => {
                        return move.to;
                      });
                      setValidMovesSquares(validSquares);
                    }
                  } catch (error) {
                    console.log("ILLEAGAL MOVE");
                  }
                }}
              >
                {peice?.color && peice?.type && (
                  <img
                    src={`/assets/sprites/${peice?.color}/${peice?.type}.svg`}
                    className="relative w-[70%] h-[70%] z-2"
                  />
                )}
              </button>
            ))}
          </div>
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

            reorderPeices();
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
            setPieces(
              chess.board().flatMap((row) => {
                return row.map((cell) => {
                  return {
                    color: cell?.color,
                    type: cell?.type,
                  };
                });
              })
            );
          }}
        >
          Reset Board
        </button>
      </div>
    </div>
  );
};

export default BoardView;
