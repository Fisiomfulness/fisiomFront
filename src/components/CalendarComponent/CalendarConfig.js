export const langConfig = {
  es: {
    week: "Semana",
    month: "Mes",
    previous: "<",
    event: "Citas",
    date: "Fecha",
    time: "Horario",
    next: ">",
    today: "Hoy",
    allDay: "Todo el Dia",
    noEventsInRange: "No hay citas para esta fecha",
    showMore: (total) => `+ (${total}) Citas`,
  },
};

export const formatConfig = {
  timeGutterFormat: "h:mm A",
  agendaTimeFormat: "h:mm A",
  eventTimeRangeFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "h:mm A", culture) +
    " - " +
    localizer.format(end, "h:mm A", culture),
  dayRangeHeaderFormat: ({ start, end }, culture, localizer) =>
    localizer.format(start, "MMM DD", culture) +
    " – " +
    localizer.format(end, "MMM DD", culture),
};
