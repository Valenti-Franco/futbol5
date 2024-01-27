"use client";

import React, { useState } from "react";
import ButtonChat from "./ButtonChat";
import useStore from "@/app/ChatContext";

const ChatButtonComponent = () => {
  const { isChat, setIsChat } = useStore();
  return <ButtonChat isChat={isChat} setIsChat={setIsChat} />;
};

export default ChatButtonComponent;
