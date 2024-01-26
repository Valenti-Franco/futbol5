"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

const GameTeams = ({ game, allPlayersData }) => {
  const [games, setgames] = useState(game);
  // console.log(game);
  useEffect(() => {
    // console.log("xD");
    setgames(games);
  }, [game]);
  const { data: session, status } = useSession();

  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [first, setFirst] = useState(true);

  const [hover1, sethover1] = useState(false);
  const [hover2, sethover2] = useState(false);

  const handlerTeam = async (team) => {
    try {
      const dataUser = await axios.post(`/api/player/getByEmail`, {
        email: session.user.email,
      });

      try {
        const data = await axios(
          `/api/game/${game._id}/user/${dataUser.data.data._id}/${team}`
        );
        if (data.data.status !== 200) {
          toast.error(data.data.data);
        } else {
          // console.log(data);
          setgames(data.data.data.game);
          toast("Equipo Cambiado");

          setFirst(false);
        }
      } catch (error) {
        // console.log(error.response.data.error);
        toast.error(error.response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const populateTeams = () => {
      if (first) {
        if (allPlayersData.length > 0) {
          // console.log(allPlayersData);
          // console.log(games);
          const populatedTeam1 = games.teamA?.map((userId) =>
            allPlayersData.find((player) => player._id === userId)
          );
          const populatedTeam2 = games.teamB?.map((userId) =>
            allPlayersData.find((player) => player._id === userId)
          );

          // console.log(populatedTeam1, populatedTeam2);
          setTeam1(populatedTeam1);
          setTeam2(populatedTeam2);
        }
      } else {
        // console.log("games", games);
        // console.log("allPlayersData", allPlayersData);
        const populatedTeam1 = games.teamA?.map((userId) =>
          allPlayersData.find((player) => player._id === userId._id)
        );

        const populatedTeam2 = games.teamB?.map((userId) =>
          allPlayersData.find((player) => player._id === userId._id)
        );

        // console.log(populatedTeam1, populatedTeam2);
        setTeam1(populatedTeam1);
        setTeam2(populatedTeam2);
      }
    };

    populateTeams();
    // console.log(team1, team2);
  }, [games, allPlayersData]);

  // const gameTime = new Date(game.time);

  // const formattedTime = `${gameTime.getDate().toString().padStart(2, "0")}-${(
  //   gameTime.getMonth() + 1
  // )
  //   .toString()
  //   .padStart(2, "0")} ${gameTime
  //   .getHours()
  //   .toString()
  //   .padStart(2, "0")}:${gameTime.getMinutes().toString().padStart(2, "0")}`;
  const { theme, setTheme } = useTheme("dark");
  return (
    <div className="relative text-black flex w-full  ">
      <Toaster />
      <div
        style={{
          color: theme === "light" ? "#000" : "#fff",
        }}
        className="absolute w-full text-center text-2xl z-20 font-extrabold"
      >
        {" "}
        <h1>
          {game.day}, Hora: {game.time}
        </h1>
      </div>

      <div
        onClick={() => handlerTeam(2)}
        className="absolute max-[600px]:w-[calc(50vw-2rem)]  cursor-pointer transition ease-in-out delay-150  right-0 z-10"
      >
        <div
          onMouseEnter={() => sethover2(true)}
          onMouseLeave={() => sethover2(false)}
          class=" shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16"
          style={{
            color: theme === "light" ? "#000" : "#fff",
          }}
        >
          <div
            style={{
              background: theme === "light" ? "#eee" : "#333",

              color: theme === "light" ? "#000" : "#fff",
            }}
            class=" py-2 px-4"
          >
            <h2 class="text-xl text-end font-semibold ">EQUIPO VISITANTE</h2>
          </div>
          <ul
            style={{
              background: theme === "light" ? "#fff" : "#222",
              color: theme === "light" ? "#000" : "#fff",
            }}
            class="divide-y divide-gray-200"
          >
            {team2?.length > 0 &&
              team2?.map(
                (user, index) =>
                  user?._id && (
                    <li
                      key={index}
                      class="flex max-[600px]:flex-wrap items-center py-4 px-6"
                    >
                      <div class="flex-1">
                        <h3 className="text-lg font-medium ">
                          {user?.name && user.name.length > 10
                            ? `${user.name.slice(0, 10)}...`
                            : user?.name}
                        </h3>
                        <p
                          style={{
                            color:
                              theme === "text-gray-600"
                                ? "#000"
                                : "text-gray-300",
                          }}
                          className=" text-base"
                        >
                          {user?.win} Ganados
                        </p>
                      </div>
                      <img
                        className="w-12 h-12 rounded-full object-cover ml-4"
                        src={user?.url}
                        alt="User avatar"
                      />
                      <span
                        style={{
                          color:
                            theme === "text-gray-600"
                              ? "#000"
                              : "text-gray-300",
                        }}
                        className=" text-lg font-medium ml-4"
                      >
                        {index + 1}
                      </span>
                    </li>
                  )
              )}
          </ul>
        </div>
      </div>

      <div className="flex w-full flex-row-reverse  ">
        <div
          onClick={() => handlerTeam(1)}
          className="absolute
          max-[600px]:w-[calc(50vw-2rem)] 
          cursor-pointer transition ease-in-out delay-150  left-0 z-10"
        >
          <div
            onMouseEnter={() => sethover1(true)}
            onMouseLeave={() => sethover1(false)}
            class="bg-white shadow-md rounded-md overflow-hidden max-w-lg mx-auto mt-16"
            style={{
              color: theme === "light" ? "#000" : "#fff",
            }}
          >
            <div
              style={{
                background: theme === "light" ? "#eee" : "#333",

                color: theme === "light" ? "#000" : "#fff",
              }}
              class=" py-2 px-4"
            >
              <h2 class="text-xl font-semibold ">EQUIPO LOCAL</h2>
            </div>
            <ul
              style={{
                background: theme === "light" ? "#fff" : "#222",
                color: theme === "light" ? "#000" : "#fff",
              }}
              class="divide-y divide-gray-200"
            >
              {team1?.length > 0 &&
                team1?.map(
                  (user, index) =>
                    // <h1>{user?.data.name}</h1>
                    user?._id && (
                      <li
                        key={index}
                        className="flex max-[600px]:flex-wrap  items-center py-4 px-6"
                      >
                        <span
                          style={{
                            color:
                              theme === "text-gray-600"
                                ? "#000"
                                : "text-gray-300",
                          }}
                          className=" text-lg font-medium mr-4"
                        >
                          {index + 1}
                        </span>
                        <img
                          className="w-12 h-12 rounded-full object-cover mr-4"
                          src={user?.url}
                          alt="User avatar"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-medium ">
                            {user?.name && user.name.length > 10
                              ? `${user.name.slice(0, 10)}...`
                              : user?.name}
                          </h3>
                          <p
                            style={{
                              color:
                                theme === "text-gray-600"
                                  ? "#000"
                                  : "text-gray-300",
                            }}
                            className=" text-base"
                          >
                            {user?.win} Ganados
                          </p>
                        </div>
                      </li>
                    )
                )}
            </ul>
          </div>
        </div>
        <svg
          onClick={() => handlerTeam(2)}
          onMouseEnter={() => sethover2(true)}
          onMouseLeave={() => sethover2(false)}
          className={
            hover2
              ? "cursor-pointer  bg-slate-500 transition ease-in-out delay-150"
              : "cursor-pointer"
          }
          fill="#4d8e29"
          version="1.1"
          id="Layer_1"
          viewBox="0 -250 500.092 500.092"
          stroke="#4d8e29"
          transform="rotate(90)"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <g>
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M249.754,198.772c-25.564,0-46.736,18.908-50.416,43.464h100.828C296.482,217.68,275.314,198.772,249.754,198.772z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M385.126,0.004h-53.032V66.42c0,4.316-4,7.816-8.32,7.816h-22.208c-8.448,21.28-28.728,35.276-51.832,35.276 c-23.096,0-43.376-13.996-51.828-35.276h-22.224c-4.308,0-7.684-3.5-7.684-7.816V0h-53.404c-18.12,0-32.548,14.836-32.548,32.948 v209.288h101.496c3.776-33.204,32.012-59.092,66.212-59.092s62.432,25.888,66.208,59.092h102.084V32.948 C418.046,14.836,403.242,0.004,385.126,0.004z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M215.266,74.236c7.14,12.044,20.044,19.648,34.468,19.648c14.424,0,27.336-7.604,34.476-19.648H215.266z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <rect x="183.646" width="132.84" height="58.604"></rect>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </g>
        </svg>
        <svg
          onMouseEnter={() => sethover1(true)}
          onMouseLeave={() => sethover1(false)}
          className={
            hover1
              ? "cursor-pointer  bg-slate-500 transition ease-in-out delay-150"
              : "cursor-pointer"
          }
          onClick={() => handlerTeam(1)}
          fill="#4d8e29"
          version="1.1"
          id="Layer_1"
          viewBox="0 250 500.092 500.092"
          stroke="#4d8e29"
          transform="rotate(90)"
        >
          <g>
            <g>
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M199.41,257.86c3.876,24.328,24.944,42.996,50.344,42.996c25.396,0,46.464-18.668,50.34-42.996H199.41z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M315.89,257.86c-3.992,32.976-32.1,58.624-66.136,58.624c-34.04,0-62.144-25.652-66.14-58.624H82.046v209.288 c0,18.112,14.428,32.944,32.548,32.944h53.408v-66.416c0-4.316,3.376-7.816,7.684-7.816h22.216 c8.448-21.28,28.732-35.276,51.828-35.276c23.1,0,43.384,13.996,51.828,35.276h22.22c4.32,0,8.32,3.5,8.32,7.816v66.416h53.028 c18.116,0,32.92-14.832,32.92-32.944V257.86H315.89z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <path d="M249.726,406.212c-14.42,0-27.324,7.604-34.468,19.648h68.94C277.058,413.816,264.15,406.212,249.726,406.212z"></path>{" "}
                </g>{" "}
              </g>{" "}
              <g>
                {" "}
                <g>
                  {" "}
                  <rect
                    x="183.646"
                    y="441.488"
                    width="132.84"
                    height="58.604"
                  ></rect>{" "}
                </g>{" "}
              </g>{" "}
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default GameTeams;
