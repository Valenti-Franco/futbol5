"use client";
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
import Link from "next/link";
import { useTheme } from "next-themes";

const GameAllComponent = () => {
  const { theme, setTheme } = useTheme("dark");

  const [game, setgame] = useState([]);

  const GetGame = async () => {
    try {
      const gameData = await axios.get(
        "https://futbol5-one.vercel.app/api/game"
      );

      // console.log(gameData.data);
      setgame(gameData.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetGame();
  }, []);

  // console.log(game);
  return (
    <div className=" flex w-full gap-5 flex-col">
      {game.map((game) => (
        <Card key={game._id} className="w-full relative  ">
          {game.isOpen ? (
            <Chip
              className="absolute text-white top-2 right-2 z-20 max-[600px]:left-5"
              color="success"
              variant="shadow"
            >
              ABIERTO
            </Chip>
          ) : (
            <Chip
              className="absolute text-white top-2 right-2 z-20 max-[600px]:left-5"
              color="danger"
              variant="flat"
              isDisabled
            >
              CERRADO
            </Chip>
          )}

          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={180}
              // radius="sm"
              src="https://vivo247.com/wp-content/uploads/2020/11/futbol5-16112020.jpg"
              width={180}
            />
            <div className="flex flex-col">
              <p className="text-md">Lugar: {game.site}</p>
              <p className="text-small text-default-500">Dia: {game?.day}</p>

              <p className="text-small text-default-500">Hora: {game.time}</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Jugadores Unidos: {game.players.length}</p>
          </CardBody>
          <Divider />
          <CardFooter className="flex items-center justify-center">
            {game.isOpen ? (
              <Link isExternal showAnchorIcon href={`/game/${game._id}`}>
                IR AL PARTIDO
              </Link>
            ) : (
              <Link isExternal showAnchorIcon href={`/game/${game._id}`}>
                <Chip
                  className="text-white"
                  color="danger"
                  variant="flat"
                  isDisabled
                >
                  IR AL PARTIDO
                </Chip>
              </Link>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GameAllComponent;
