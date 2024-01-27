"use client";
import React from "react";
import { useTheme } from "next-themes";
const ProviderTheme = ({ children }) => {
  const { theme, setTheme } = useTheme("dark");

  //   console.log(theme);
  return (
    <div className={theme === "light" ? "bg-gray-200" : "bg-black-200"}>
      {children}
    </div>
  );
};

export default ProviderTheme;
