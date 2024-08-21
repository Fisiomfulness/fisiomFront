"use client";

import { createContext, useCallback, useContext, useState } from "react";
import {
  createAppointment,
  deleteAppointment,
  getAppointment,
  updateAppointment,
} from "@/services/appointment";
import { Views } from "react-big-calendar";
import moment from "moment";
import axios from "axios";
import { filterAppointments } from "@/utils/filters/filterAppointments";
import {
  currentDateEnd,
  currentDateMoment,
  eventInitialValues,
  standarFormartDate,
} from "@/utils/StandarValues";
import { formatDateFromTo } from "@/utils/filters/timeFormat";
import { UserContext } from "./User";
import { useSession } from "next-auth/react";
import { getAvailability } from "@/services/professionals";
import toast from "react-hot-toast";

export const CalendarContext = createContext();

export const CalendarProvider = ({ children }) => {
  const [CalendarIsLoading, setCalendarIsLoading] = useState(false);

  const [isModalAvailability, setIsModalAvailability] = useState(false);

  const [calendarState, setCalendarState] = useState({
    _professional: "",
    view: Views.MONTH,
    date: new Date(),
    myEvents: [],
    newEvent: false,
    editEvent: false,
    showModal: false,
    dateFromTo: {
      from: currentDateMoment,
      to: currentDateMoment,
    },
    usersNames: [],
    availability: [],
  });

  const [eventInfo, setEventInfo] = useState({
    _patient: "",
    patientName: "",
    title: "",
    status: "PENDING",
    additionalDescription: "",
    start: currentDateMoment,
    end: currentDateEnd,
  });

  const [cachedData, setCachedData] = useState([]);

  const [isFormInvalid, setIsFormInvalid] = useState(false);

  const resetEventFormState = () => ({
    showModal: false,
    newEvent: null,
    editEvent: false,
  });

  const fetchData = async (_id, from, to) => {
    setCalendarIsLoading(true);
    try {
      const responseAppointments = await getAppointment(_id, from, to);
      const newEvents = filterAppointments(
        responseAppointments.data.appointments,
      );

      const responseAvailability = await getAvailability(_id);

      setCalendarState((prevState) => ({
        ...prevState,
        availability: responseAvailability,
      }));

      setCachedData((prevCachedData) => {
        const newCachedData = [...prevCachedData];
        const cacheIndex = newCachedData.findIndex(
          (cache) => cache.from === from && cache.to === to,
        );
        if (cacheIndex !== -1) {
          newCachedData[cacheIndex].data = newEvents;
        } else {
          newCachedData.push({ from, to, data: newEvents });
        }
        return newCachedData;
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setCalendarIsLoading(false);
    }
  };

  const handleSaveEvent = useCallback(async () => {
    const { myEvents, editEvent } = calendarState;
    if (!eventInfo.title || !eventInfo._patient)
      return toast.error("complete los campos");
    if (currentDateMoment > moment(eventInfo.start).format(standarFormartDate))
      return toast.error("No se puede crear en esta fecha");

    if (editEvent) {
      await updateAppointment(eventInfo);
      await fetchData(
        calendarState._professional,
        calendarState.dateFromTo.from,
        calendarState.dateFromTo.to,
      );
      setCalendarState((prevState) => ({
        ...prevState,
        ...resetEventFormState(),
      }));
    } else {
      const data = {
        _professional: calendarState._professional,
        ...eventInfo,
      };
      const response = await createAppointment(data);
      await fetchData(
        calendarState._professional,
        calendarState.dateFromTo.from,
        calendarState.dateFromTo.to,
      );
      setEventInfo(eventInitialValues);
      setCalendarState((prevState) => ({
        ...prevState,
        ...resetEventFormState(),
      }));
    }

    setEventInfo(eventInitialValues);
  }, [calendarState, eventInfo]);

  const handleSelectEvent = useCallback(
    (event) => {
      setCalendarState((prevState) => ({
        ...prevState,
        showModal: true,
      }));
      setEventInfo(event);
    },
    [calendarState, eventInfo],
  );

  const handleSelectSlot = useCallback(
    (event) => {
      setCalendarState((prevState) => ({
        ...prevState,
        newEvent: true,
        showModal: true,
      }));
      setEventInfo((prevState) => ({
        ...prevState,
        start: event.start,
        end: event.end,
      }));
    },
    [calendarState, eventInfo],
  );

  const onclickButtonCreate = useCallback(() => {
    setCalendarState((prevState) => ({
      ...prevState,
      newEvent: true,
      showModal: true,
    }));
  }, [calendarState, eventInfo]);

  const handleDeleteEvent = useCallback(async () => {
    // const { myEvents } = calendarState;
    if (eventInfo) {
      const newData = {
        _id: eventInfo._id,
        status: "DEACTIVATE",
      };
      const response = await updateAppointment(newData);
      await fetchData(
        calendarState._professional,
        calendarState.dateFromTo.from,
        calendarState.dateFromTo.to,
      );
      setEventInfo(eventInitialValues);
      setCalendarState((prevState) => ({
        ...prevState,
        ...resetEventFormState(),
      }));
    }
  }, [calendarState, eventInfo]);

  const handleViewChange = (view) => {
    setCalendarState((prevState) => ({
      ...prevState,
      view,
    }));
  };

  const handleNavigate = (date) => {
    formatDateFromTo(calendarState.view, date, setCalendarState);
    setCalendarState((prevState) => ({
      ...prevState,
      date: new Date(date),
    }));
  };

  return (
    <CalendarContext.Provider
      value={{
        setCachedData,
        cachedData,
        CalendarIsLoading,
        setCalendarIsLoading,
        calendarState,
        setCalendarState,
        eventInfo,
        setEventInfo,
        fetchData,
        handleSaveEvent,
        handleSelectEvent,
        handleSelectSlot,
        handleDeleteEvent,
        handleViewChange,
        handleNavigate,
        onclickButtonCreate,
        isModalAvailability,
        setIsModalAvailability,
      }}
      displayName="Calendar Context"
    >
      {children}
    </CalendarContext.Provider>
  );
};
