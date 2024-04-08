"use client";
import React, { useMemo, useCallback, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import * as dates from "date-arithmetic";
import { Calendar, Views, Navigate, DateLocalizer } from "react-big-calendar";
import TimeGrid from "react-big-calendar/lib/TimeGrid"; // use 'react-big-calendar/lib/TimeGrid'. Can't 'alias' in Storybook


function MyWeek({
  date,
  localizer,
  events,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) {
  const currRange = useMemo(
    () => MyWeek.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      date={date}
      events={events}
      eventOffset={15}
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
}

MyWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  localizer: PropTypes.object,
  max: PropTypes.instanceOf(Date),
  min: PropTypes.instanceOf(Date),
  scrollToTime: PropTypes.instanceOf(Date),
};

MyWeek.range = (date, { localizer }) => {
  const start = date;
  const end = dates.add(start, 2, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

MyWeek.navigate = (date, action, { localizer }) => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

MyWeek.title = (date) => {
  return `My awesome week: ${date.toLocaleDateString()}`;
};

export default function CustomView({ localizer, events }) {
    console.log(events)
  const { views } = useMemo(
    () => ({
      views: {
        month: false,
        myWeek: MyWeek,
      },
    }),
    []
  );
  const [date, setDate] = useState(new Date());
  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
 
  return (
    <div className="h-[600px]">
      <Calendar
        date={date}
        toolbar={false}
        defaultView="myWeek"
        events={events}
        localizer={localizer}
        views={views}
        onNavigate={onNavigate}
        max={moment("2023-03-18T19:00:00").toDate()}
        min={moment("2023-03-18T08:00:00").toDate()}
      />
    </div>
  );
}
CustomView.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
};
