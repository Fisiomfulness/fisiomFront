import { Tabla } from "@/features/pacientes";

export default function PacientesPage() {
  return (
    <div
      className={[
        "flex justify-center flex-col items-center",
        "px-6 pb-12 overflow-hidden w-full",
      ].join(" ")}
    >
      <p className="pb-6 text-xl font-semibold">Historia Clinica - Pacientes</p>
      <Tabla />
    </div>
  );
}
