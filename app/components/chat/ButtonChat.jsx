"use client";
import ChatContext from "@/app/ChatContext";
import { Button } from "@nextui-org/react";
import React, { useContext } from "react";
import useStore from "@/app/ChatContext";

const ButtonChat = () => {
  const { isChat, setIsChat } = useStore();
  return (
    <svg
      onClick={() => setIsChat(!isChat)}
      xmlns="http://www.w3.org/2000/svg"
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
      <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
      <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
    </svg>
  );
};

export default ButtonChat;
