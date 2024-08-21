import "../modalForm.css";
import "@wojtekmaj/react-timerange-picker/dist/TimeRangePicker.css";
import "react-clock/dist/Clock.css";

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
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
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

export const CreateForm = () => {
  const { calendarState, setCalendarState } = useContext(CalendarContext);
  const { data: session } = useSession();
  const { availability } = calendarState;
  const [valueDay, setValueDay] = useState("lunes");
  const [startEndHour, setStartEndHour] = useState(["10:00", "12:00"]);
  const [formSchedule, setFormSchedule] = useState({});

  const findAvailability = (day) => {
    const filterSchedule = availability.filter(
      (schedule) => schedule.day === day,
    );
    setFormSchedule({
      userId: session.user.id,
      availability: filterSchedule,
    });
  };

  const handleValueDayChange = (e) => {
    const value = e.target.value;
    setValueDay(value);
    findAvailability(value);
  };

  // si se envia al back un parametro "_id" este lo tomara y rompera
  const removeIdFromArray = (array) => {
    return array.map(({ _id, ...rest }) => rest);
  };

  //validacion para no crear el mismo horario
  const doesTimeSlotExist = (timeSlot, timeSlotsArray) => {
    return timeSlotsArray.some(
      (slot) => slot.start === timeSlot.start && slot.end === timeSlot.end,
    );
  };

  const findByDayAndDeleteId = () => {
    const newAvailability = availability.filter(
      (object) => object.day !== valueDay,
    );

    const clearIdFromSchedule = newAvailability.map((schedule) => ({
      ...schedule,
      timeSlots: [...removeIdFromArray(schedule.timeSlots)],
    }));

    return clearIdFromSchedule;
  };

  const handleCreateSchedule = async () => {
    const prevAvailability = findByDayAndDeleteId();

    const newData = {
      start: startEndHour[0],
      end: startEndHour[1],
    };

    if (formSchedule.availability.length) {
      const checkSchedule = doesTimeSlotExist(
        newData,
        formSchedule.availability[0].timeSlots,
      );
      if (checkSchedule) {
        toast.error("ya existe este horario");
        return false;
      } else {
        const newtTimeSlots = removeIdFromArray(
          formSchedule.availability[0].timeSlots,
        );

        const data = {
          userId: formSchedule.userId,
          availability: [
            {
              day: valueDay,
              timeSlots: [...newtTimeSlots, newData],
            },
          ],
        };

        const dataToSend = {
          userId: formSchedule.userId,
          availability: [
            ...prevAvailability,
            {
              day: valueDay,
              timeSlots: [...newtTimeSlots, newData],
            },
          ],
        };

        setFormSchedule(data);

        const newAvailability = await postAvailability(
          dataToSend.userId,
          dataToSend,
        );
        setCalendarState((prev) => ({
          ...prev,
          availability: newAvailability.availability,
        }));
      }
    } else {
      const dataToSend = {
        userId: formSchedule.userId,
        availability: [
          ...prevAvailability,
          {
            day: valueDay,
            timeSlots: [newData],
          },
        ],
      };

      const data = {
        userId: formSchedule.userId,
        availability: [
          {
            day: valueDay,
            timeSlots: [newData],
          },
        ],
      };

      setFormSchedule(data);

      const newAvailability = await postAvailability(
        dataToSend.userId,
        dataToSend,
      );
      setCalendarState((prev) => ({
        ...prev,
        availability: newAvailability.availability,
      }));
    }
  };
  useEffect(() => {
    findAvailability(valueDay);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <Select
          variant="bordered"
          items={weekDays}
          label="seleccione un Dia"
          defaultSelectedKeys={["lunes"]}
          onChange={handleValueDayChange}
          className="max-w-xs text-black"
        >
          {(day) => <SelectItem key={day.value}>{day.label}</SelectItem>}
        </Select>
      </div>
      <div className=" flex">
        <TimeRangePicker
          disableClock
          clockIcon={false}
          className=" bg-gray-100 hover:bg-gray-200 rounded-xl h-12 border hover:border-gray-500"
          onChange={setStartEndHour}
          value={startEndHour}
        />
        <Button className="mx-2" onClick={handleCreateSchedule} color="success">
          <IoMdAddCircleOutline size={20} />
        </Button>
      </div>
    </div>
  );
};
