"use client";

import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";
import "../modalForm.css";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  ButtonGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { CustomDatePicker } from "../CustomDatePicker";
import TimeRangePicker from "@wojtekmaj/react-timerange-picker";

import { CalendarContext } from "@/context/Calendar";

import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useSession } from "next-auth/react";
import { getAvailability, postAvailability } from "@/services/professionals";

export const weekDays = [
  {
    label: "Lunes",
    value: "lunes",
  },
  {
    label: "Martes",
    value: "martes",
  },
  {
    label: "Miércoles",
    value: "miércoles",
  },
  { label: "Jueves", value: "jueves" },
  { label: "Viernes", value: "viernes" },
  { label: "Sábado", value: "sábado" },
  { label: "Domingo", value: "domingo" },
];

export const UpdateForm = () => {
  const { data: session } = useSession();
  const userId = session.user.id;

  const { calendarState, setCalendarState } = useContext(CalendarContext);
  const { availability } = calendarState;
  const [schedule, setSchedule] = useState(new Set([]));
  const [valueDay, setValueDay] = useState("lunes");
  const [startEndHour, setStartEndHour] = useState([]);
  const [formSchedule, setFormSchedule] = useState({
    scheduleId: "",
    availability: {},
  });

  useEffect(() => {
    filterSchedule(valueDay);
  }, []);

  const filterSchedule = (value) => {
    const filterSchedule = availability?.filter(
      (schedule) => schedule.day === value,
    );

    if (filterSchedule.length <= 0 || !value) {
      setStartEndHour([]);
      setSchedule([]);
      setFormSchedule((prev) => ({
        ...prev,
        availability: [],
      }));
    } else {
      const formatSchedule = filterSchedule[0]?.timeSlots.map((schedule) => ({
        _id: schedule._id,
        label: `${schedule.start} - ${schedule.end}`,
        value: [schedule.start, schedule.end],
      }));
      setSchedule(formatSchedule);
      setFormSchedule((prev) => ({
        ...prev,
        availability: filterSchedule[0],
      }));
    }
  };

  const handleValueDayChange = (e) => {
    const valueDay = e.target.value;
    setValueDay(valueDay);
    filterSchedule(valueDay);
  };

  const handleSelectSchedule = (e) => {
    const date = formSchedule.availability.timeSlots.filter(
      (date) => date._id === e.anchorKey,
    );
    console.log(date);

    setFormSchedule((prev) => ({
      ...prev,
      scheduleId: e.anchorKey,
    }));
    setStartEndHour([date[0].start, date[0].end]);
  };

  const updateTimeSlotById = (id, newSchedule) => {
    // Buscar el índice del objeto con el id dado
    const timeSlotIndex = formSchedule.availability.timeSlots.findIndex(
      (slot) => slot._id === id,
    );

    // Si se encuentra el objeto, reemplazarlo con newSchedule
    if (timeSlotIndex !== -1) {
      formSchedule.availability.timeSlots[timeSlotIndex] = newSchedule;
    } else {
      console.log("No se encontró un timeSlot con el id dado");
    }

    // Retornar el objeto actualizado (opcional, dependiendo del uso)

    const filterAvailability = availability.filter(
      (object) => object.day != formSchedule.availability.day,
    );
    return {
      availability: [...filterAvailability, formSchedule.availability],
    };
  };

  const deleteTimeSlotById = () => {
    const newSchedule = formSchedule.availability.timeSlots.filter(
      (slot) => slot._id !== formSchedule.scheduleId,
    );
    console.log([...availability, "asda"]);
    formSchedule.availability.timeSlots = newSchedule;

    const filterAvailability = availability.filter(
      (object) => object.day != formSchedule.availability.day,
    );
    return {
      availability: [...filterAvailability, formSchedule.availability],
    };
  };

  const handleDeleteSchedule = async () => {
    const data = deleteTimeSlotById();
    const newAvailability = await postAvailability(userId, data);

    console.log(newAvailability);

    setCalendarState((prev) => ({
      ...prev,
      availability: newAvailability.availability,
    }));

    filterSchedule(valueDay);
  };

  const handleEditSchedule = async () => {
    const formatedDate = { start: startEndHour[0], end: startEndHour[1] };
    const newData = updateTimeSlotById(formSchedule.scheduleId, formatedDate);

    console.log(newData);

    const newAvailability = await postAvailability(userId, newData);

    setCalendarState((prev) => ({
      ...prev,
      availability: newAvailability.availability,
    }));

    filterSchedule(valueDay);
  };

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <Select
          items={weekDays}
          variant="bordered"
          label="seleccione un Dia"
          defaultSelectedKeys={["lunes"]}
          onChange={handleValueDayChange}
          className="max-w-xs text-black"
        >
          {(day) => <SelectItem key={day.value}>{day.label}</SelectItem>}
        </Select>
      </div>
      <div className="place-items-center">
        {schedule.length ? (
          <Select
            label="Horarios"
            variant="bordered"
            placeholder="Seleccione un Horario"
            className="max-w-xs"
            onSelectionChange={handleSelectSchedule}
          >
            {schedule.map((item) => (
              <SelectItem key={item._id}>{item.label}</SelectItem>
            ))}
          </Select>
        ) : (
          <p className="flex text-center justify-center items-center">
            No hay horarios a editar
          </p>
        )}
      </div>
      {startEndHour?.length ? (
        <div className="col-span-2 flex">
          <TimeRangePicker
            disableClock
            clockIcon={false}
            className=" bg-gray-100 hover:bg-gray-200 rounded-xl h-12"
            onChange={setStartEndHour}
            value={startEndHour}
          />
          <ButtonGroup className="mx-2">
            <Button onClick={handleDeleteSchedule} color="danger">
              <MdDeleteForever size={20} />
            </Button>
            <Button onClick={handleEditSchedule} color="primary">
              <MdEdit size={20} />
            </Button>
          </ButtonGroup>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
