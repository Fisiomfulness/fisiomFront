"use client";

import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import { CalendarProvider } from "@/context/Calendar";
import { useParams } from "next/navigation";

const ServicioTurno = async () => {
  const params = useParams();

  const foundUser = {
    _id: params.detallesId,
  };
  return (
    <div className="flex h-96">
      <CalendarProvider>
        <CalendarComponent data={foundUser} selectable={false} />
      </CalendarProvider>
    </div>
  );
};

export default ServicioTurno;
