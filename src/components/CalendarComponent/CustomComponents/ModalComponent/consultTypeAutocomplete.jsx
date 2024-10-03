import { CalendarContext } from "@/context/Calendar";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useContext, useMemo, useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { specialitiesArray } from "../../InitialValues";
import axios from "axios";
import { apiEndpoints } from "@/api_endpoints";

export const ConsultTypeAutocomplete = () => {
  const { eventInfo, setEventInfo } = useContext(CalendarContext);
  const [services, setServices] = useState([]);

  const handleChangeAutocomplete = (key) => {
    if (key !== eventInfo.title) {
      setEventInfo((prevState) => ({
        ...prevState,
        _service: key,
      }));
    }
  };

  useEffect(() => {
    if(!eventInfo._professional) return
    axios.get(`${apiEndpoints.services}?professionalId=${eventInfo._professional}`)
    .then((res) => {
      setServices(res.data.services);
    })
  }, [eventInfo._professional])

  return (
    <>
      <Autocomplete
        variant="bordered"
        selectedKey={eventInfo._service}
        onSelectionChange={handleChangeAutocomplete}
        isRequired
        defaultItems={services}
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
      >
        {(item) => (
          <AutocompleteItem key={item._id} textValue={item.title}>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small line-clamp-2">{item.description}</span>
                </div>
              </div>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </>
  );
};
