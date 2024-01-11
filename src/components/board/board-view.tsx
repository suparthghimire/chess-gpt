import React from "react";
import BoardCell from "./board-cell";
import PlayerToolbar from "./player-toolbar";

const SQ_COUNT = 8;

const BoardView = () => {
  return (
    <div className="w-[800px]">
      <div className="flex gap-3 flex-col w-full items-center">
        <PlayerToolbar variant="dark" />
        <div className="w-full h-[800px] grid grid-rows-8 grid-cols-8">
          {Array(SQ_COUNT)
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
            })}
        </div>
        <PlayerToolbar variant="light" />
      </div>
    </div>
  );
};

export default BoardView;
