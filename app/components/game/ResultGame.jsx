"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { Divider } from "@nextui-org/react";
const ResultGame = ({ game }) => {
  return (
    <div className="p-4 my-8">
      <div className="font-extrabold">
        <h2>PARTIDO FINALIZADO</h2>
      </div>
      <Divider className=" " />

      <div className="flex  flex-col  w-full gap-4  text-5xl   font-extrabold">
        <div className="flex items-center relative w-full justify-around gap-2  ">
          <label className="flex absolute top-14 md:top-auto left-2 flex-col  items-center  ">
            <p className="text-xl  ">LOCAL</p>
          </label>
          <CountUp className="p-3" end={game.scoreTeamA} duration={5} />
          <Divider className="absolute " orientation="vertical" />
          <CountUp className="p-3" end={game.scoreTeamB} duration={5} />

          <label className="flex absolute top-14 md:top-auto right-2 flex-col  items-center  ">
            <p className="text-xl  ">VISITANTE</p>
          </label>
        </div>
      </div>
      <Divider className=" " />
    </div>
  );
};

export default ResultGame;
