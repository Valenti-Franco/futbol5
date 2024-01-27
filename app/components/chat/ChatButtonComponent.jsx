"use client";

import React, { useState } from "react";
import Chat from "./chat";
import useStore from "@/app/ChatContext";
const ChatButtonComponent = () => {
  const { isChat, setIsChat } = useStore();

  return (
    <div
      className={`flex h-dvh ${
        isChat ? "w-2/5" : "w-0"
      }  absolute xl:sticky   xl:mt-10  top-0 flex-col`}
    >
      <Chat isChat={isChat} setIsChat={setIsChat} />
    </div>
  );
};

export default ChatButtonComponent;
