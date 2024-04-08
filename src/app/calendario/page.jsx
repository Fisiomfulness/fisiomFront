import { Calendario } from "@/features/calendario";

export default function CalendarioPage() {
  return (
    <div className="px-6 pb-12 flex flex-col items-center overflow-hidden w-full my-auto">
      <p className="pb-6 text-xl font-semibold">Calendario</p>
      <Calendario />
    </div>
  );
}
