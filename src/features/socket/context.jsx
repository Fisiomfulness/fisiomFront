// @ts-check
"use client";

import { BASE_URL } from "@/utils/api";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const socket = io(`${BASE_URL}/`, { autoConnect: false });

const SocketContext = createContext(
  /** @type {{ socket: typeof socket}} */ ({}),
);

/** @param {{children: React.ReactNode}} props */
export function SocketProvider({ children }) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) return;

    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context.socket === undefined) {
    throw new Error("useSocket debe usarse dentro de un SocketProvider");
  }

  return context;
};
