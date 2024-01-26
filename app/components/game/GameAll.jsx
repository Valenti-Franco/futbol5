import React from "react";
import GameAllComponent from "./GameAllComponent";
import GameTable from "./GameTable";
import CreateGame from "./CreateGame";

const GameAll = async () => {
  return (
    <div className="flex flex-col xl:flex-row  w-full gap-3 justify-around  ">
      <div className="flex flex-col w-full">
        <GameAllComponent />
        <CreateGame />
      </div>

      <GameTable />
    </div>
  );
};

export default GameAll;
