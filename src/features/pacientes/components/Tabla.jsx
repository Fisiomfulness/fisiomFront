import { columns, rows } from "../data";
import Drop from "./Drop";
import DropStatus from "./DropStatus";
import { twMerge } from "tailwind-merge";

const row__item_class =
  "px-4 py-1 text-black whitespace-nowrap border-1 border-white";

const header__item_class = "py-2 border-1 border-white text-center";

export default function Tabla() {
  return (
    <div className="overflow-x-auto w-full">
      <table className="text-sm m-auto rounded-xl overflow-hidden">
        <thead className="text-white bg-secondary">
          <tr>
            {columns.map((item) => (
              <th className={header__item_class} key={item.key}>
                {item.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#CFE9F3]">
          {rows.map((item) => (
            <tr key={item.key}>
              <td className={row__item_class}>{item.name}</td>
              <td className={twMerge(row__item_class, "p-0")}>
                <Drop
                  defaultItems={[
                    { label: "date1", value: "10.04.2023" },
                    { label: "date2", value: "11.02.2021" },
                    { label: "date3", value: "10.10.2020" },
                  ]}
                  placeholder={"Seleccione una cita"}
                />
              </td>
              <td className={twMerge(row__item_class, "p-0")}>
                <DropStatus
                  defaultItems={[
                    { value: "En Proceso" },
                    { value: "Finalizada" },
                    { value: "Reprogramada" },
                  ]}
                  placeholder={item.status}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
