import { useState } from "react";
import BoardCell from "./board-cell";
import { useChessState } from "./board.state";
import PlayerToolbar from "./player-toolbar";

const BoardView = () => {
  const { chess } = useChessState();
  const [_, setRerender] = useState(0);
  return (
    <div className="w-[800px]">
      <div className="flex gap-3 flex-col w-full items-center">
        <PlayerToolbar variant="dark" />
        <div className="w-full h-[800px] grid grid-rows-8 grid-cols-8">
          {chess.board().map((row, i) => {
            return row.map((cell, j) => {
              return (
                <BoardCell
                  variant={i % 2 === j % 2 ? "light" : "dark"}
                  key={`${i}-${j}`}
                  cellPeice={{
                    color: cell?.color,
                    type: cell?.type,
                  }}
                >
                  {cell ? cell.type : ""}
                </BoardCell>
              );
            });
          })}

          {/* {Array(SQ_COUNT)
            .fill(0)
            .map((_, i) => {
              return Array(SQ_COUNT)
                .fill(0)
                .map((_, j) => {
                  return (
                    <BoardCell
                      variant={i % 2 === j % 2 ? "light" : "dark"}
                      key={`${i}-${j}`}
                    />
                  );
                });
            })} */}
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
          }}
        >
          Random Move
        </button>
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md"
          onClick={() => {
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
