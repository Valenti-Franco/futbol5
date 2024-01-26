"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider, useTheme } from "next-themes";
import ProviderTheme from "./ProviderTheme";

const Providers = ({ children }) => {
  return (
    <SessionProvider>
      <ThemeProvider>
        <NextUIProvider>
          <ProviderTheme>{children}</ProviderTheme>
        </NextUIProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
