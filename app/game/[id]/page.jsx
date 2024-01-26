"use client";

import GameOpen from "@/app/components/game/GameOpen";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const id = useParams();
  console.log(id.id);
  return <GameOpen idGame={id} />;
};

export default Page;
