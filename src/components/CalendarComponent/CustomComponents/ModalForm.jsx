import { Input, Select, SelectItem } from "@nextui-org/react";
import { AutocompleteComponent } from "./AutoCompleteComponent";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { specialitiesArray, statusValue } from "../InitialValues";
import { useCallback, useContext } from "react";
import { CalendarContext } from "@/context/Calendar";
import { standarFormartDate } from "@/utils/StandarValues";

export const ModalForm = () => {
  const { eventInfo, setEventInfo, calendarState } =
    useContext(CalendarContext);
  const { editEvent, newEvent } = calendarState;

  const handleDateChange = useCallback(
    (event, name) => {
      setEventInfo((prevState) => ({
        ...prevState,
        [name]: moment(event).format(standarFormartDate),
      }));
    },
    [setEventInfo],
  );

  const handleEventInfoChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setEventInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [eventInfo],
  );

  const handleTitleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      const servicioFiltrado = specialitiesArray.filter(
        (servicio) => servicio.key === value,
      );
      setEventInfo((prevState) => ({
        ...prevState,
        [name]: servicioFiltrado[0].label,
      }));
    },
    [eventInfo],
  );

  const handleStatusChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setEventInfo((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [eventInfo],
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {!editEvent && <AutocompleteComponent />}

      <Select
        name="title"
        items={specialitiesArray}
        label="Tipo de Consulta"
        placeholder="Seleccione un tipo de consulta"
        className="max-w-xs"
        value={eventInfo.specialty}
        onChange={handleTitleChange}
      >
        {(specialty) => (
          <SelectItem key={specialty.key}>{specialty.label}</SelectItem>
        )}
      </Select>

      <DateTimePicker
        disableCalendar
        disableClock
        format="y-MM-dd h:mm a"
        required
        onChange={(event) => {
          handleDateChange(event, "start");
        }}
        value={moment(eventInfo.start).format("YYYY-MM-DD HH:mm")}
        clearIcon={null}
      />

      <DateTimePicker
        disableCalendar
        disableClock
        format="y-MM-dd h:mm a"
        required
        onChange={(event) => {
          handleDateChange(event, "end");
        }}
        value={moment(eventInfo.end).format("YYYY-MM-DD HH:mm")}
        clearIcon={null}
      />

      <Input
        type="text"
        name="additionalDescription"
        label="Descripción"
        placeholder="Coloca una Descripción"
        value={eventInfo.additionalDescription}
        onChange={handleEventInfoChange}
      />

      <Select
        name="status"
        items={statusValue}
        label="Estado de la cita"
        placeholder="Seleccione un estado"
        className="max-w-xs"
        value={eventInfo.status}
        onChange={handleStatusChange}
      >
        {(specialty) => (
          <SelectItem key={specialty.key}>{specialty.label}</SelectItem>
        )}
      </Select>
    </div>
  );
};
