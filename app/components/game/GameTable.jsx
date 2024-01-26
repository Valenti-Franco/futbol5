import axios from "axios";

import React from "react";
import GameTableComponent from "./GameTableComponent";

const GameTable = async () => {
  const page = 1; // Página actual
  const pageSize = 10; // Tamaño de página
  let game;
  try {
    game = await axios.put(`http://localhost:3000/api/player`, {
      page: page,
      pageSize: pageSize,
    });
  } catch (error) {
    console.log(error);
  }

  return <GameTableComponent game={game?.data} />;
};

export default GameTable;
