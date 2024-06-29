"use client";

import { Avatar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import moment from "moment";
import { memo, useCallback } from "react";
import DateTimePicker from "react-datetime-picker";

import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { specialitiesArray, users } from "./InitialValues";

const EventModal = memo(
  ({
    state,
    setState,
    handleSaveEvent,
    handleDeleteEvent,
    eventInfo,
    setEventInfo,
  }) => {
    const { showModal, editEvent, newEvent } = state;

    const handleDateChange = useCallback(
      (event, name) => {
        setEventInfo((prevState) => ({
          ...prevState,
          [name]: event,
        }));
      },
      [setEventInfo],
    );

    const handleEventInfoChange = useCallback(
      (event) => {
        const { name, value } = event.target;
        setEventInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      },
      [eventInfo],
    );

    const handleSelectChange = useCallback(
      (event) => {
        const { name, value } = event.target;
        const servicioFiltrado = specialitiesArray.filter(
          (servicio) => servicio.key === value,
        );
        setEventInfo((prevState) => ({
          ...prevState,
          [name]: servicioFiltrado[0].label,
          specialty: value,
        }));
      },
      [eventInfo],
    );

    if (!showModal) return null;

    const handleClose = () => {
      setState((prevState) => ({
        ...prevState,
        showModal: false,
        editEvent: false,
        newEvent: false,
      }));
      setEventInfo({});
    };

    const formatDateToISO = (date) => {
      return moment(date).toISOString();
    };

    const formatDateForInput = (date) => {
      return moment(date).format("YYYY-MM-DDTHH:mm");
    };

    return (
      <div className="backdrop-blur-sm fixed inset-0 z-50 overflow-y-auto px-4 pt-5 md:inset-0 md:px-0 md:flex md:items-center md:justify-center">
        <div className="md:inline-block md:w-1/2 overflow-hidden bg-white rounded-lg shadow-lg px-4 pt-5 pb-5">
          <div className="flex justify-between">
            <h5 className="text-xl font-medium leading-6 text-gray-900 font-sans">
              {editEvent
                ? "Editar cita médica"
                : newEvent
                  ? "Crear cita médica"
                  : "Cita médica"}
            </h5>
            <Button className="font-bold" onClick={handleClose}>
              X
            </Button>
          </div>
          <div className="mt-3">
            {editEvent || newEvent ? (
              <div className="grid grid-cols-2 gap-4">
                <Select
                  items={users}
                  label="Asignado a:"
                  className="max-w-xs"
                  variant="bordered"
                  classNames={{
                    label: "group-data-[filled=true]:-translate-y-5",
                    trigger: "min-h-16",
                    listboxWrapper: "max-h-[400px]",
                  }}
                  listboxProps={{
                    itemClasses: {
                      base: [
                        "rounded-md",
                        "text-default-500",
                        "transition-opacity",
                        "data-[hover=true]:text-foreground",
                        "data-[hover=true]:bg-default-100",
                        "dark:data-[hover=true]:bg-default-50",
                        "data-[selectable=true]:focus:bg-default-50",
                        "data-[pressed=true]:opacity-70",
                        "data-[focus-visible=true]:ring-default-500",
                      ],
                    },
                  }}
                  popoverProps={{
                    classNames: {
                      base: "before:bg-default-200",
                      content: "p-0 border-small border-divider bg-background",
                    },
                  }}
                  renderValue={(items) => {
                    return items.map((item) => (
                      <div key={item.key} className="flex items-center gap-2">
                        <Avatar
                          alt={item.data.name}
                          className="flex-shrink-0"
                          size="sm"
                          src={item.data.avatar}
                        />
                        <div className="flex flex-col">
                          <span>{item.data.name}</span>
                          <span className="text-default-500 text-tiny">
                            ({item.data.email})
                          </span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(user) => (
                    <SelectItem key={user.id} textValue={user.name}>
                      <div className="flex gap-2 items-center">
                        <Avatar
                          alt={user.name}
                          className="flex-shrink-0"
                          size="sm"
                          src={user.avatar}
                        />
                        <div className="flex flex-col">
                          <span className="text-small">{user.name}</span>
                          <span className="text-tiny text-default-400">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>

                <Select
                  name="title"
                  items={specialitiesArray}
                  label="Tipo de Consulta"
                  placeholder="Seleccione un tipo de consulta"
                  className="max-w-xs"
                  value={eventInfo.specialty}
                  onChange={handleSelectChange}
                >
                  {(specialty) => (
                    <SelectItem key={specialty.key}>
                      {specialty.label}
                    </SelectItem>
                  )}
                </Select>

                <Input
                  type="text"
                  name="description"
                  label="Descripción"
                  placeholder="Coloca una Descripción"
                  value={eventInfo.description}
                  onChange={handleEventInfoChange}
                />

                <Input
                  type="text"
                  name="pacient"
                  label="Nombre de paciente"
                  placeholder="Coloca un Nombre"
                  value={eventInfo.pacient}
                  onChange={handleEventInfoChange}
                />

                <DateTimePicker
                  disableCalendar
                  disableClock
                  format="y-MM-dd h:mm a"
                  required
                  onChange={(event) => {
                    handleDateChange(event, "start");
                  }}
                  value={moment(eventInfo.start).format("YYYY-MM-DD HH:mm")}
                  clearIcon={null}
                />

                <DateTimePicker
                  disableCalendar
                  disableClock
                  format="y-MM-dd h:mm a"
                  required
                  onChange={(event) => {
                    handleDateChange(event, "end");
                  }}
                  value={moment(eventInfo.end).format("YYYY-MM-DD HH:mm")}
                  clearIcon={null}
                />
              </div>
            ) : (
              <div className="grid grid-cols-2 font-sans">
                <strong className="text-xl col-span-2 font-sans">
                  {eventInfo.title}
                </strong>

                <p className="col-span-2">{eventInfo.description}</p>

                <p className="col-span-2">
                  <strong>Paciente: </strong>
                  {eventInfo.pacient}
                </p>

                <p>
                  <strong>El día: </strong>
                  {moment(eventInfo.start).format("DD MMMM YYYY [a las] h:mmA")}
                </p>

                <p>
                  <strong>Hasta el día: </strong>
                  {moment(eventInfo.end).format("DD MMMM YYYY [a las] h:mmA")}
                </p>
              </div>
            )}
          </div>
          <div className="mt-5 flex justify-end">
            {eventInfo && !newEvent ? (
              <Button
                className="text-base font-semibold mx-1"
                type="button"
                color="danger"
                onClick={handleDeleteEvent}
              >
                Borrar
              </Button>
            ) : (
              <></>
            )}
            {!editEvent && !newEvent && (
              <Button
                type="button"
                className=" mx-1 text-base font-semibold"
                color="primary"
                onClick={() =>
                  setState((prevState) => ({ ...prevState, editEvent: true }))
                }
              >
                Editar
              </Button>
            )}
            {(newEvent || editEvent) && (
              <Button
                className="text-base font-semibold text-white"
                type="button"
                color="success"
                onClick={handleSaveEvent}
              >
                Guardar
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

export default EventModal;
