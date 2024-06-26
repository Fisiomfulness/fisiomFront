"use client";

import moment from "moment";
import "moment/locale/es";
import { useCallback, useState } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { formatConfig, langConfig } from "./CalendarConfig";
import CalendarModal from "./CalendarModal";
import CustomToolbar from "./CustomToolbar";
import { initialEvents } from "./InitialValues";

export default function CalendarComponent({ selectable }) {
  const localizer = momentLocalizer(moment);

  const currentDateMoment = moment().format("YYYY-MM-DD HH:mm");

  const [state, setState] = useState({
    view: Views.MONTH,
    date: new Date(),
    myEvents: initialEvents,
    newEvent: false,
    editEvent: false,
    showModal: false,
  });

  const [eventInfo, setEventInfo] = useState({
    title: null,
    specialty: null,
    description: null,
    pacient: null,
    start: currentDateMoment,
    end: currentDateMoment,
    color: null,
  });

  const resetEventFormState = () => ({
    showModal: false,
    newEvent: null,
    editEvent: false,
  });

  const handleSaveEvent = useCallback(() => {
    const { myEvents, editEvent } = state;
    if (!eventInfo.title && !eventInfo.pacient) return;

    if (editEvent) {
      setState((prevState) => ({
        ...prevState,
        myEvents: myEvents.map((event) =>
          event.id === eventInfo.id ? eventInfo : event,
        ),
        ...resetEventFormState(),
      }));
    } else {
      setState((prevState) => ({
        ...prevState,
        myEvents: [...myEvents, { id: myEvents.length + 1, ...eventInfo }],
        ...resetEventFormState(),
      }));
    }
    setEventInfo({});
  }, [state, eventInfo]);

  const handleSelectEvent = useCallback(
    (event) => {
      setState((prevState) => ({
        ...prevState,
        showModal: true,
      }));
      setEventInfo(event);
    },
    [state, eventInfo],
  );

  const handleSelectSlot = useCallback(
    (event) => {
      if (currentDateMoment > moment(event.start).format("YYYY-MM-DD HH:mm")) {
        alert("No se puede crear en esta fecha");
      } else {
        setState((prevState) => ({
          ...prevState,
          newEvent: true,
          showModal: true,
        }));
        setEventInfo((prevState) => ({
          ...prevState,
          start: event.start,
          end: event.end,
        }));
      }
    },
    [state, eventInfo],
  );

  const handleDeleteEvent = useCallback(() => {
    const { myEvents } = state;
    if (eventInfo) {
      setState((prevState) => ({
        ...prevState,
        myEvents: myEvents.filter((event) => event.id !== eventInfo.id),
        ...resetEventFormState(),
      }));
      setEventInfo({});
    }
  }, [state, eventInfo]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "#38b0ff";
    const style = {
      backgroundColor,
    };
    return {
      style,
    };
  };

  return (
    <>
      <div className="w-3/4 min-h-[500px]">
        <Calendar
          culture="es"
          localizer={localizer}
          events={state.myEvents}
          views={[Views.MONTH, Views.WEEK, Views.AGENDA]}
          defaultView={state.view}
          view={state.view}
          date={state.date}
          onView={(view) => setState((prevState) => ({ ...prevState, view }))}
          onNavigate={(date) =>
            setState((prevState) => ({ ...prevState, date: new Date(date) }))
          }
          messages={langConfig.es}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          selectable={selectable}
          formats={formatConfig}
          min={new Date(1970, 1, 1, 6)} // Hora mínima (8:00 AM)
          max={new Date(1970, 1, 1, 23)} // Hora máxima (6:00 PM)\\
          components={{
            toolbar: (props) => (
              <CustomToolbar {...props} handleSelectSlot={handleSelectSlot} />
            ),
          }}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <CalendarModal
        state={state}
        setState={setState}
        eventInfo={eventInfo}
        setEventInfo={setEventInfo}
        handleSaveEvent={handleSaveEvent}
        handleDeleteEvent={handleDeleteEvent}
      />
    </>
  );
}
