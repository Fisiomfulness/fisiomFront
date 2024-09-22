"use client";

import CalendarComponent from "@/components/CalendarComponent/CalendarComponent";
import { CalendarProvider } from "@/context/Calendar";
import { useParams } from "next/navigation";

const ServicioTurno = () => {
  const params = useParams();

  const foundUserProfessional = {
    id: params.detallesId,
  };
  return (
    <div className="flex h-96">
      <CalendarProvider>
        <CalendarComponent user={foundUserProfessional} isAuth={false} />
      </CalendarProvider>
    </div>
  );
};

export default ServicioTurno;
