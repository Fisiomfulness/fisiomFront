// @ts-check
"use client";

import { especialidadesMedicas, ciudadesPeru } from "./data";

import { useEffect, useState } from "react";
import { BiSolidWebcam, BiSolidHome } from "react-icons/bi";
import { FaBriefcaseMedical, FaLocationDot } from "react-icons/fa6";

import { Tabs, Tab, Select, SelectItem } from "@nextui-org/react";
import { CustomButton } from "@/features/ui";

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
      className="min-w-60"
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

/**
 * @param {AbortSignal} signal
 * @returns {Promise<Specialty[]>}
 */
const getSpecialties = async (signal) => {
  try {
    const res = await fetch("http://localhost:3000/specialty", {
      signal,
    });

    if (!res.ok) return [];

    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === "AbortError") return [];
    }
    throw error;
  }
};

const CitaDomiciliaria = () => {
  // NOTE: https://github.com/microsoft/TypeScript/issues/27387
  const [specialties, setSpecialties] = useState(
    /** @type {Specialty[]} */ ([]),
  );

  useEffect(() => {
    const abortController = new AbortController();

    getSpecialties(abortController.signal).then((data) => {
      setSpecialties(data);
    });

    return () => abortController.abort();
  }, []);

  return (
    <form className="flex md:flex-row flex-col gap-4">
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

      <CustomButton className="rounded-xl sm:self-end self-start">
        Buscar
      </CustomButton>
    </form>
  );
};

const CitaOnline = () => {
  const [specialties, setSpecialties] = useState(
    /** @type {Specialty[]} */ ([]),
  );

  useEffect(() => {
    const abortController = new AbortController();

    getSpecialties(abortController.signal).then((data) => {
      setSpecialties(data);
    });

    return () => abortController.abort();
  }, []);

  return (
    <form className="flex sm:flex-row flex-col gap-4">
      <CustomSelect
        label="Especialidad"
        placeholder="Seleccione una especialidad"
        items={specialties}
        itemsStartContent={FaBriefcaseMedical}
      />

      <CustomButton className="rounded-xl sm:self-end self-start">
        Buscar
      </CustomButton>
    </form>
  );
};

export default function HomeClient() {
  const [selected, setSelected] = useState(
    /** @type {import('react-aria-components').Key} */ ("citaDomiciliaria"),
  );

  return (
    <div className="mb-20 shadow-xl border-1 rounded-xl bg-white p-3">
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
