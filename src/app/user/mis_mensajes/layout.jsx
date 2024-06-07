// @ts-check
import { ChatsList } from "@/features/chat";

/** @param {{ children: React.ReactNode }} children */
export default function MisMensajesLayout({ children }) {
  return (
    <main className="center pt-8 pb-12 px-auto">
      <div className="flex flex-row gap-6 max-h-[520px] max-w-fit my-auto">
        <ChatsList />
        {children}
      </div>
    </main>
  );
}
