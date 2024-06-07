// @ts-check
"use client";

import { CustomInput } from "@/features/ui";
import { Avatar } from "@nextui-org/react";
import { useLayoutEffect, useRef, useState } from "react";
import { RiArrowUpCircleLine } from "react-icons/ri";
import { messages as defaultMessages } from "../data/messages";
import ChatMessage from "./ChatMessage";
import { socket } from "@/socket";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { MESSAGE_SENDED_EVENT } from "@/utils/EventSymbols";

/** @typedef {import("../data/messages").Message} Message */

/** @param {{ roomId: string }} props */
export default function Chat({ roomId }) {
  const containerRef = useRef(/** @type {HTMLDivElement | null} */ (null));

  const [messages, setMessages] = useState(
    /** @type {Message[]} */ (roomId === "1" ? defaultMessages : []),
  );
  const { data: session } = useSession();
  const name = session?.user?.name ?? "";

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTop = container.scrollHeight;
  }, [messages, containerRef]);

  useEffect(() => {
    /** @param {*} data */
    const onChatMessage = (data) => {
      const draft = messages.concat({
        id: Date.now(),
        type: "bot",
        text: data.message,
      });
      setMessages(draft);
    };
    socket.on("message:new", onChatMessage);

    return () => {
      socket.off("message:new", onChatMessage);
    };
  }, [messages]);

  /**
   * @param {import("react").FormEvent<HTMLFormElement> & {
   *   target: HTMLFormElement & { message: HTMLInputElement }
   * }} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();

    const { value } = event.target.message;
    if (!value) return;

    const draft = messages.concat({
      id: Date.now(),
      type: "user",
      text: value,
    });
    setMessages(draft);

    socket.emit(MESSAGE_SENDED_EVENT, {
      room: roomId,
      message: value,
      sendBy: name,
    });

    event.target.reset();
  };

  return (
    <div className="flex flex-col max-w-lg w-full rounded-md">
      <div
        className={[
          "bg-primary-800 px-6 py-3 rounded-lg text-white mr-6",
          "flex justify-between items-center",
        ].join(" ")}
      >
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <p className="text-lg">Ronald Marino - {roomId}</p>
      </div>
      <div
        ref={containerRef}
        className="flex flex-col gap-2 overflow-y-auto py-2 pr-4 h-full w-[512px]"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} type={message.type}>
            {message.text}
          </ChatMessage>
        ))}
      </div>
      <form className="flex items-center mr-6" onSubmit={handleSubmit}>
        <CustomInput
          type="text"
          name="message"
          placeholder="Mensaje"
          classNames={{ input: "px-1" }}
          endContent={
            <button type="submit">
              <RiArrowUpCircleLine className="w-7 h-7 text-primary" />
            </button>
          }
        />
      </form>
    </div>
  );
}
