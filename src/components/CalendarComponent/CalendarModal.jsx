"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import moment from "moment";
import { memo, useCallback, useContext } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { AutocompleteComponent } from "./CustomComponents/PatientNameAutocomplete";
import { ModalForm } from "./CustomComponents/ModalForm";
import { CalendarContext } from "@/context/Calendar";
import { EventInfoComponent } from "./CustomComponents/EventInfoComponent";
import { ActionButtons } from "./CustomComponents/ActionButtons";
import { eventInitialValues } from "@/utils/StandarValues";

import { FaTimes } from "react-icons/fa";

const EventModal = memo(() => {
  const {
    calendarState,
    setCalendarState,
    handleSaveEvent,
    handleDeleteEvent,
    eventInfo,
    setEventInfo,
  } = useContext(CalendarContext);

  const { showModal, editEvent, newEvent } = calendarState;
  if (!showModal) return null;

  const handleClose = () => {
    setCalendarState((prevState) => ({
      ...prevState,
      showModal: false,
      editEvent: false,
      newEvent: false,
    }));
    setEventInfo(eventInitialValues);
  };

  return (
    <div className="flex justify-center items-center backdrop-blur-sm fixed inset-0 z-50 overflow-y-auto px-4 pt-5 md:inset-0 md:px-0 md:flex md:items-center md:justify-center">
      <div className="md:inline-block md:w-[700px] w-80 justify-center items-center overflow-hidden bg-white rounded-lg shadow-lg px-4 pt-5 pb-5">
        <div className="flex justify-between">
          <h5 className="text-lg font-medium leading-6 text-gray-900 font-sans">
            {editEvent
              ? "Editar cita médica"
              : newEvent
              ? "Agendar Cita medica"
              : "Cita médica"}
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
          {editEvent || newEvent ? (
            <ModalForm />
          ) : (
            <EventInfoComponent eventInfo={eventInfo} />
          )}
        </div>
        <ActionButtons />
      </div>
    </div>
  );
});

export default EventModal;
