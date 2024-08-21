const { useContext } = require("react");
import { CalendarContext } from "@/context/Calendar";
import { Button } from "@nextui-org/react";

export const ActionButtonsAppointment = () => {
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
          className="mx-1 text-sm font-semibold"
          variant="light"
          type="button"
          color="danger"
          onClick={handleDeleteEvent}
        >
          Borrar
        </Button>
      )}
      {!editEvent && !newEvent && (
        <Button
          className="mx-1 text-sm font-semibold"
          variant="light"
          type="button"
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
          className="mx-1 text-sm font-semibold"
          variant="light"
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
