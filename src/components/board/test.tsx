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

  const [numbers, setNumbers] = useState(
    new Array(50).fill("").map((_, i) => i)
  );

  const randomizeNms = () => {
    setNumbers((prev) => {
      const copy = [...prev];
      copy.sort(() => (Math.random() > 0.5 ? 1 : -1));
      return copy;
    });
  };

  const randomizePieces = () => {
    setPieces((prev) => {
      const copy = [...prev];
      copy.sort(() => (Math.random() > 0.5 ? 1 : -1));
      return copy;
    });
  };

  useEffect(() => {
    parentDiv.current && autoAnimate(parentDiv.current);
  }, [parent]);

  return (
    <div className="w-[800px]">
      <div className="flex gap-3 flex-col w-full items-center">
        <PlayerToolbar variant="dark" />
        <div className="relative w-full">
          {/* <div className="w-full h-[800px] grid grid-rows-8 grid-cols-8">
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
          </div> */}

          <div
            ref={parentDiv}
            className="top-0 left-0 w-full h-[800px] grid grid-rows-8 grid-cols-8 border-2 pointer-events-none"
          >
            {/* {pieces.map((cell, i) => {
              return (
                <div key={`${i}`} className="flex items-center justify-center">
                  {cell?.color && cell?.type && (
                    <img
                      src={`/assets/sprites/${cell?.color}/${cell?.type}.svg`}
                      className="relative w-[80%] h-[80%] z-2"
                    />
                  )}
                </div>
              );
            })} */}

            {numbers.map((cell, i) => {
              return (
                <div
                  key={`${i}`}
                  className="flex border-2 text-white items-center justify-center"
                >
                  {cell}
                  {/* {cell?.color && cell?.type && ( */}
                  {/* <img
                      src={`/assets/sprites/${cell?.color}/${cell?.type}.svg`}
                      className="relative w-[80%] h-[80%] z-2"
                    /> */}
                  {/* // )} */}
                </div>
              );
            })}
          </div>
        </div>

        <PlayerToolbar variant="light" />
        <div>
          Fen: <span>{chess.fen()}</span>
        </div>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={() => {
            randomizeNms();
            // const allMoves = chess.moves();
            // const randomMove =
            //   allMoves[Math.floor(Math.random() * allMoves.length)];
            // console.log(randomMove);
            // if (randomMove) chess.move(randomMove);
            // setRerender((prev) => prev + 1);
            // setSelectedSquare(null);
            // setValidMovesSquares([]);

            randomizePieces();

            // const newPieces = chess.board().map((row) => {
            //   return row.map((cell) => {
            //     return {
            //       color: cell?.color,
            //       type: cell?.type,
            //     };
            //   });
            // });
            // setPieces(newPieces);
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
