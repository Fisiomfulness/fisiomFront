"use client";

import { Button } from "@nextui-org/react";
import moment from "moment";
import { memo, useCallback, useContext, useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { CalendarContext } from "@/context/Calendar";
import { FaTimes } from "react-icons/fa";
import { UpdateForm } from "./UpdateForm";
import { CreateForm } from "./CreateForm";

export const AvailabilityModal = memo(() => {
  const {
    isModalAppointment,
    calendarState,
    editEvent,
    isModalAvailability,
    setIsModalAvailability,
  } = useContext(CalendarContext);

  const [isCreateUpdate, setIsCreateUpdate] = useState("update");

  if (!isModalAvailability) return null;

  const handleClose = () => {
    setIsModalAvailability(false);
    setIsCreateUpdate("update");
  };

  return (
    <div className="flex justify-center items-center backdrop-blur-sm fixed inset-0 z-50 overflow-y-auto px-4 pt-5 md:inset-0 md:px-0 md:flex md:items-center md:justify-center">
      <div className="md:inline-block md:w-[700px] w-80 justify-center items-center overflow-hidden bg-white rounded-lg shadow-lg px-4 pt-5 pb-5">
        <div className="flex justify-between">
          <h5 className="text-lg font-medium leading-6 text-gray-900 font-sans">
            Disponibilidad
          </h5>
          <Button
            className="mx-1 text-sm font-semibold"
            variant="light"
            onClick={handleClose}
          >
            <FaTimes className="m-2" fontSize={"20px"} color="black" />
          </Button>
        </div>
        <div className="mt-3">
          {isCreateUpdate === "create" ? (
            <Button
              className="m-4"
              onClick={(e) => setIsCreateUpdate("update")}
              color="primary"
            >
              Actulizar
            </Button>
          ) : isCreateUpdate === "update" ? (
            <Button
              className="m-4"
              onClick={(e) => setIsCreateUpdate("create")}
              color="success"
            >
              Crear
            </Button>
          ) : (
            <></>
          )}

          {isCreateUpdate === "update" ? <UpdateForm /> : <></>}
          {isCreateUpdate === "create" ? <CreateForm /> : <></>}
        </div>
      </div>
    </div>
  );
});
