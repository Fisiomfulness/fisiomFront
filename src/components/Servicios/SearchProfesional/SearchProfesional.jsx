import { FaUserDoctor } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { MdOutlineSearch } from "react-icons/md";
import { useState } from "react";

const SearchProfesional = ({ profesionales, setProfesionalesFiltrados }) => {
  const [inputValue, setInputValue] = useState("");
  let contador = 1;
  const especialidadesUnicas = Array.from(
    new Set(profesionales.map((profesional) => profesional.especialidad))
  ).map((profesion) => ({
    profesion,
    index: contador++,
  }));

  const filtrarPorEspecialidad = (especialidad) => {
    const profesionalesFiltrados = profesionales.filter((profesional) =>
      profesional.especialidad.includes(especialidad)
    );
    setProfesionalesFiltrados(profesionalesFiltrados);
  };

  const filtrarPorNombre = (nombre) => {
    const profesionalesFiltradosNombre = profesionales.filter((profesional) =>
      profesional.nombre.includes(nombre)
    );
    setProfesionalesFiltrados(profesionalesFiltradosNombre);
  };

  const onSelectionChange = (especialidad) => {
    if (especialidad === "" || especialidad === null) {
      setProfesionalesFiltrados([...profesionales]);
    } else {
      filtrarPorEspecialidad(especialidad);
    }
  };
  const onChange = (e) => {
    setInputValue(e.target.value);
  };
  const onClear = () => {
    setProfesionalesFiltrados([...profesionales]);
    setInputValue("");
  };

  const onInputChange = (value) => {
    if (value === "" || value === null) {
      setProfesionalesFiltrados([...profesionales]);
    } else {
      filtrarPorEspecialidad(value);
    }
  };

  return (
    <div className="flex m-4 gap-5">
      <Input
        label="Busqueda"
        isClearable
        radius="lg"
        onChange={onChange}
        value={inputValue}
        onValueChange={filtrarPorNombre}
        onClear={onClear}
        placeholder="Busqueda del profesional..."
        startContent={<MdOutlineSearch color="#62CFE4" size="20px" />}
      />
      <Autocomplete
        startsWidth={<AiFillHome />}
        label="Seleccione:"
        placeholder="Especialidad"
        className="max-w-xs md:mr-2 mr-0"
        defaultItems={especialidadesUnicas}
        listboxProps={{
          color: "primary",
        }}
        allowsCustomValue={true}
        onInputChange={onInputChange}
        onSelectionChange={onSelectionChange}
      >
        {(item) => (
          <AutocompleteItem key={item.index} textValue={item.profesion}>
            <div className="flex items-center gap-2">
              <FaUserDoctor alt={item.profesion} className="text-primary-300" />
              <span>{item.profesion}</span>
            </div>
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchProfesional;
