import { CalendarContext } from "@/context/Calendar";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useContext, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";

export const PatientNameAutocomplete = () => {
  const { calendarState, eventInfo, setEventInfo } =
    useContext(CalendarContext);

  const handleChangeAutocomplete = (key) => {
    setEventInfo((prevState) => ({
      ...prevState,
      _patient: key,
    }));
  };

  const memoizedUserList = useMemo(
    () => calendarState.usersNames,
    [calendarState.usersNames],
  );

  return (
    <>
      <Autocomplete
        selectedKey={eventInfo._patient}
        onSelectionChange={handleChangeAutocomplete}
        isRequired
        defaultItems={memoizedUserList}
        listboxProps={{
          hideSelectedIcon: true,
          itemClasses: {
            base: [
              "rounded-medium",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "dark:data-[hover=true]:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[hover=true]:bg-default-200",
              "data-[selectable=true]:focus:bg-default-100",
              "data-[focus-visible=true]:ring-default-500",
            ],
          },
        }}
        label="Paciente"
        aria-label="Seleccione un paciente"
        placeholder="Nombre del paciente"
        popoverProps={{
          offset: 10,
          classNames: {
            base: "rounded-large",
            content: "p-1 border-small border-default-100 bg-background",
          },
        }}
        startContent={
          <IoSearch className="text-default-400" strokeWidth={2.5} size={20} />
        }
        variant="flat"
      >
        {(item) => (
          <AutocompleteItem key={item._id} textValue={item.name}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{item.name}</span>
                  <span className="text-tiny text-default-400">
                    {item.email}
                  </span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};
