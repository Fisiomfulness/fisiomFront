import { createQuoteDay, createQuoteTime } from "./utils";

export const citaciones = [
  {
    id: "1",
    hour: createQuoteTime(7, 0),
    date: createQuoteDay(21),
    name: "Maria Gimenez",
  },
  {
    id: "2",
    hour: createQuoteTime(7, 30),
    date: createQuoteDay(21),
    name: "Carlos Albomoz",
  },
  {
    id: "3",
    hour: createQuoteTime(8, 0),
    date: createQuoteDay(21),
    name: "Juan Perez",
  },
  {
    id: "4",
    hour: createQuoteTime(8, 0),
    date: createQuoteDay(23),
    name: "Mariano Rivas",
  },
  {
    id: "5",
    hour: createQuoteTime(7, 0),
    date: createQuoteDay(24),
    name: "Gomez Maria",
  },
  {
    id: "6",
    hour: createQuoteTime(7, 30),
    date: createQuoteDay(25),
    name: "John Carpel",
  },
  {
    id: "7",
    hour: createQuoteTime(8, 0),
    date: createQuoteDay(25),
    name: "Carl Marcus",
  },
  {
    id: "8",
    hour: createQuoteTime(8, 30),
    date: createQuoteDay(25),
    name: "Marian Marcus",
  },
];
