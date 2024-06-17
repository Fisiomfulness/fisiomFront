"use client";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer/Footer";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useSocket } from "@/features/socket";
import { EVENT_PUBLIC_CHAT_CREATED } from "@/utils/EventSymbols";

const exclude = [
  "/login",
  "/servicios_home",
  "/recupero",
  "/registro",
  "/about",
];

export function Overlay({ children }) {
  const pathname = usePathname();
  const { socket } = useSocket();

  useEffect(() => {
    function onChatCreated(event) {
      // toast.success(JSON.stringify(event, null, 8), { duration: 6000 });
      toast.success(`Se creo un grupo publico: ${event.roomName}`, {
        duration: 6000,
      });
    }

    socket.on(EVENT_PUBLIC_CHAT_CREATED, onChatCreated);

    return () => {
      socket.off(EVENT_PUBLIC_CHAT_CREATED, onChatCreated);
    };
  }, [socket]);

  if (exclude.includes(pathname)) {
    return children;
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
