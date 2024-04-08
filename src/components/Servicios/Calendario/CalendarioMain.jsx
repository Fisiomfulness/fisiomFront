'use client'
import React from 'react'
import moment from 'moment'
import { momentLocalizer } from "react-big-calendar";
import CustomView from './CustomView'
import { createEvent , tomorrowDate } from './events';
import "./index.css"



const events = [
  createEvent(9, 10, 'Consulta'),
  createEvent(11, 12, 'Consulta'),
  createEvent(13, 14, 'Consulta', tomorrowDate),
];
const localizer = momentLocalizer(moment)

const CalendarioMain = () => {
  return <CustomView localizer={localizer} events={events} />
}
export default CalendarioMain;