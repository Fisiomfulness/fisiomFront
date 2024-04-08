"use client";
import React, { useState, useCallback } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const events = [
  {
    start: moment("2023-12-06T10:00:00").toDate(),
    end: moment("2023-12-06T11:00:00").toDate(),
    title: "Psiquiatra",
  },
];

const Calendario = () => {
  const [currentView, setCurrentView] = useState("work_week");

  const [date, setDate] = useState(new Date());

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);

  const onView = useCallback(
    (newView) => setCurrentView(newView),
    [setCurrentView]
  );

  return (
    <div className="flex flex-col lg:flex-row   mt-2">
      <Card
        isBlurred
        className="border-none w-full  bg-background/60 dark:bg-default-100/50 max-w-[1118px] rounded-r-none md:rounded"
        shadow="sm"
      >
        <CardBody>
          <div className="bigCalendar-container  m-2 h-[600px] ">
            <Calendar
              className="w-full"
              date={date}
              onNavigate={onNavigate}
              onView={onView}
              localizer={localizer}
              events={events}
              views={["month", "work_week", "day"]}
              view={currentView}
              max={moment("2023-03-18T19:00:00").toDate()}
              min={moment("2023-03-18T08:00:00").toDate()}
            />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Calendario;
