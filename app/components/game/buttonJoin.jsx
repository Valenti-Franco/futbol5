"use client";
import { Button, Input, button } from "@nextui-org/react";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import DeleteGame from "./modal/DeleteGame";
import FinishGame from "./modal/FinishGame";

const ButtonJoin = ({ game, GetGame }) => {
  const [Game, setGame] = useState(game);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.user?.email) {
      getUser();
    }
  }, [session]);

  const [user, setuser] = useState(false);
  const [userInGame, setUserInGame] = useState(false);

  const getUser = async () => {
    try {
      const dataUser = await axios.post(
        "https://futbol5-one.vercel.app/api/player/getByEmail",
        {
          email: session.user.email,
        }
      );

      setuser(dataUser.data.data);

      const estaEnLaLista = game.players
        .map((player) => player._id)
        .includes(dataUser.data.data._id);
      //   console.log(estaEnLaLista);
      setUserInGame(estaEnLaLista);

      // console.log(dataUser.data);
    } catch (error) {
      // console.log("no se pudo");
    }
  };

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const [backdrop2, setBackdrop2] = React.useState("blur");

  const backdrops = ["opaque", "blur", "transparent"];

  const finishGame = async (teamA, teamB) => {
    try {
      const response = await axios.put(
        `https://futbol5-one.vercel.app/api/game/${Game._id}`,
        {
          teamA: teamA,
          teamB: teamB,
        },
        {
          headers: {
            id: `${user._id}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handlerGame = async () => {
    try {
      const data = await axios(
        `https://futbol5-one.vercel.app/api/game/${Game._id}/user/${user._id}`
      );
      const game1 = await axios.get(
        `https://futbol5-one.vercel.app/api/game/${Game._id}`
      );
      setGame(game1.data.data);

      const estaEnLaLista = game1.data.data.players.some(
        (player) => player._id === user._id
      );
      if (estaEnLaLista) {
        toast("TE UNISTE AL PARTIDO");
      } else {
        toast.error("ABANDONASTE EL PARTIDO");
      }
      setUserInGame(estaEnLaLista);
      GetGame();
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const changeOpen = async (open) => {
    try {
      const data = await axios(
        `https://futbol5-one.vercel.app/api/game/${Game._id}/user/${user._id}/isOpen/${open}`
      );
      // console.log(data.data);
      const game1 = await axios.get(
        `https://futbol5-one.vercel.app/api/game/${Game._id}`
      );
      setGame(game1.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async () => {
    try {
      const data = await axios.delete(
        `https://futbol5-one.vercel.app/api/game/${Game._id}`,
        {
          headers: {
            id: `${user._id}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const randomTeam = async () => {
    try {
      const data = await axios(
        `https://futbol5-one.vercel.app/api/game/${Game._id}/user/${user._id}/random`
      );
      console.log(data.data);
      const game1 = await axios.get(
        `https://futbol5-one.vercel.app/api/game/${Game._id}`
      );
      setGame(game1.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-5">
      <Toaster />
      {userInGame ? (
        <a class="inline-block" href="#">
          <Button
            color="danger"
            variant="ghost"
            onClick={() => handlerGame()}
            type="button"
          >
            ABANDONAR
          </Button>
        </a>
      ) : (
        <a class="inline-block" href="#">
          <Button
            className="text-2xl"
            color="success"
            variant="shadow"
            onClick={() => handlerGame()}
            type="button"
          >
            UNIRSE
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              ></path>
            </svg>
          </Button>
        </a>
      )}

      <p className=" font-extrabold text-2xl">{Game?.players?.length}/10</p>
      {user.role === "admin" && !Game.isFinish && (
        <div class="flex gap-2 flex-wrap">
          {Game.isOpen ? (
            <Button onClick={() => changeOpen(false)} color="danger">
              Cerrar
            </Button>
          ) : (
            <Button onClick={() => changeOpen(true)} color="primary">
              Abrir
            </Button>
          )}
          <Button
            onClick={() => randomTeam()}
            isIconOnly
            color="warning"
            variant="faded"
            aria-label="Take a photo"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-arrows-shuffle"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M18 4l3 3l-3 3" />
              <path d="M18 20l3 -3l-3 -3" />
              <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5" />
              <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3" />
            </svg>
          </Button>
          <FinishGame finishGame={finishGame} />
          <DeleteGame deleteGame={deleteGame} />
        </div>
      )}
    </div>
  );
};

export default ButtonJoin;
