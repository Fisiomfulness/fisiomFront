// @ts-check
"use client";

import { ciudades } from "./data";

import { useState } from "react";
import { useAtom } from "jotai";
import {
  filtersAtom,
  locationAtom,
} from "../components/Servicios/store/servicios";
import { BiSolidWebcam, BiSolidHome } from "react-icons/bi";
import { FaBriefcaseMedical, FaLocationDot } from "react-icons/fa6";

import { Select, SelectItem } from "@nextui-org/select";
import { Tabs, Tab } from "@nextui-org/tabs";
import { CustomButton } from "@/features/ui";
import useSWRImmutable from "swr/immutable";

import { useRouter } from "next/navigation";

/**
 * @typedef {{id: string; name: string}} Specialty
 * @typedef {{count: number, results: Specialty[]}} SpecialtyResponse
 * @typedef {{search: string, spelcialtyId: string}} Filter
 */

/**
 * @typedef {{id: string; name: string, country: string, coordinates: { latitude: number, longitude: number }}} City
 */

/**
 * @description Componente reutilizable solo para HomeClient
 * @param {{
 *   name?: string;
 *   label: string;
 *   placeholder: string;
 *   items: Specialty[] | City[];
 *   itemsStartContent: keyof JSX.IntrinsicElements | import("react-icons").IconType;
 *   onChange?: React.ChangeEventHandler<HTMLSelectElement>;
 *   selectedKeys?: string[];
 *   selectedKey?: string;
 * }} props
 *
 * @returns {React.ReactNode}
 */
const CustomSelect = ({
  name,
  label,
  placeholder,
  items,
  itemsStartContent,
  onChange,
  ...props
}) => {
  const DynamicTag = itemsStartContent;

  return (
    <Select
      name={name}
      label={label}
      items={items}
      placeholder={placeholder}
      labelPlacement="outside"
      onChange={onChange}
      disableAnimation
      {...props}
    >
      {items.map((item) => (
        <SelectItem
          key={item.id}
          startContent={
            <DynamicTag alt={item.name} className="text-primary-300" />
          }
          value={item.id}
        >
          {item.name}
        </SelectItem>
      ))}
    </Select>
  );
};

/** @param {string} url */
const fetcher = (url) =>
  fetch(`http://localhost:3000${url}`).then((r) => r.json());

const CitaDomiciliaria = () => {
  /** @type {import("swr").SWRResponse<SpecialtyResponse>} */
  const { data } = useSWRImmutable("/specialty", fetcher, {
    shouldRetryOnError: false,
  });
  const specialties = data?.results.length
    ? data.results
    : [{ id: "1", name: "..." }];

  const [filters, setFilters] = useAtom(filtersAtom);
  const [locations, setLocations] = useAtom(locationAtom);

  const router = useRouter();
  const handleClick = () => {
    router.push(`/servicios`);
  };

  return (
    <form className="flex sm:flex-row flex-col gap-4">
      <CustomSelect
        label="Especialidad"
        placeholder="Seleccione una especialidad"
        items={specialties}
        selectedKeys={[filters.specialtyId]}
        onChange={(e) =>
          setFilters((filters) => ({ ...filters, specialtyId: e.target.value }))
        }
        itemsStartContent={FaBriefcaseMedical}
      />

      <CustomSelect
        label="Ciudad"
        placeholder="Seleccione una ciudad"
        items={ciudades}
        selectedKeys={[locations.cityId]}
        itemsStartContent={FaLocationDot}
        onChange={(e) => {
          /**@typedef {City} ciudad */
          const ciudad = ciudades.find((city) => city.id === e.target.value)
          const coords = ciudad ? [ciudad.coordinates.latitude, ciudad.coordinates.longitude] : [0,0]
          setLocations({ ...locations, cityId: e.target.value, mapCenter: coords })
        }}
      />

      <CustomButton
        onClick={handleClick}
        isDisabled={!filters.specialtyId && !locations.cityId}
        className="rounded-xl sm:self-end self-start px-12 shrink-0"
      >
        Buscar
      </CustomButton>
    </form>
  );
};

const CitaOnline = () => {
  /** @type {import("swr").SWRResponse<SpecialtyResponse>} */
  const { data } = useSWRImmutable("/specialty", fetcher, {
    shouldRetryOnError: false,
  });
  const specialties = data?.results.length
    ? data.results
    : [{ id: "1", name: "..." }];

  const [filters, setFilters] = useAtom(filtersAtom);

  const router = useRouter();
  const handleClick = () => {
    router.push(`/servicios`);
  };

  return (
    <form className="flex sm:flex-row flex-col gap-4">
      <CustomSelect
        label="Especialidad"
        placeholder="Seleccione una especialidad"
        items={specialties}
        itemsStartContent={FaBriefcaseMedical}
        selectedKeys={[filters.specialtyId]}
        onChange={(e) =>
          setFilters((filters) => ({ ...filters, specialtyId: e.target.value }))
        }
      />

      <CustomButton
        onClick={handleClick}
        isDisabled={!filters.specialtyId}
        className="rounded-xl sm:self-end self-start px-12 shrink-0"
      >
        Buscar
      </CustomButton>
    </form>
  );
};

export default function HomeClient() {
  /** @typedef {import('react-aria-components').Key} Key */

  // NOTE: https://github.com/microsoft/TypeScript/issues/27387
  const [selected, setSelected] = useState(
    /** @type {Key} */ ("citaDomiciliaria")
  );

  return (
    <Tabs
      fullWidth
      color="primary"
      aria-label="Tabs-form"
      disableAnimation
      selectedKey={selected}
      onSelectionChange={setSelected}
    >
      <Tab
        key="citaDomiciliaria"
        title={
          <div className="flex items-center space-x-2">
            <BiSolidHome />
            <span>Cita Domiciliaria</span>
          </div>
        }
      >
        <CitaDomiciliaria />
      </Tab>
      <Tab
        key="citaOnline"
        title={
          <div className="flex items-center space-x-2">
            <BiSolidWebcam />
            <span>Cita Online</span>
          </div>
        }
      >
        <CitaOnline />
      </Tab>
    </Tabs>
  );
}
