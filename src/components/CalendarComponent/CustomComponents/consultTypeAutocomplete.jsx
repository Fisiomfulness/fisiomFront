import { CalendarContext } from "@/context/Calendar";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useContext, useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { specialitiesArray } from "../InitialValues";

export const ConsultTypeAutocomplete = () => {
  const { eventInfo, setEventInfo } = useContext(CalendarContext);

  const handleChangeAutocomplete = (key) => {
    setEventInfo((prevState) => ({
      ...prevState,
      title: key,
    }));
  };

  return (
    <>
      <Autocomplete
        selectedKey={eventInfo.title}
        onSelectionChange={handleChangeAutocomplete}
        isRequired
        defaultItems={specialitiesArray}
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
        label="Tipo de Consulta"
        aria-label="Seleccione un Tipo de Consulta"
        placeholder="Nombre del servicio"
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
          <AutocompleteItem key={item.label} textValue={item.label}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{item.label}</span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};
