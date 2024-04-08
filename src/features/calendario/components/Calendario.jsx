import { createQuoteTime, getMonday } from "../utils";
import { citaciones } from "../data";
import Selector from "./Selector";
import { twMerge } from "tailwind-merge";

let count = 30 * 7 * 2; // iniciar desde las 7
let dayCount = 0;
// console.log("counts", count, dayCount);
let actualDay = 21;

function Cita({ index }) {
  if (index === 0) return <div className="bg-transparent"></div>;

  if (index < 8) {
    return (
      <div className="bg-transparent flex flex-col justify-center items-center">
        <p>
          {new Intl.DateTimeFormat("es-ES", { weekday: "short" }).format(
            new Date().setDate(index - 2),
          )}
        </p>
        <p>
          {new Intl.DateTimeFormat("es-ES", { month: "short" }).format(
            new Date().setDate(21),
          )}
          {getMonday(new Date().setDate(actualDay)).getDate() + index - 1}
        </p>
      </div>
    );
  }

  if (index % 8 === 0) {
    const minutes = Math.floor(count % 60)
      .toString()
      .padStart(2, "0");
    const hours = (Math.floor(count / 60) > 24 ? 0 : Math.floor(count / 60))
      .toString()
      .padStart(2, "0");

    count += 30;

    return (
      <div className="bg-transparent flex flex-col justify-center items-center">
        <p className="text-center">
          {hours}:{minutes}
        </p>
      </div>
    );
  }

  const minutes = Math.floor((count - 30) % 60);
  const hours =
    Math.floor((count - 30) / 60) > 24 ? 0 : Math.floor((count - 30) / 60);

  const horario = createQuoteTime(hours, minutes);

  const cita = citaciones.find((element) => {
    const horaCitada = element.hour;
    const diaCitada = element.date;
    return diaCitada.getDate() ===
      getMonday(new Date().setDate(actualDay)).getDate() + dayCount &&
      horario.getHours() === horaCitada.getHours() &&
      horario.getMinutes() === horaCitada.getMinutes()
      ? true
      : false;
  });

  dayCount < 6 ? dayCount++ : (dayCount = 0);

  return (
    <div
      className={twMerge(
        "w-24 h-24 text-center bg-red-500",
        "border-gray-300 border-1 box-content",
        "flex justify-center items-center flex-col",
        cita?.name ? "bg-primary-300" : "bg-slate-50",
        (index % 8) - 7 === 0 && "bg-slate-200",
      )}
    >
      <p className="px-2">{cita?.name ?? ""}</p>
      {/* Debug
      <p>
        {count} {dayCount - 1} {index}
      </p>
      */}
      {cita && (
        <p>
          {cita.hour.getHours() +
            ":" +
            cita.hour.getMinutes().toString().padStart(2, "0")}
        </p>
      )}
    </div>
  );
}

export default function Calendario() {
  // TODO: Refactor contadores

  // Reiniciar contadores al refrescar la pagina
  count = 30 * 7 * 2; // iniciar desde las 7
  dayCount = 0;

  return (
    <div className="w-full max-w-fit">
      <div
        className={[
          "grid grid-cols-[repeat(8,96px)] grid-rows-[auto_repeat(4,96px)]",
          "overflow-x-auto w-full p-1",
        ].join(" ")}
      >
        {Array(8 * 5)
          .fill(0)
          .map((_, index) => (
            <Cita key={index} index={index} />
          ))}
      </div>
      <Selector />
    </div>
  );
}
