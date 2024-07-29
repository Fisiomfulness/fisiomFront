"use client";

import "./calendar.css";
import moment from "moment";
import "moment/locale/es";
import { use, useCallback, useContext, useEffect, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import { formatConfig, langConfig } from "./CalendarConfig";
import CalendarModal from "./CalendarModal";
import CustomToolbar from "./CustomComponents/CustomView.jsx/CustomToolbar";
import { currentDateMoment, standarFormartDate } from "@/utils/StandarValues";
import { formatDateFromTo } from "@/utils/filters/timeFormat";
import { filterAppointments } from "@/utils/filters/filterAppointments";
import Loader from "../Loader";
import axios from "axios";
import { getSpecificUserData } from "@/services/users";
import { CalendarContext } from "@/context/Calendar";
import { CustomEventView } from "./CustomComponents/CustomView.jsx/CustomEventView";
import { EVENT_STATUS_COLORS } from "./InitialValues";

export default function CalendarComponent({ data, selectable }) {
  const {
    CalendarIsLoading,
    calendarState,
    setCalendarState,
    fetchData,
    handleSelectSlot,
    handleSelectEvent,
    handleViewChange,
    handleNavigate,
    setCachedData,
    cachedData,
  } = useContext(CalendarContext);
  const { _id, role } = data;
  const localizer = momentLocalizer(moment);

  const isDateInRange = (date, range) => {
    return moment(date).isBetween(range.from, range.to, null, "[]");
  };

  const isRangeInCache = (from, to) => {
    return cachedData.some(
      (cache) => isDateInRange(from, cache) && isDateInRange(to, cache),
    );
  };

  //Cuando Cambia "calendarState.dateFromTo" se hace un fetch con el rango de fecha
  useEffect(() => {
    const { from, to } = calendarState.dateFromTo;

    const formarDateFromTo = (from, to) => `from ${from} to ${to}`;

    // Check if this is the first "fetch". If "fetch" is for today
    if (
      formarDateFromTo(from, to) ===
      formarDateFromTo(currentDateMoment, currentDateMoment)
    ) {
      formatDateFromTo(
        calendarState.view,
        calendarState.date,
        setCalendarState,
      );
    }

    // Check if the date range already exists in the cache
    if (!isRangeInCache(from, to) && from !== to) {
      fetchData(_id, from, to);
      setCachedData((prevCachedData) => [
        ...prevCachedData,
        { from, to }, // `data` can be populated when `fetchData` completes
      ]);
    } else {
      return;
    }
  }, [calendarState.dateFromTo]);

  //pide los datos de los user cada vez que se monta el componente
  useEffect(() => {
    const specificData = {
      name: 1,
      email: 1,
    };
    getSpecificUserData(specificData).then((response) => {
      setCalendarState((prevState) => ({
        ...prevState,
        usersNames: response.data,
      }));
    });
  }, []);

  //filtra el estado cachedData y toma data
  const filterDataForEvent = (events) => {
    if (events.length) {
      const arrayAnidados = events.map((event) => event.data);
      //arrayAnidados es un array de arrays, se aplica "flat"
      return arrayAnidados.flat();
    } else {
      return [];
    }
  };

  const eventStyleGetter = (event) => {
    const { status } = event;
    const background = `${EVENT_STATUS_COLORS[status]}`;
    var style = {
      backgroundColor: background,
    };
    return {
      style,
    };
  };

  const slotPropGetter = useCallback(
    (date) => {
      const dayOfWeek = moment(date).format("dddd");
      const dayAvailability = calendarState.availability.find(
        (day) => day.day === dayOfWeek,
      );

      if (!dayAvailability) {
        return;
      }

      const timeRanges = dayAvailability.timeSlots.map((slot) => {
        const start = moment(slot.start, "HH:mm").format("HH:mm");
        const end = moment(slot.end, "HH:mm").format("HH:mm");

        return {
          start,
          end,
          style: { backgroundColor: "#ff6161", color: "white" },
        };
      });

      const formatDate = moment(date).format("HH:mm");
      let style = {};

      for (const range of timeRanges) {
        if (formatDate >= range.start && formatDate <= range.end) {
          style = range.style;
          break; // Salir del bucle cuando se encuentra el rango correcto
        }
      }
      return {
        className: "slotDefault",
        style,
      };
    },
    [calendarState.availability],
  );

  const componentes = {
    toolbar: (props) => <CustomToolbar role={role} {...props} />,
    event: ({ event }) => <CustomEventView appointment={event} />,
  };

  return (
    <>
      {CalendarIsLoading ? (
        <Loader />
      ) : (
        <Calendar
          className="font-sans"
          culture="es"
          localizer={localizer}
          events={filterDataForEvent(cachedData)}
          views={[Views.MONTH, Views.WEEK]}
          defaultView={calendarState.view}
          view={calendarState.view}
          date={calendarState.date}
          onView={handleViewChange}
          onNavigate={handleNavigate}
          messages={langConfig.es}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable={selectable}
          formats={formatConfig}
          slotPropGetter={slotPropGetter}
          min={new Date(1970, 1, 1, 6)} // Hora mínima (8:00 AM)
          max={new Date(1970, 1, 1, 23)} // Hora máxima (6:00 PM)
          components={componentes}
          eventPropGetter={eventStyleGetter}
        />
      )}
      <CalendarModal />
    </>
  );
}
