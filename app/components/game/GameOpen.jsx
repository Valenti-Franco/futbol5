"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ButtonJoin from "./buttonJoin";
import GameTeams from "./GameTeams";
import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import ResultGame from "./ResultGame";

const GameOpen = ({ idGame }) => {
  const [game, setgame] = useState([]);

  const [allPlayersData, setallPlayersData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    GetGame();
  }, []);

  useEffect(() => {
    // console.log("cambio");
    if (game?.players) {
      getAllPlayers();
    }
    // console.log(allPlayersData);
  }, [game]);

  const GetGame = async () => {
    try {
      const gameData = await axios.get(`/api/game/${idGame.id}`);

      // console.log(gameData.data);
      setgame(gameData.data.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  async function fetchPlayerData(playerId) {
    try {
      const response = await axios.get(`/api/player/${playerId}`);
      // console.log(response.data);
      return response.data; // Puedes personalizar según la respuesta real de tu API
    } catch (error) {
      console.error(
        `Error al obtener datos del jugador con ID ${playerId}:`,
        error.message
      );
      return null;
    }
  }
  const fetchAllPlayersData = async (gameData) => {
    // console.log(gameData);
    const allPlayersData = [];
    if (gameData?.length > 0) {
      for (const game of gameData) {
        for (const playerId of game.players) {
          const playerData = await fetchPlayerData(playerId);
          if (playerData) {
            allPlayersData.push(playerData);
          }
        }
      }
    }

    return allPlayersData;
  };

  const getAllPlayers = async () => {
    const allPlayersDataResponse = game?.players;
    // console.log(allPlayersDataResponse);
    // console.log(allPlayersDataResponse);
    setallPlayersData(allPlayersDataResponse);
  };

  const CameraIcon = ({
    fill = "currentColor",
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
    return (
      <svg
        height="200px"
        width="200px"
        version="1.1"
        id="Layer_1"
        // xmlns="http://www.w3.org/2000/svg"
        // xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        // xml:space="preserve"
        fill="#000000"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <circle
            fill="#40A459"
            cx="255.722"
            cy="256"
            r="255.445"
          ></circle>{" "}
          <path
            fill="#378B4E"
            d="M255.722,0.555c-1.944,0-3.878,0.03-5.812,0.073c-0.492,0.011-0.983,0.022-1.474,0.037 c-1.843,0.051-3.682,0.119-5.514,0.209c-0.474,0.023-0.945,0.056-1.418,0.081c-1.394,0.077-2.785,0.165-4.174,0.264 c-0.699,0.05-1.397,0.098-2.094,0.153c-1.61,0.128-3.217,0.27-4.82,0.428c-0.829,0.082-1.654,0.173-2.479,0.262 c-0.991,0.108-1.98,0.221-2.968,0.34c-0.856,0.103-1.714,0.202-2.567,0.313c125.334,16.327,222.126,123.498,222.126,253.282 S347.737,492.953,222.403,509.28c0.854,0.111,1.71,0.211,2.567,0.313c0.987,0.119,1.977,0.232,2.968,0.34 c0.826,0.09,1.652,0.181,2.479,0.262c1.603,0.158,3.209,0.3,4.82,0.428c0.696,0.056,1.395,0.104,2.094,0.153 c1.388,0.099,2.779,0.188,4.174,0.264c0.473,0.027,0.945,0.058,1.418,0.081c1.833,0.09,3.672,0.158,5.514,0.209 c0.491,0.014,0.982,0.026,1.474,0.037c1.932,0.043,3.868,0.073,5.812,0.073c141.079,0,255.445-114.367,255.445-255.445 S396.801,0.555,255.722,0.555z"
          ></path>{" "}
          <path
            fill="#898790"
            d="M222.403,233.787l106.563-61.152c0,0,116.569,24.829,143.473-24.263l8.485-15.483l7.379,16.04 c15.321,33.304,23.42,70.329,23.42,107.071c0,84.691-41.95,163.833-112.217,211.703l-7.25,4.94L222.403,233.787z"
          ></path>{" "}
          <path
            fill="#7A797F"
            d="M511.166,256c0-44.143-11.198-85.671-30.908-121.898l-7.82,14.269 c-9.45,17.245-21.888,34.878-34.284,50.741c4.162,18.295,6.374,37.333,6.374,56.888c0,71.337-29.248,135.834-76.4,182.176 l23.852,34.666C463.639,427.598,511.166,347.012,511.166,256z"
          ></path>{" "}
          <path
            fill="#3D9AE3"
            d="M255.722,512c-87.455,0-168.01-44.081-215.484-117.917l-4.527-7.04l142.267-119.937l163.74,230.122 l-10.434,3.385C306.874,508.169,281.452,512,255.722,512z"
          ></path>{" "}
          <path
            fill="#1D81CE"
            d="M342.752,496.827l-17.317-24.795c-30.569,19.333-65.625,32.915-103.137,37.801 c10.906,1.42,22.13,1.612,33.424,1.612C286.17,511.445,315.674,506.6,342.752,496.827z"
          ></path>{" "}
          <path
            fill="#FFFFFF"
            d="M177.978,267.106l44.425-33.319l170.805,238.278l-8.302,4.872 c-11.729,6.884-24.073,12.861-36.69,17.766l-6.499,2.527L177.978,267.106z"
          ></path>{" "}
          <path
            fill="#E0E0E3"
            d="M341.718,497.229c18.2-6.475,35.457-14.944,51.49-25.164l-24.615-34.338 c-13.395,13.232-28.248,24.992-44.293,35.023L341.718,497.229z"
          ></path>{" "}
          <path
            fill="#FFCE00"
            d="M31.37,379.188c-7.01-12.718-12.964-26.113-17.696-39.813l-2.112-8.059l299.691-208.592 l44.425,33.319L35.712,387.042L31.37,379.188z"
          ></path>{" "}
          <path
            fill="#CD2900"
            d="M382.579,250.216c-15.713-16.41-94.094-100.753-94.094-149.704C288.485,45.089,333.575,0,388.997,0 s100.512,45.089,100.512,100.512c0,48.918-78.382,133.287-94.095,149.704l0,0C391.917,253.87,386.077,253.871,382.579,250.216 L382.579,250.216z"
          ></path>{" "}
          <path
            fill="#891D00"
            d="M388.997,134.386c-24.803,0-44.98-20.178-44.98-44.98s20.178-44.98,44.98-44.98 c24.803,0,44.98,20.178,44.98,44.98S413.8,134.386,388.997,134.386z"
          ></path>{" "}
          <path
            fill="#FFFFFF"
            d="M144.659,186.586c29.088,0,52.755-23.666,52.755-52.755c0-4.6-3.729-8.33-8.33-8.33h-33.319 c-4.6,0-8.33,3.729-8.33,8.33c0,4.6,3.729,8.33,8.33,8.33h24.018c-3.769,15.901-18.088,27.766-35.125,27.766 c-19.902,0-36.095-16.193-36.095-36.095s16.193-36.095,36.095-36.095c8.8,0,17.275,3.202,23.865,9.015 c3.452,3.044,8.715,2.713,11.757-0.736c3.043-3.45,2.713-8.714-0.736-11.757c-9.636-8.5-22.025-13.181-34.886-13.181 c-29.088,0-52.755,23.666-52.755,52.755S115.57,186.586,144.659,186.586z"
          ></path>{" "}
        </g>
      </svg>
    );
  };
  const { theme, setTheme } = useTheme("dark");

  return (
    <>
      {game && (
        <div
          key={game._id}
          style={{
            color: theme === "light" ? "#000" : "#fff",
          }}
          className=" rounded-xl h-full overflow-y-auto  mb-8 shadow-md  flex flex-col"
        >
          <div class="relative flex flex-col  md:flex-row  bg-clip-border ">
            <div class="relative m-0 md:w-2/5 shrink-0 overflow-hidden rounded-xl rounded-r-none m-4 bg-white bg-clip-border text-gray-700">
              <img
                src="https://vivo247.com/wp-content/uploads/2020/11/futbol5-16112020.jpg"
                alt="image"
                class="h-full w-full object-cover"
              />
            </div>
            <div class="p-6">
              <h6 class="mb-4 block font-sans text-base font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
                FUTBOL 5{" "}
                {game.isOpen ? (
                  <b className=" text-black bg-green-300">ABIERTO!</b>
                ) : (
                  <b className=" text-black bg-red-300">CERRADO!</b>
                )}
              </h6>
              <h4 class="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                {game.site}
              </h4>
              <p class="mb-8 block font-sans text-base font-normal leading-relaxed  antialiased">
                ¡Ah, mirá vos, qué onda con el partido de F5! Mirá, la movida es
                así: la gente tiene que sumarse al partido de F5 porque el
                ganador de la temporada se lleva la módica suma de $50000. ¡Sí,
                cinco lucas! Imaginate vos, ¿no? Es como el súper premio para el
                que se banca todo el campeonato y sale victorioso.
              </p>
              <div className="flex my-2 items-center">
                <a href="https://maps.app.goo.gl/eqi41QCdYUuafSNt9">
                  <Button
                    color="primary"
                    variant="ghost"
                    endContent={<CameraIcon />}
                  >
                    UBICACIÓN
                  </Button>
                </a>
              </div>
              <ButtonJoin game={game} GetGame={GetGame} />
            </div>
          </div>
          <p className="px-4 mx-4 font-extrabold text-xl">Jugadores:</p>
          <ul className=" rounded p-2 m-2 flex gap-1">
            {allPlayersData.map(
              (player, index) =>
                player &&
                player.name && (
                  <li className="  bold  text-xs" key={player._id}>
                    {index + 1 + " " + player.name + " | "}
                  </li>
                )
            )}
          </ul>
          {loading ? (
            <>
              {game.isFinish && <ResultGame game={game} />}
              <GameTeams game={game} allPlayersData={allPlayersData} />
            </>
          ) : null}
        </div>
      )}
    </>
  );
};

export default GameOpen;
