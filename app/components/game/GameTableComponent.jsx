"use client";
import { useTheme } from "next-themes";
import React from "react";

const GameTableComponent = ({ game }) => {
  const { theme, setTheme } = useTheme("dark");

  return (
    <div
      class={`flex w-auto rounded-xl flex-col ${
        theme === "light" ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
      }`}
    >
      <div class="overflow-x-auto rounded-xl ">
        <div class=" inline-block min-w-full ">
          <div class="overflow-hidden">
            <table class="min-w-full">
              <thead class=" border-b">
                <tr>
                  <th
                    scope="col"
                    class={`text-sm font-medium px-6 py-4 text-left ${
                      theme === "light" ? "text-gray-900" : " text-white"
                    }`}
                  ></th>
                  <th
                    colspan="2"
                    class="text-sm font-medium  px-6 py-4 text-left"
                  >
                    Jugadores
                  </th>

                  <th
                    colspan="2"
                    class="text-sm font-medium  px-6 py-4 text-left"
                  >
                    Puntos
                  </th>
                </tr>
              </thead>
              <tbody>
                {game?.data?.map((user, index) => (
                  <tr
                    key={user._id}
                    class={`border-b ${
                      theme === "light" ? "bg-gray-100 " : " bg-gray-600 "
                    }`}
                  >
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                      {index + 1}
                    </td>
                    <td
                      colspan="2"
                      class="text-sm  font-light px-6 py-4 whitespace-nowrap"
                    >
                      {user.name}
                    </td>

                    <td class="text-sm font-light px-6 py-4 whitespace-nowrap">
                      {user.win * 3}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameTableComponent;
