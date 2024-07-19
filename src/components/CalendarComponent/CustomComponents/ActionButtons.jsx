const { useContext } = require("react");
import { CalendarContext } from "@/context/Calendar";
import { Button } from "@nextui-org/react";

export const ActionButtons = () => {
  const {
    setCalendarState,
    handleSaveEvent,
    handleDeleteEvent,
    eventInfo,
    calendarState,
  } = useContext(CalendarContext);
  const { editEvent, newEvent } = calendarState;
  return (
    <div className="mt-5 flex justify-end">
      {eventInfo && !newEvent && (
        <Button
          className="text-base font-semibold mx-1"
          type="button"
          color="danger"
          onClick={handleDeleteEvent}
        >
          Borrar
        </Button>
      )}
      {!editEvent && !newEvent && (
        <Button
          type="button"
          className=" mx-1 text-base font-semibold"
          color="primary"
          onClick={() =>
            setCalendarState((prevState) => ({
              ...prevState,
              editEvent: true,
            }))
          }
        >
          Editar
        </Button>
      )}
      {(newEvent || editEvent) && (
        <Button
          className="text-base font-semibold text-white"
          type="button"
          color="success"
          onClick={handleSaveEvent}
        >
          Guardar
        </Button>
      )}
    </div>
  );
};
