// @ts-check
"use client";

import { ciudadesPeru } from "./data";

import { useState } from "react";
import { BiSolidWebcam, BiSolidHome } from "react-icons/bi";
import { FaBriefcaseMedical, FaLocationDot } from "react-icons/fa6";

import { Select, SelectItem } from "@nextui-org/select";
import { Tabs, Tab } from "@nextui-org/tabs";
import { CustomButton } from "@/features/ui";
import useSWRImmutable from "swr/immutable";

/**
 * @typedef {{_id: string; name: string}} Specialty
 */

/**
 * @description Componente reutilizable solo para HomeClient
 * @param {{
 *   name?: string;
 *   label: string;
 *   placeholder: string;
 *   items: Specialty[];
 *   itemsStartContent: keyof JSX.IntrinsicElements | import("react-icons").IconType;
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
}) => {
  const DynamicTag = itemsStartContent;

  return (
    <Select
      name={name}
      label={label}
      placeholder={placeholder}
      labelPlacement="outside"
      disableAnimation
    >
      {items.map((item) => (
        <SelectItem
          key={item._id}
          startContent={
            <DynamicTag alt={item.name} className="text-primary-300" />
          }
          value={item._id}
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
  /** @type {import("swr").SWRResponse<Specialty[]>} */
  const { data } = useSWRImmutable("/specialty", fetcher);
  const specialties = data || [{ _id: "1", name: "..." }];

  return (
    <form className="flex sm:flex-row flex-col gap-4">
      <CustomSelect
        label="Especialidad"
        placeholder="Seleccione una especialidad"
        items={specialties}
        itemsStartContent={FaBriefcaseMedical}
      />

      <CustomSelect
        label="Ciudad"
        placeholder="Seleccione una ciudad"
        items={ciudadesPeru}
        itemsStartContent={FaLocationDot}
      />

      <CustomButton className="rounded-xl sm:self-end self-start px-12 shrink-0">
        Buscar
      </CustomButton>
    </form>
  );
};

const CitaOnline = () => {
  /** @type {import("swr").SWRResponse<Specialty[]>} */
  const { data } = useSWRImmutable("/specialty", fetcher);
  const specialties = data || [{ _id: "1", name: "..." }];

  return (
    <form className="flex sm:flex-row flex-col gap-4">
      <CustomSelect
        label="Especialidad"
        placeholder="Seleccione una especialidad"
        items={specialties}
        itemsStartContent={FaBriefcaseMedical}
      />

      <CustomButton className="rounded-xl sm:self-end self-start px-12 shrink-0">
        Buscar
      </CustomButton>
    </form>
  );
};

export default function HomeClient() {
  /** @typedef {import('react-aria-components').Key} Key */

  // NOTE: https://github.com/microsoft/TypeScript/issues/27387
  const [selected, setSelected] = useState(
    /** @type {Key} */ ("citaDomiciliaria"),
  );

  return (
    <div className="mb-20 max-w-2xl shadow-xl border-1 rounded-xl bg-white p-3">
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
    </div>
  );
}
