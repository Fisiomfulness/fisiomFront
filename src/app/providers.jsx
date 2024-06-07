"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Provider as JotaiProvider } from "jotai";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <SessionProvider>
        <JotaiProvider>{children}</JotaiProvider>
      </SessionProvider>
    </NextUIProvider>
  );
}
