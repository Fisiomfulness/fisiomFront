"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Provider as JotaiProvider } from "jotai";

export function Providers({ children }) {
  return (
    <NextUIProvider>
      <JotaiProvider>{children}</JotaiProvider>
    </NextUIProvider>
  );
}
