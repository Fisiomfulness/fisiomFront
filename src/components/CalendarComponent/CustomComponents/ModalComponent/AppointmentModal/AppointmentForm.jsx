import "../modalForm.css";
import { Input, Select, SelectItem } from "@nextui-org/react";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { specialitiesArray, statusValue } from "../../../InitialValues";
import { useCallback, useContext, useEffect } from "react";
import { CalendarContext } from "@/context/Calendar";
import { standarFormartDate } from "@/utils/StandarValues";
import { PatientNameAutocomplete } from "../PatientNameAutocomplete";
import { ConsultTypeAutocomplete } from "../consultTypeAutocomplete";
import { CustomDatePicker } from "../CustomDatePicker";
import { useSession } from "next-auth/react";

export const AppointmentForm = ({ professionalId }) => {
  const { data: session } = useSession();
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

  useEffect(() => {
    if (session?.user?.id !== professionalId) {
      setEventInfo((prevState) => ({
        ...prevState,
        _patient: session.user.id,
      }));
    }
    setEventInfo((prevState) => ({
      ...prevState,
      _professional: professionalId,
    }))
  }, [newEvent, session.user.id, professionalId, setEventInfo]);

  return (
    <div className="flex flex-col gap-4">

      <div className="flex justify-center gap-8">
        {/* {!editEvent && <PatientNameAutocomplete />} */}
        {/*If it's the professional looking at form PatientSelector will render else patient will be set to current session holder*/}
        {(session?.user?.id === professionalId) && <PatientNameAutocomplete />}

        <ConsultTypeAutocomplete />
      </div>

      <div className="flex justify-around gap-8">
        <CustomDatePicker value={eventInfo.start} name={"start"} label={"inicio"} />

        <CustomDatePicker value={eventInfo.end} name={"end"} label={"fin"} />
      </div>

      <div className="flex justify-around gap-8">
        <Input
          variant="bordered"
          type="text"
          name="additionalDescription"
          label="Descripción"
          placeholder="Coloca una Descripción"
          value={eventInfo.additionalDescription}
          onChange={handleEventInfoChange}
        />

        {/* <Select
          variant="bordered"
          name="status"
          items={statusValue}
          label="Estado de la cita"
          placeholder="Seleccione un estado"
          className="max-w-xs"
          value={eventInfo.status}
          onChange={handleStatusChange}
        >
          {(state) => <SelectItem key={state.key}>{state.label}</SelectItem>}
        </Select> */}
      </div>
    </div>
  );
};
