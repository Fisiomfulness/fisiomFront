// @ts-check
import { twMerge } from "tailwind-merge";

/**
 * @param {{
 *   type: "bot" | "user";
 *   children: React.ReactNode;
 * }} props
 */
export default function ChatMessage({ type, children }) {
  return (
    <div
      className={twMerge(
        "rounded-xl max-w-[95%] text-white px-4 py-2 text-justify",
        type === "bot"
          ? "bg-primary-300 text-black text-left self-start rounded-bl-none"
          : "bg-primary-800 text-right self-end rounded-br-none",
      )}
    >
      {/* NOTE: sanitizar los mensajes para evitar inyecciones de codigo */}
      {String(children)}
    </div>
  );
}
