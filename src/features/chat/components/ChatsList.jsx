// @ts-check
"use client";

import { CustomInput } from "@/features/ui";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useState } from "react";
import { socket } from "@/socket";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  PUBLIC_CHAT_CREATED_EVENT,
  USER_CONNECTED_EVENT,
} from "@/utils/EventSymbols";

const defaultChats = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Ronald Marino ${i + 1}`,
  img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
}));

const ChatsList = () => {
  const [activeChat, setActiveChat] = useState(-1);
  const [chats, setChats] = useState(defaultChats);
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      console.log("connected");
    }

    // function onDisconnect() {
    //   console.log("connected");
    // }

    /** @param {*} event */
    function onChatCreated(event) {
      console.log(event);
      const { roomName } = event;
      const draft = [
        {
          id: Number(roomName),
          name: roomName,
          img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
        },
        ...chats,
      ];
      setChats(draft);
    }

    // socket.on("connect", onConnect);
    socket.on(PUBLIC_CHAT_CREATED_EVENT, onChatCreated);
    // socket.on("disconnect", onDisconnect);

    return () => {
      // socket.off("connect", onConnect);
      socket.off(PUBLIC_CHAT_CREATED_EVENT, onChatCreated);
      // socket.off("disconnect", onDisconnect);
    };
  }, []);

  /**
   * @param {import("react").FormEvent<HTMLFormElement> & {
   *   target: HTMLFormElement & { roomName: HTMLInputElement }
   * }} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    let { value } = event.target.roomName;
    if (!value) {
      value = Date.now().toString();
    }

    fetch("http://localhost:3000/chat/room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: value }),
    })
      .then((res) => res.json())
      .then(() => {
        const draft = [
          {
            id: Number(value),
            name: value,
            img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
          },
          ...chats,
        ];
        setChats(draft);
      });

    event.target.reset();
  };

  return (
    <div className="flex flex-col overflow-y-auto gap-2 pr-2 w-fit min-w-fit">
      <form onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          name="roomName"
          placeholder="Crear nuevo chat"
        />
      </form>
      {chats.map((item) => (
        <Link key={item.id} href={`/user/mis_mensajes/${item.id}`}>
          <div
            className={[
              "px-3 py-2 rounded-lg w-60 cursor-pointer",
              "flex items-center",
              item.id === activeChat
                ? "bg-primary-800 text-white"
                : "bg-primary-300 text-black",
            ].join(" ")}
            onClick={() => {
              socket.emit(USER_CONNECTED_EVENT, {
                roomName: item.name,
                username: name,
              });
              setActiveChat(item.id);
            }}
          >
            <Avatar src={item.img} />
            <p className="mx-auto">{item.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatsList;
