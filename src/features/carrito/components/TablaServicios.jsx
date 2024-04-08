import { Chip } from "@nextui-org/react";

export default function Tabla() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="rounded-md overflow-hidden min-w-max mx-auto">
        <thead className="text-white bg-primary">
          <tr className="[&_th]:px-6 [&_th]:py-3">
            <th scope="col">Servicios a contratar</th>
            <th scope="col"></th>
            <th scope="col">Valor</th>
          </tr>
        </thead>
        <tbody className="[&_tr_td]:px-6 [&_tr_td]:py-4 text-left">
          <tr className="border-b border-gray-300 bg-transparent">
            <td>
              <p className="font-bold text-lg">Dr. Mario Gómez</p>
              <Chip
                size="sm"
                radius="full"
                className="bg-primary-300"
                classNames={{
                  content: "text-primary-800 !text-xs px-2",
                }}
              >
                especialidad
              </Chip>
            </td>
            <td className="text-sm">Fecha: 09-02-2024 - Horario: 09:00</td>
            <td>$100</td>
          </tr>
          <tr className="bg-zinc-200">
            <td>Total</td>
            <td></td>
            <td>$100</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
