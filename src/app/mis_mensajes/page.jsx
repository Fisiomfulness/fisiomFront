import { Chat } from "@/features/chat";
import { Avatar } from "@nextui-org/react";
import { twMerge } from "tailwind-merge";

export default function MisMensajesPage() {
  return (
    <div className="flex flex-row max-h-[520px] max-w-fit my-auto">
      <div className="flex flex-col overflow-y-auto gap-2">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={twMerge(
                "bg-primary-300 px-6 py-2 rounded-lg text-black w-64 mr-4",
                "flex items-center",
                2 === i && "bg-primary-800 text-white",
              )}
            >
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <p className="text-lg mx-auto">Ronald Marino</p>
            </div>
          ))}
      </div>
      <Chat />
    </div>
  );
}
