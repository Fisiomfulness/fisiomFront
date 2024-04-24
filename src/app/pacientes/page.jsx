import { Tabla } from "@/features/pacientes";

export default function PacientesPage() {
  return (
    <main className="center flex-col px-auto">
      <p className="pb-6 text-xl font-semibold">Historia Clinica - Pacientes</p>
      <Tabla />
    </main>
  );
}
