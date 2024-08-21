// @ts-check
"use client";

import { CustomInput } from "@/features/ui";
import { Avatar } from "@nextui-org/avatar";
import Link from "next/link";
import { useState } from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import {
  EVENT_PUBLIC_CHAT_CREATED,
  EVENT_USER_CONNECTED,
} from "@/utils/EventSymbols";
import { useSocket } from "@/features/socket";
import { BASE_URL } from "@/utils/api";

const defaultChats = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: `Ronald Marino ${i + 1}`,
  img: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
}));

const ChatList = () => {
  const [activeChat, setActiveChat] = useState(-1);
  const [chats, setChats] = useState(defaultChats);
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";
  const { socket } = useSocket();

  useEffect(() => {
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

    socket.on(EVENT_PUBLIC_CHAT_CREATED, onChatCreated);

    return () => {
      socket.off(EVENT_PUBLIC_CHAT_CREATED, onChatCreated);
    };
  }, [socket, chats]);

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

    fetch(`${BASE_URL}/chat/room`, {
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
              socket.emit(EVENT_USER_CONNECTED, {
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

export default ChatList;
