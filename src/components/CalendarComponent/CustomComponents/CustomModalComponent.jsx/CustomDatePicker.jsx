"use client";

import { IoMdTime } from "react-icons/io";

import { CalendarContext } from "@/context/Calendar";
import DateTimePicker from "react-datetime-picker";

import { standarFormartDate } from "@/utils/StandarValues";
import moment from "moment";
import { useCallback, useContext } from "react";

export const CustomDatePicker = ({ value, name, label }) => {
  const { eventInfo, setEventInfo, calendarState } =
    useContext(CalendarContext);

  const handleDateChange = useCallback(
    (event, name) => {
      setEventInfo((prevState) => ({
        ...prevState,
        [name]: moment(event).format(standarFormartDate),
      }));
    },
    [setEventInfo],
  );
  return (
    <div className="bg-gray-100 hover:bg-gray-200 rounded-xl">
      <label className=" font-thin text-gray-900 mx-2" for="date-start">
        Fecha de {label} <span class="required">*</span>
      </label>
      <div className="flex">
        <IoMdTime className="mx-2" fontSize={"20px"} color="black" />
        {/* Icon */}
        <DateTimePicker
          className="text-gray-700"
          id="date-start"
          disableCalendar
          disableClock
          format="y-MM-dd h:mm a"
          required
          onChange={(event) => {
            handleDateChange(event, name);
          }}
          value={moment(value).format("YYYY-MM-DD HH:mm")}
          clearIcon={null}
        />
      </div>
    </div>
  );
};
